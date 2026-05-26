import React, { useEffect, useMemo, useState } from "react";
import {
  FaRegCalendarCheck,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaSpinner,
} from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import {
  ApiFetchMentorAvailability,
  ApiSaveMentorAvailability,
} from "../API/API";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const getMentorId = () => {
  const fromSession = sessionStorage.getItem("mentor_id");
  if (fromSession) return fromSession;
  try {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.mentor_id || null;
    }
  } catch (err) {
    console.error("Error decoding token for mentor_id:", err);
  }
  return null;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SLOT_GROUPS = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
];

const SLOT_DURATION_MINUTES = 60;

const DAY_START_MINUTES = 8 * 60;
const DAY_END_MINUTES = 17 * 60 + 30;

const buildTimeSlots = () => {
  const slots = [];
  let minutes = DAY_START_MINUTES;
  while (minutes + SLOT_DURATION_MINUTES <= DAY_END_MINUTES) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    slots.push(
      `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
    );
    minutes += SLOT_DURATION_MINUTES;
  }
  return slots;
};

const ALL_SLOTS = buildTimeSlots();

const minutesFromSlot = (slot) => {
  const [h, m] = slot.split(":").map(Number);
  return h * 60 + m;
};

const slotToTimeParts = (slot) => {
  const [hStr, mStr] = slot.split(":");
  return { h: parseInt(hStr, 10), m: mStr };
};

const formatTimeParts = (h, m) => {
  const period = h >= 12 ? "PM" : "AM";
  let displayH = h;
  if (displayH > 12) displayH -= 12;
  if (displayH === 0) displayH = 12;
  return `${displayH}:${m} ${period}`;
};

const toDateKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const formatSlotLabel = (slot) => {
  const { h, m } = slotToTimeParts(slot);
  const startLabel = formatTimeParts(h, m);
  const endMinutes = minutesFromSlot(slot) + SLOT_DURATION_MINUTES;
  const endH = Math.floor(endMinutes / 60);
  const endM = String(endMinutes % 60).padStart(2, "0");
  return `${startLabel} – ${formatTimeParts(endH, endM)}`;
};

const formatDisplayDate = (dateKey) => {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getSlotGroup = (slot) => {
  const hour = parseInt(slot.split(":")[0], 10);
  return hour < 12 ? "morning" : "afternoon";
};

const WINDOW_START_LABEL = formatTimeParts(8, "00");
const WINDOW_END_LABEL = formatTimeParts(17, "30");

const normalizeSlot = (slot) => String(slot).slice(0, 5);

const normalizeAvailabilityMap = (data) => {
  if (!data || typeof data !== "object") return {};
  return Object.entries(data).reduce((acc, [dateKey, slots]) => {
    const list = Array.isArray(slots)
      ? slots.map(normalizeSlot).filter(Boolean).sort()
      : [];
    if (list.length > 0) {
      acc[dateKey] = list;
    }
    return acc;
  }, {});
};

const MentorAvailabilityCalendar = () => {
  const today = useMemo(() => new Date(), []);
  const todayKey = toDateKey(today);

  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [availabilityMap, setAvailabilityMap] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadAvailability = async () => {
      const mentorId = getMentorId();
      if (!mentorId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await ApiFetchMentorAvailability(mentorId);
        if (data && typeof data === "object") {
          setAvailabilityMap(normalizeAvailabilityMap(data));
        }
      } catch (err) {
        console.error("Failed to load mentor availability:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAvailability();
  }, []);

  const monthLabel = viewDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const daysWithAvailability = useMemo(
    () =>
      Object.keys(availabilityMap).filter(
        (key) => (availabilityMap[key] || []).length > 0
      ).length,
    [availabilityMap]
  );

  const calendarCells = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startOffset = firstOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];

    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i -= 1) {
      const day = prevMonthDays - i;
      cells.push({ date: new Date(year, month - 1, day), inMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push({ date: new Date(year, month, day), inMonth: true });
    }

    let nextMonthDay = 1;
    while (cells.length % 7 !== 0) {
      cells.push({
        date: new Date(year, month + 1, nextMonthDay),
        inMonth: false,
      });
      nextMonthDay += 1;
    }

    return cells;
  }, [viewDate]);

  const selectedSlots = selectedDate
    ? availabilityMap[selectedDate] || []
    : [];

  const setSlotsForDate = (dateKey, updater) => {
    setAvailabilityMap((prev) => {
      const current = (prev[dateKey] || []).map(normalizeSlot);
      const nextSlots =
        typeof updater === "function" ? updater(current) : updater;
      const sorted = nextSlots.map(normalizeSlot).sort();
      const next = { ...prev };

      if (sorted.length === 0) {
        delete next[dateKey];
      } else {
        next[dateKey] = sorted;
      }

      return next;
    });
  };

  const removeSlot = (slot) => {
    if (!selectedDate) return;
    const target = normalizeSlot(slot);
    setSlotsForDate(selectedDate, (current) =>
      current.filter((s) => s !== target)
    );
  };

  const addSlot = (slot) => {
    if (!selectedDate) return;
    const target = normalizeSlot(slot);
    setSlotsForDate(selectedDate, (current) => {
      if (current.includes(target)) return current;
      return [...current, target].sort();
    });
  };

  const toggleSlot = (slot) => {
    if (!selectedDate) return;
    const target = normalizeSlot(slot);
    const current = (availabilityMap[selectedDate] || []).map(normalizeSlot);
    if (current.includes(target)) {
      removeSlot(slot);
      return;
    }
    addSlot(slot);
  };

  const toggleSelectAll = () => {
    if (!selectedDate) return;
    const current = (availabilityMap[selectedDate] || []).map(normalizeSlot);
    const allSelected = ALL_SLOTS.every((s) =>
      current.includes(normalizeSlot(s))
    );
    setSlotsForDate(
      selectedDate,
      allSelected ? [] : ALL_SLOTS.map(normalizeSlot)
    );
  };

  const handleSave = async () => {
    if (!selectedDate || saving) return;

    const mentorId = getMentorId();
    if (!mentorId) {
      toast.error("Mentor ID not found. Please log in again.");
      return;
    }

    const currentSlots = availabilityMap[selectedDate] || [];

    setSaving(true);
    try {
      await ApiSaveMentorAvailability({
        mentor_id: mentorId,
        date: selectedDate,
        slots: currentSlots,
      });
      toast.success("Availability saved successfully.");
    } catch (err) {
      console.error("Failed to save availability:", err);
      toast.error("Failed to save availability. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const allSelectedForDay =
    selectedDate && ALL_SLOTS.every((s) => selectedSlots.includes(s));

  return (
    <div className="mx-auto max-w-[1100px] px-8 pb-10 pt-7">
      <header className="mb-7 flex flex-wrap items-start gap-4 border-b border-gray-200 pb-6">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-xl text-green-700"
          aria-hidden="true"
        >
          <FaRegCalendarCheck />
        </div>
        <div className="min-w-[200px] flex-1">
          <h1 className="mb-1.5 text-[1.625rem] font-bold tracking-tight text-gray-900">
            Manage availability
          </h1>
          <p className="m-0 max-w-[560px] text-[0.9375rem] leading-normal text-gray-500">
            Set the dates and 1-hour time slots when you are open for mentorship
            sessions. Students can book only within your available windows.
          </p>
        </div>
        {daysWithAvailability > 0 && (
          <span className="ml-auto self-center whitespace-nowrap rounded-full border border-green-200 bg-emerald-50 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-green-800 max-[900px]:ml-0 max-[900px]:w-full max-[900px]:text-center">
            {daysWithAvailability} day
            {daysWithAvailability !== 1 ? "s" : ""} configured
          </span>
        )}
      </header>

      {loading ? (
        <div
          className="flex min-h-[280px] flex-col items-center justify-center gap-3 px-8 py-16 text-center text-gray-500"
          role="status"
          aria-live="polite"
        >
          <FaSpinner
            className="animate-spin text-4xl text-nirmaanGreen"
            aria-hidden="true"
          />
          <span>Loading availability...</span>
        </div>
      ) : (
        <div className="grid items-start gap-6 max-[900px]:grid-cols-1 grid-cols-[minmax(280px,380px)_1fr]">
          <section
            className="rounded-[14px] border border-gray-200 bg-white px-5 pb-5 pt-5 shadow-sm"
            aria-label="Monthly calendar"
          >
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[10px] border border-gray-200 bg-white text-xs text-gray-700 transition-colors duration-150 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nirmaanGreen"
                onClick={() =>
                  setViewDate(
                    (prev) =>
                      new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                  )
                }
                aria-label="Previous month"
              >
                <FaChevronLeft />
              </button>
              <h2 className="m-0 text-[1.0625rem] font-bold tracking-tight text-gray-900">
                {monthLabel}
              </h2>
              <button
                type="button"
                className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[10px] border border-gray-200 bg-white text-xs text-gray-700 transition-colors duration-150 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nirmaanGreen"
                onClick={() =>
                  setViewDate(
                    (prev) =>
                      new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                  )
                }
                aria-label="Next month"
              >
                <FaChevronRight />
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7 gap-0.5">
              {WEEKDAYS.map((day) => (
                <span
                  key={day}
                  className="px-0 py-1.5 text-center text-[0.6875rem] font-bold uppercase tracking-wider text-gray-400"
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {calendarCells.map(({ date, inMonth }) => {
                const key = toDateKey(date);
                const isPast = key < todayKey;
                const slotCount = (availabilityMap[key] || []).length;
                const hasSlots = slotCount > 0;
                const isSelected = selectedDate === key;
                const isToday = key === todayKey;

                return (
                  <button
                    key={`${key}-${inMonth}`}
                    type="button"
                    className={cn(
                      "relative flex aspect-square min-h-[42px] flex-col items-center justify-center gap-0.5 rounded-[10px] border text-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nirmaanGreen",
                      !inMonth && "text-gray-300",
                      isPast && "cursor-not-allowed opacity-[0.38]",
                      !isPast &&
                        !isSelected &&
                        "cursor-pointer border-transparent bg-transparent text-gray-700 hover:border-gray-200 hover:bg-gray-50",
                      isToday &&
                        !isSelected &&
                        "border-green-300 bg-green-50",
                      isSelected &&
                        "cursor-pointer border-nirmaanGreenDark bg-nirmaanGreen font-semibold text-white shadow-[0_2px_8px_rgba(69,199,77,0.35)]"
                    )}
                    disabled={isPast}
                    onClick={() => {
                      if (isPast) return;
                      setSelectedDate(key);
                    }}
                    aria-pressed={isSelected}
                    aria-label={
                      hasSlots
                        ? `${date.getDate()}, ${slotCount} slots set`
                        : `${date.getDate()}`
                    }
                  >
                    <span
                      className={cn(
                        "leading-none font-medium",
                        isToday && !isSelected && "font-bold text-green-700",
                        isSelected && "font-bold"
                      )}
                    >
                      {date.getDate()}
                    </span>
                    {hasSlots && (
                      <span
                        className={cn(
                          "rounded-full px-1.5 py-0.5 text-[0.625rem] font-bold leading-none",
                          !inMonth && "opacity-50",
                          isSelected
                            ? "bg-white/25 text-white"
                            : "bg-green-100 text-green-800"
                        )}
                      >
                        {slotCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <ul
              className="m-0 mt-4 flex list-none flex-wrap gap-x-5 gap-y-3 border-t border-gray-100 pt-3.5"
              aria-label="Calendar legend"
            >
              <li className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="h-3 w-3 shrink-0 rounded border-2 border-green-300 bg-green-50" />
                Today
              </li>
              <li className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="h-3 w-3 shrink-0 rounded bg-green-100" />
                Has availability
              </li>
              <li className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="h-3 w-3 shrink-0 rounded bg-nirmaanGreen" />
                Selected day
              </li>
            </ul>
          </section>

          <aside className="min-h-[320px]">
            {!selectedDate ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[14px] border border-dashed border-gray-300 bg-white px-8 py-10 text-center">
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-[1.35rem] text-gray-400"
                  aria-hidden="true"
                >
                  <FaClock />
                </div>
                <h3 className="mb-2 text-[1.0625rem] font-semibold text-gray-900">
                  Select a date
                </h3>
                <p className="m-0 max-w-[280px] text-sm leading-relaxed text-gray-500">
                  Choose a future date on the calendar, then pick available
                  1-hour session slots for that day.
                </p>
              </div>
            ) : (
              <section
                className="rounded-[14px] border border-gray-200 bg-white px-6 pb-6 pt-5 shadow-sm"
                aria-label="Time slot picker"
              >
                <div className="mb-4 flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Editing availability for
                    </p>
                    <h3 className="m-0 text-[1.0625rem] font-bold leading-snug text-gray-900">
                      {formatDisplayDate(selectedDate)}
                    </h3>
                  </div>
                  <div className="shrink-0 whitespace-nowrap rounded-lg bg-gray-100 px-3 py-1.5 text-[0.8125rem] font-semibold text-gray-700">
                    {selectedSlots.length} / {ALL_SLOTS.length} slots
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="m-0 flex items-center gap-1.5 text-[0.8125rem] text-gray-500">
                    <FaClock
                      className="text-[0.8rem] text-gray-400"
                      aria-hidden="true"
                    />
                    1-hour sessions · {WINDOW_START_LABEL} – {WINDOW_END_LABEL}
                  </p>
                  <button
                    type="button"
                    className="cursor-pointer rounded-lg border border-green-200 bg-white px-3.5 py-1.5 text-[0.8125rem] font-semibold text-green-700 transition-colors duration-150 hover:border-green-300 hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nirmaanGreen"
                    onClick={toggleSelectAll}
                  >
                    {allSelectedForDay ? "Clear all" : "Select all"}
                  </button>
                </div>

                {SLOT_GROUPS.map((group) => {
                  const groupSlots = ALL_SLOTS.filter(
                    (slot) => getSlotGroup(slot) === group.id
                  );
                  if (groupSlots.length === 0) return null;

                  return (
                    <div key={group.id} className="mb-4 last:mb-2">
                      <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                        {group.label}
                      </h4>
                      <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2">
                        {groupSlots.map((slot) => {
                          const isActive = selectedSlots.includes(slot);
                          return (
                            <button
                              key={slot}
                              type="button"
                              className={cn(
                                "min-h-9 rounded-lg border px-2.5 py-2 text-center text-[0.8125rem] font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nirmaanGreen",
                                isActive
                                  ? "border-nirmaanGreenDark bg-nirmaanGreen text-white shadow-[0_1px_4px_rgba(69,199,77,0.3)]"
                                  : "border-gray-200 bg-neutral-50 text-gray-600 hover:border-green-300 hover:bg-green-50 hover:text-green-800"
                              )}
                              onClick={() => toggleSlot(slot)}
                              aria-pressed={isActive}
                            >
                              {formatSlotLabel(slot)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-[10px] border-0 bg-nirmaanGreen px-6 py-2.5 text-[0.9375rem] font-semibold text-white shadow-[0_1px_3px_rgba(69,199,77,0.25)] transition-[background,box-shadow] duration-150 hover:bg-nirmaanGreenDark hover:shadow-[0_2px_6px_rgba(69,199,77,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={handleSave}
                    disabled={saving}
                    aria-busy={saving}
                  >
                    {saving ? (
                      <>
                        <FaSpinner
                          className="animate-spin"
                          aria-hidden="true"
                        />
                        Saving...
                      </>
                    ) : (
                      "Save availability"
                    )}
                  </button>
                </div>
              </section>
            )}
          </aside>
        </div>
      )}
    </div>
  );
};

export default MentorAvailabilityCalendar;

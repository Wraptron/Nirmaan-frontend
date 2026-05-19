import React, { useMemo, useState } from "react";
import {
  FaRegCalendarCheck,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import "./MentorAvailabilityCalendar.css";

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

const MentorAvailabilityCalendar = () => {
  const today = useMemo(() => new Date(), []);
  const todayKey = toDateKey(today);

  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [availabilityMap, setAvailabilityMap] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

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

  const toggleSlot = (slot) => {
    if (!selectedDate) return;
    setAvailabilityMap((prev) => {
      const current = prev[selectedDate] || [];
      const next = current.includes(slot)
        ? current.filter((s) => s !== slot)
        : [...current, slot].sort();
      return { ...prev, [selectedDate]: next };
    });
    setStatusMessage("");
  };

  const toggleSelectAll = () => {
    if (!selectedDate) return;
    setAvailabilityMap((prev) => {
      const current = prev[selectedDate] || [];
      const allSelected = ALL_SLOTS.every((s) => current.includes(s));
      return {
        ...prev,
        [selectedDate]: allSelected ? [] : [...ALL_SLOTS],
      };
    });
    setStatusMessage("");
  };

  const handleSave = () => {
    if (!selectedDate) return;
    setStatusMessage("Your availability has been saved successfully.");
  };

  const allSelectedForDay =
    selectedDate && ALL_SLOTS.every((s) => selectedSlots.includes(s));

  return (
    <div className="availability-page">
      <header className="availability-header">
        <div className="availability-header-icon" aria-hidden="true">
          <FaRegCalendarCheck />
        </div>
        <div>
          <h1>Manage availability</h1>
          <p className="subtitle">
            Set the dates and 1-hour time slots when you are open for mentorship
            sessions. Students can book only within your available windows.
          </p>
        </div>
        {daysWithAvailability > 0 && (
          <span className="availability-summary-badge">
            {daysWithAvailability} day
            {daysWithAvailability !== 1 ? "s" : ""} configured
          </span>
        )}
      </header>

      <div className="availability-layout">
        <section
          className="availability-calendar"
          aria-label="Monthly calendar"
        >
          <div className="calendar-header">
            <button
              type="button"
              className="calendar-nav-btn"
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
            <h2>{monthLabel}</h2>
            <button
              type="button"
              className="calendar-nav-btn"
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

          <div className="calendar-weekdays">
            {WEEKDAYS.map((day) => (
              <span key={day} className="calendar-weekday">
                {day}
              </span>
            ))}
          </div>

          <div className="calendar-grid">
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
                  className={[
                    "calendar-day",
                    !inMonth && "other-month",
                    isToday && "today",
                    isSelected && "selected",
                    hasSlots && "has-slots",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={isPast}
                  onClick={() => {
                    if (isPast) return;
                    setSelectedDate(key);
                    setStatusMessage("");
                  }}
                  aria-pressed={isSelected}
                  aria-label={
                    hasSlots
                      ? `${date.getDate()}, ${slotCount} slots set`
                      : `${date.getDate()}`
                  }
                >
                  <span className="calendar-day-num">{date.getDate()}</span>
                  {hasSlots && (
                    <span className="day-slot-count">{slotCount}</span>
                  )}
                </button>
              );
            })}
          </div>

          <ul className="calendar-legend" aria-label="Calendar legend">
            <li>
              <span className="legend-swatch legend-today" />
              Today
            </li>
            <li>
              <span className="legend-swatch legend-available" />
              Has availability
            </li>
            <li>
              <span className="legend-swatch legend-selected" />
              Selected day
            </li>
          </ul>
        </section>

        <aside className="slot-panel-wrapper">
          {!selectedDate ? (
            <div className="slot-panel slot-panel--empty">
              <div className="empty-state-icon" aria-hidden="true">
                <FaClock />
              </div>
              <h3>Select a date</h3>
              <p>
                Choose a future date on the calendar, then pick available
                1-hour session slots for that day.
              </p>
            </div>
          ) : (
            <section className="slot-panel" aria-label="Time slot picker">
              <div className="slot-panel-head">
                <div>
                  <p className="slot-panel-label">Editing availability for</p>
                  <h3>{formatDisplayDate(selectedDate)}</h3>
                </div>
                <div className="slot-count-pill">
                  {selectedSlots.length} / {ALL_SLOTS.length} slots
                </div>
              </div>

              <div className="slot-toolbar">
                <p className="slot-hint">
                  <FaClock className="slot-hint-icon" aria-hidden="true" />
                  1-hour sessions · {WINDOW_START_LABEL} – {WINDOW_END_LABEL}
                </p>
                <button
                  type="button"
                  className="select-all-btn"
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
                  <div key={group.id} className="slot-group">
                    <h4 className="slot-group-title">{group.label}</h4>
                    <div className="slots-grid">
                      {groupSlots.map((slot) => {
                        const isActive = selectedSlots.includes(slot);
                        return (
                          <button
                            key={slot}
                            type="button"
                            className={[
                              "slot-chip",
                              isActive && "active",
                            ]
                              .filter(Boolean)
                              .join(" ")}
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

              <div className="slot-actions">
                <button
                  type="button"
                  className="save-btn"
                  onClick={handleSave}
                >
                  Save availability
                </button>
                {statusMessage && (
                  <span className="availability-status success" role="status">
                    <FaCheckCircle aria-hidden="true" />
                    {statusMessage}
                  </span>
                )}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
};

export default MentorAvailabilityCalendar;

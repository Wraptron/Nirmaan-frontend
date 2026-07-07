import React, { useEffect, useMemo, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaMapMarkerAlt,
  FaVideo,
} from "react-icons/fa";
import useAvailability from "./useAvailability";
import {
  WEEKDAY_LABELS,
  buildMonthCalendarCells,
  formatDisplayDate,
  formatSlotLabel,
  getMonthAvailabilityStats,
  getTodayDateKey,
  normalizeMode,
  normalizeSlotEntry,
  slotEntryKey,
  toDateKey,
} from "./availabilitySlots";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const SESSION_TYPE_OPTIONS = [
  { value: "Online", label: "Online", icon: FaVideo },
  { value: "In-person", label: "Offline", icon: FaMapMarkerAlt },
];

const SLOT_GROUPS = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
];

const getSlotGroup = (slot) => {
  const hour = parseInt(normalizeSlotEntry(slot).time_slot.split(":")[0], 10);
  return hour < 12 ? "morning" : "afternoon";
};

const filterSlotsByMode = (slots, mode) => {
  const target = normalizeMode(mode);
  return (slots || []).filter(
    (entry) => normalizeMode(normalizeSlotEntry(entry).mode) === target
  );
};

/**
 * Startup booking UI: Online/Offline tabs, month calendar (left),
 * and time-slot timeline (right).
 */
function MentorBookingPicker({
  mentorId,
  mode,
  onModeChange,
  date,
  onDateChange,
  selectedSlotKey,
  onSlotSelect,
  disabled = false,
  dateError = "",
  timeError = "",
}) {
  const todayKey = getTodayDateKey();
  const today = useMemo(() => new Date(), []);

  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const { availabilityMap, slotsForDate, loading, error } =
    useAvailability(mentorId);

  const monthLabel = viewDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const calendarCells = useMemo(
    () => buildMonthCalendarCells(viewDate),
    [viewDate]
  );

  const modeFilteredSlotsForDate = (dateKey) =>
    filterSlotsByMode(slotsForDate(dateKey), mode);

  const monthStats = useMemo(() => {
    if (!mode) return { days: 0, slots: 0 };
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    let days = 0;
    let slots = 0;

    Object.keys(availabilityMap).forEach((dateKey) => {
      const bookable = filterSlotsByMode(slotsForDate(dateKey), mode);
      if (!bookable.length) return;
      const [y, m] = dateKey.split("-").map(Number);
      if (y === year && m - 1 === month) {
        days += 1;
        slots += bookable.length;
      }
    });

    return { days, slots };
  }, [availabilityMap, viewDate, mode, slotsForDate]);

  const datesInViewMonth = useMemo(() => {
    if (!mode) return [];
    return Object.keys(availabilityMap)
      .filter((dateKey) => {
        const [y, m] = dateKey.split("-").map(Number);
        const hasModeSlots =
          modeFilteredSlotsForDate(dateKey).length > 0;
        return (
          y === viewDate.getFullYear() &&
          m - 1 === viewDate.getMonth() &&
          hasModeSlots
        );
      })
      .sort();
  }, [availabilityMap, viewDate, mode, slotsForDate]);

  useEffect(() => {
    if (!mode || loading || date) return;
    const preferred =
      datesInViewMonth.find((d) => d >= todayKey) ||
      datesInViewMonth[datesInViewMonth.length - 1] ||
      "";
    if (preferred) {
      onDateChange(preferred);
    }
  }, [mode, loading, datesInViewMonth, date, todayKey, onDateChange]);

  const timeSlots = date && mode ? modeFilteredSlotsForDate(date) : [];
  const noAvailabilityOnDate =
    Boolean(date) && Boolean(mode) && !loading && timeSlots.length === 0;

  const handleModeSelect = (nextMode) => {
    if (disabled) return;
    onModeChange(nextMode);
    onDateChange("");
    onSlotSelect(null);
  };

  const handleDateSelect = (dateKey, hasSlots) => {
    if (disabled || !hasSlots || dateKey < todayKey) return;
    onDateChange(dateKey);
    onSlotSelect(null);
  };

  const handleSlotClick = (entry) => {
    if (disabled) return;
    onSlotSelect(normalizeSlotEntry(entry));
  };

  const shiftMonth = (delta) => {
    setViewDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1)
    );
  };

  const selectedModeLabel =
    SESSION_TYPE_OPTIONS.find((o) => o.value === normalizeMode(mode))
      ?.label || mode;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Session type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-0 rounded-xl border border-gray-200 overflow-hidden bg-gray-100 p-1">
          {SESSION_TYPE_OPTIONS.map(({ value, label, icon: Icon }) => {
            const isActive = normalizeMode(mode) === normalizeMode(value);
            return (
              <button
                key={value}
                type="button"
                disabled={disabled}
                onClick={() => handleModeSelect(value)}
                className={cn(
                  "flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors rounded-lg",
                  isActive
                    ? "bg-[#45C74D] text-white shadow-sm"
                    : "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-white/80",
                  disabled && "opacity-60 cursor-not-allowed"
                )}
                aria-pressed={isActive}
              >
                <Icon className="text-base shrink-0" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {mode ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Date & time <span className="text-red-500">*</span>
          </label>

          {loading ? (
            <div className="flex items-center gap-2 text-sm text-gray-500 py-6 justify-center rounded-xl border border-gray-200 bg-gray-50">
              <span className="inline-block w-4 h-4 border-2 border-[#45C74D] border-t-transparent rounded-full animate-spin" />
              Loading availability…
            </div>
          ) : error ? (
            <p className="text-sm text-red-600 py-4">{error}</p>
          ) : (
            <div className="grid gap-4 lg:grid-cols-[minmax(240px,300px)_1fr] rounded-xl border border-gray-200 bg-[#F8FAFB] p-3 sm:p-4">
              <section aria-label="Monthly calendar">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => shiftMonth(-1)}
                    disabled={disabled}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-60"
                    aria-label="Previous month"
                  >
                    <FaChevronLeft className="w-3 h-3" />
                  </button>
                  <div className="text-center min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 truncate">
                      {monthLabel}
                    </h3>
                    {monthStats.days > 0 ? (
                      <p className="text-[10px] text-[#2d8a33] font-medium mt-0.5">
                        {monthStats.days}{" "}
                        {monthStats.days === 1 ? "day" : "days"} ·{" "}
                        {monthStats.slots} slots
                      </p>
                    ) : (
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        No {selectedModeLabel.toLowerCase()} slots
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => shiftMonth(1)}
                    disabled={disabled}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-60"
                    aria-label="Next month"
                  >
                    <FaChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-0.5 mb-1">
                  {WEEKDAY_LABELS.map((day) => (
                    <span
                      key={day}
                      className="py-1 text-center text-[9px] font-bold uppercase tracking-wide text-gray-400"
                    >
                      {day}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-0.5">
                  {calendarCells.map(({ date: cellDate, inMonth }) => {
                    const key = toDateKey(cellDate);
                    const isPast = key < todayKey;
                    const slotCount = mode
                      ? modeFilteredSlotsForDate(key).length
                      : 0;
                    const hasSlots = slotCount > 0;
                    const isSelected = date === key;
                    const isToday = key === todayKey;
                    const isDisabled = disabled || isPast || !hasSlots;

                    return (
                      <button
                        key={`${key}-${inMonth}`}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => handleDateSelect(key, hasSlots)}
                        className={cn(
                          "relative flex aspect-square min-h-[32px] flex-col items-center justify-center rounded-lg border text-[11px] transition-colors",
                          !inMonth && "opacity-35",
                          isDisabled &&
                            "border-transparent text-gray-300 cursor-not-allowed bg-transparent",
                          !isDisabled &&
                            !isSelected &&
                            "border-transparent bg-white text-gray-800 hover:border-[#45C74D]/40 hover:bg-[#45C74D]/5 cursor-pointer",
                          isToday &&
                            !isSelected &&
                            hasSlots &&
                            "border-[#45C74D]/30",
                          isSelected &&
                            "border-[#45C74D] bg-[#45C74D] text-white font-semibold shadow-sm"
                        )}
                        aria-pressed={isSelected}
                      >
                        <span className="leading-none">{cellDate.getDate()}</span>
                        {hasSlots ? (
                          <span
                            className={cn(
                              "mt-0.5 rounded-full px-1 text-[8px] font-bold leading-tight",
                              isSelected
                                ? "bg-white/25 text-white"
                                : "bg-[#45C74D]/15 text-[#2d8a33]"
                            )}
                          >
                            {slotCount}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                <ul className="mt-2 flex flex-wrap gap-2 border-t border-gray-200 pt-2 text-[9px] text-gray-500">
                  <li className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded bg-[#45C74D]/15" />
                    Available
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded bg-[#45C74D]" />
                    Selected
                  </li>
                </ul>
              </section>

              <aside className="min-h-[200px]">
                {!date ? (
                  <div className="flex h-full min-h-[180px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-white/60 px-4 py-6 text-center">
                    <FaClock className="text-xl text-gray-300 mb-2" />
                    <p className="text-sm font-medium text-gray-700">
                      Select a highlighted day
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Green numbers show open {selectedModeLabel.toLowerCase()}{" "}
                      slots.
                    </p>
                  </div>
                ) : noAvailabilityOnDate ? (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-sm text-amber-800 h-full flex items-center">
                    No open {selectedModeLabel.toLowerCase()} slots on this date.
                    Pick another day.
                  </div>
                ) : (
                  <section className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4 h-full">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-0.5">
                      Available slots
                    </p>
                    <h3 className="text-sm font-bold text-gray-900 mb-3">
                      {formatDisplayDate(date)}
                    </h3>

                    <div className="relative pl-4 border-l-2 border-[#45C74D]/25 space-y-4 max-h-[220px] overflow-y-auto pr-1">
                      {SLOT_GROUPS.map((group) => {
                        const groupSlots = timeSlots.filter(
                          (entry) => getSlotGroup(entry) === group.id
                        );
                        if (groupSlots.length === 0) return null;

                        return (
                          <div key={group.id} className="relative">
                            <span className="absolute -left-[calc(1rem+5px)] top-1 h-2.5 w-2.5 rounded-full bg-[#45C74D] ring-2 ring-white" />
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                              {group.label}
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {groupSlots.map((entry) => {
                                const normalized = normalizeSlotEntry(entry);
                                const key = slotEntryKey(normalized);
                                const isSelected = selectedSlotKey === key;
                                return (
                                  <button
                                    key={key}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => handleSlotClick(entry)}
                                    className={cn(
                                      "py-2 px-2.5 text-xs font-medium rounded-lg border text-left transition-colors",
                                      isSelected
                                        ? "bg-[#45C74D] text-white border-[#45C74D] shadow-sm"
                                        : "bg-[#F8FAFB] text-gray-700 border-gray-200 hover:border-[#45C74D]/40 hover:bg-[#45C74D]/5",
                                      disabled && "opacity-60 cursor-not-allowed"
                                    )}
                                  >
                                    {formatSlotLabel(normalized.time_slot)}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}
              </aside>
            </div>
          )}

          {dateError ? (
            <p className="text-xs text-red-500 mt-1">{dateError}</p>
          ) : null}
          {timeError ? (
            <p className="text-xs text-red-500 mt-1">{timeError}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default MentorBookingPicker;

import React, { useEffect, useMemo, useState } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaClock,
  FaRegCalendarCheck,
} from "react-icons/fa";
import useAvailability from "../pages/Mentorship/availability/useAvailability";
import {
  WEEKDAY_LABELS,
  buildMonthCalendarCells,
  formatDisplayDate,
  formatSlotLabel,
  getMonthAvailabilityStats,
  getTodayDateKey,
  toDateKey,
} from "../pages/Mentorship/availability/availabilitySlots";

const cn = (...classes) => classes.filter(Boolean).join(" ");

/**
 * Read-only month calendar for admin mentor profiles.
 * Handles full-month availability without a long scroll list.
 */
function MentorAvailabilityDetails({ mentorId }) {
  const [expanded, setExpanded] = useState(false);
  const todayKey = getTodayDateKey();
  const today = useMemo(() => new Date(), []);

  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(null);

  const { availabilityMap, loading, error } = useAvailability(mentorId, {
    forBooking: false,
    enabled: expanded,
  });

  const monthLabel = viewDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const calendarCells = useMemo(
    () => buildMonthCalendarCells(viewDate),
    [viewDate]
  );

  const monthStats = useMemo(
    () => getMonthAvailabilityStats(availabilityMap, viewDate),
    [availabilityMap, viewDate]
  );

  const hasAnyAvailability = useMemo(
    () =>
      Object.keys(availabilityMap).some(
        (dateKey) => (availabilityMap[dateKey] || []).length > 0
      ),
    [availabilityMap]
  );

  const totalStats = useMemo(() => {
    let days = 0;
    let slots = 0;
    Object.entries(availabilityMap).forEach(([dateKey, daySlots]) => {
      if (!daySlots?.length || dateKey < todayKey) return;
      days += 1;
      slots += daySlots.length;
    });
    return { days, slots };
  }, [availabilityMap, todayKey]);

  const datesInViewMonth = useMemo(() => {
    return Object.keys(availabilityMap)
      .filter((dateKey) => {
        const [y, m] = dateKey.split("-").map(Number);
        return (
          y === viewDate.getFullYear() &&
          m - 1 === viewDate.getMonth() &&
          availabilityMap[dateKey]?.length > 0
        );
      })
      .sort();
  }, [availabilityMap, viewDate]);

  useEffect(() => {
    if (!expanded || loading) return;
    if (
      selectedDate &&
      datesInViewMonth.includes(selectedDate) &&
      availabilityMap[selectedDate]?.length
    ) {
      return;
    }
    const preferred =
      datesInViewMonth.find((d) => d >= todayKey) ||
      datesInViewMonth[datesInViewMonth.length - 1] ||
      null;
    setSelectedDate(preferred);
  }, [
    expanded,
    loading,
    datesInViewMonth,
    availabilityMap,
    selectedDate,
    todayKey,
    viewDate,
  ]);

  const selectedSlots = selectedDate
    ? availabilityMap[selectedDate] || []
    : [];

  const shiftMonth = (delta) => {
    setViewDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1)
    );
  };

  if (!mentorId) return null;

  return (
    <div className="bg-white rounded-lg mb-6 border border-gray-100 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((open) => !open)}
        className="w-full flex items-center justify-between gap-3 px-6 py-4 text-left hover:bg-gray-50/80 transition-colors"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2 min-w-0">
          <FaRegCalendarCheck className="text-[#45C74D] w-5 h-5 shrink-0" />
          <h2 className="text-lg font-semibold text-gray-900">Availability</h2>
          {!expanded && totalStats.days > 0 ? (
            <span className="text-xs text-gray-500 font-normal truncate">
              {totalStats.days} days · {totalStats.slots} slots
            </span>
          ) : !expanded ? (
            <span className="text-xs text-gray-500 font-normal truncate">
              Click to view monthly calendar
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {expanded && !loading && totalStats.days > 0 ? (
            <span className="hidden sm:inline text-xs font-medium text-[#2d8a33] bg-[#45C74D]/10 px-2.5 py-1 rounded-full">
              {totalStats.days} upcoming days · {totalStats.slots} slots
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#45C74D] bg-[#45C74D]/10 px-3 py-1.5 rounded-lg">
            {expanded ? (
              <>
                Hide
                <FaChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                Show
                <FaChevronDown className="w-3 h-3" />
              </>
            )}
          </span>
        </div>
      </button>

      {expanded ? (
        <div className="px-6 pb-6 pt-0 border-t border-gray-100">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-gray-500 py-6">
              <span className="inline-block w-4 h-4 border-2 border-[#45C74D] border-t-transparent rounded-full animate-spin" />
              Loading availability…
            </div>
          ) : error ? (
            <p className="text-sm text-red-600 py-4">{error}</p>
          ) : !hasAnyAvailability ? (
            <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/80 px-4 py-8 text-center mt-4">
              <p className="text-sm font-medium text-gray-700">
                No availability published
              </p>
              <p className="text-xs text-gray-500 mt-1">
                This mentor has not set open slots yet.
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-4">
                Browse by month. Green numbers show how many 1-hour slots are open
                on each day. Click a day to see exact times.
              </p>

              <div className="grid gap-5 lg:grid-cols-[minmax(260px,340px)_1fr]">
                <section
                  className="rounded-xl border border-gray-200 bg-[#F8FAFB] p-4"
                  aria-label="Monthly availability calendar"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => shiftMonth(-1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      aria-label="Previous month"
                    >
                      <FaChevronLeft className="w-3 h-3" />
                    </button>
                    <div className="text-center min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 truncate">
                        {monthLabel}
                      </h3>
                      {monthStats.days > 0 ? (
                        <p className="text-[11px] text-[#2d8a33] font-medium mt-0.5">
                          {monthStats.days} {monthStats.days === 1 ? "day" : "days"} ·{" "}
                          {monthStats.slots} slots
                        </p>
                      ) : (
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          No slots this month
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => shiftMonth(1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      aria-label="Next month"
                    >
                      <FaChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-0.5 mb-1">
                    {WEEKDAY_LABELS.map((day) => (
                      <span
                        key={day}
                        className="py-1 text-center text-[10px] font-bold uppercase tracking-wide text-gray-400"
                      >
                        {day}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-0.5">
                    {calendarCells.map(({ date, inMonth }) => {
                      const key = toDateKey(date);
                      const slotCount = (availabilityMap[key] || []).length;
                      const hasSlots = slotCount > 0;
                      const isPast = key < todayKey;
                      const isSelected = selectedDate === key;
                      const isToday = key === todayKey;

                      return (
                        <button
                          key={`${key}-${inMonth}`}
                          type="button"
                          disabled={!hasSlots}
                          onClick={() => hasSlots && setSelectedDate(key)}
                          className={cn(
                            "relative flex aspect-square min-h-[36px] flex-col items-center justify-center rounded-lg border text-xs transition-colors",
                            !inMonth && "opacity-40",
                            !hasSlots &&
                              "border-transparent text-gray-300 cursor-default",
                            hasSlots &&
                              !isSelected &&
                              "border-transparent bg-white text-gray-800 hover:border-[#45C74D]/40 hover:bg-[#45C74D]/5 cursor-pointer",
                            isToday && !isSelected && hasSlots && "border-[#45C74D]/30",
                            isSelected &&
                              "border-[#45C74D] bg-[#45C74D] text-white font-semibold shadow-sm",
                            hasSlots && isPast && !isSelected && "opacity-70"
                          )}
                          aria-pressed={isSelected}
                          aria-label={
                            hasSlots
                              ? `${date.getDate()} ${monthLabel}, ${slotCount} slots`
                              : `${date.getDate()} ${monthLabel}, no slots`
                          }
                        >
                          <span className="leading-none">{date.getDate()}</span>
                          {hasSlots ? (
                            <span
                              className={cn(
                                "mt-0.5 rounded-full px-1 text-[9px] font-bold leading-tight",
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

                  <ul className="mt-3 flex flex-wrap gap-3 border-t border-gray-200 pt-3 text-[10px] text-gray-500">
                    <li className="flex items-center gap-1">
                      <span className="h-2.5 w-2.5 rounded bg-[#45C74D]/15" />
                      Has slots
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="h-2.5 w-2.5 rounded bg-[#45C74D]" />
                      Selected
                    </li>
                  </ul>
                </section>

                <aside className="min-h-[200px]">
                  {!selectedDate || selectedSlots.length === 0 ? (
                    <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 px-6 py-8 text-center">
                      <FaClock className="text-2xl text-gray-300 mb-3" />
                      <p className="text-sm font-medium text-gray-700">
                        {monthStats.days === 0
                          ? "No slots in this month"
                          : "Select a highlighted day"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 max-w-[240px]">
                        {monthStats.days === 0
                          ? "Use the arrows to check other months."
                          : "Days with a green count have availability. Click one to see session times."}
                      </p>
                    </div>
                  ) : (
                    <section className="rounded-xl border border-gray-200 bg-white p-5 h-full">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                        Time slots
                      </p>
                      <h3 className="text-base font-bold text-gray-900 mb-1">
                        {formatDisplayDate(selectedDate)}
                      </h3>
                      <p className="text-xs text-gray-500 mb-4">
                        {selectedSlots.length}{" "}
                        {selectedSlots.length === 1 ? "slot" : "slots"} · 1 hour
                        each
                      </p>
                      <div className="flex flex-wrap gap-2 max-h-[280px] overflow-y-auto">
                        {selectedSlots.map((slot) => (
                          <span
                            key={slot}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-[#F8FAFB] border border-gray-200 rounded-md px-2.5 py-1.5"
                          >
                            <FaClock className="w-3 h-3 text-[#45C74D] shrink-0" />
                            {formatSlotLabel(slot)}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}
                </aside>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default MentorAvailabilityDetails;

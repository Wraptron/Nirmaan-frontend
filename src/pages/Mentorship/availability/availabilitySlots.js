/** Shared mentor availability slot helpers (mentor calendar + startup request form). */

export const SLOT_DURATION_MINUTES = 60;
export const SESSION_MODES = ["Online", "In-person"];

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

export const ALL_SLOTS = buildTimeSlots();

export const normalizeSlot = (slot) => String(slot).slice(0, 5);

export const normalizeMode = (mode) => {
  const value = String(mode || "").trim();
  if (value === "In-person" || value.toLowerCase() === "in-person") {
    return "In-person";
  }
  if (value === "Offline" || value.toLowerCase() === "offline") {
    return "In-person";
  }
  return "Online";
};

/** Normalize API/legacy slot entry to { time_slot, mode }. */
export const normalizeSlotEntry = (entry) => {
  if (typeof entry === "string") {
    return { time_slot: normalizeSlot(entry), mode: "Online" };
  }
  if (entry && typeof entry === "object") {
    const time =
      entry.time_slot ?? entry.time ?? entry.slot ?? entry.timeSlot ?? "";
    return {
      time_slot: normalizeSlot(time),
      mode: normalizeMode(entry.mode ?? entry.session_mode),
    };
  }
  return { time_slot: "", mode: "Online" };
};

export const slotEntryKey = (entry) => {
  const normalized = normalizeSlotEntry(entry);
  return `${normalized.time_slot}|${normalized.mode}`;
};

export const normalizeAvailabilityMap = (data) => {
  if (!data || typeof data !== "object") return {};
  return Object.entries(data).reduce((acc, [dateKey, slots]) => {
    const list = Array.isArray(slots)
      ? slots
          .map(normalizeSlotEntry)
          .filter((entry) => entry.time_slot)
          .sort((a, b) => {
            const timeCmp = a.time_slot.localeCompare(b.time_slot);
            if (timeCmp !== 0) return timeCmp;
            return a.mode.localeCompare(b.mode);
          })
      : [];
    if (list.length > 0) {
      acc[dateKey] = list;
    }
    return acc;
  }, {});
};

export const getTodayDateKey = () => {
  const now = new Date();
  return toDateKey(now);
};

export const toDateKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const buildMonthCalendarCells = (viewDate) => {
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
};

export { WEEKDAY_LABELS };

/** Count days and slots in availability map for a given calendar month. */
export const getMonthAvailabilityStats = (availabilityMap, viewDate) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  let days = 0;
  let slots = 0;

  Object.entries(availabilityMap).forEach(([dateKey, daySlots]) => {
    if (!daySlots?.length) return;
    const [y, m] = dateKey.split("-").map(Number);
    if (y === year && m - 1 === month) {
      days += 1;
      slots += daySlots.length;
    }
  });

  return { days, slots };
};

export const getCurrentTimeKey = () => new Date().toTimeString().slice(0, 5);

/** Dates that have at least one slot, today onward. */
export const getBookableDates = (availabilityMap) => {
  const today = getTodayDateKey();
  return Object.keys(availabilityMap)
    .filter((dateKey) => dateKey >= today && availabilityMap[dateKey]?.length > 0)
    .sort();
};

export const getSlotsForDate = (availabilityMap, dateKey) => {
  if (!dateKey || !availabilityMap[dateKey]) return [];
  return availabilityMap[dateKey].map(normalizeSlotEntry);
};

/** Hide slots that already started today. */
export const filterFutureSlots = (dateKey, slots) => {
  const today = getTodayDateKey();
  if (dateKey !== today) return slots;
  const now = getCurrentTimeKey();
  return slots.filter(
    (entry) => normalizeSlotEntry(entry).time_slot > now
  );
};

const slotToTimeParts = (slot) => {
  const time = normalizeSlotEntry(slot).time_slot;
  const [hStr, mStr] = time.split(":");
  return { h: parseInt(hStr, 10), m: mStr };
};

const formatTimeParts = (h, m) => {
  const period = h >= 12 ? "PM" : "AM";
  let displayH = h;
  if (displayH > 12) displayH -= 12;
  if (displayH === 0) displayH = 12;
  return `${displayH}:${m} ${period}`;
};

const minutesFromSlot = (slot) => {
  const time = normalizeSlotEntry(slot).time_slot;
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const formatSlotLabel = (slot) => {
  const { h, m } = slotToTimeParts(slot);
  const startLabel = formatTimeParts(h, m);
  const endMinutes = minutesFromSlot(slot) + SLOT_DURATION_MINUTES;
  const endH = Math.floor(endMinutes / 60);
  const endM = String(endMinutes % 60).padStart(2, "0");
  return `${startLabel} – ${formatTimeParts(endH, endM)}`;
};

export const formatSlotWithModeLabel = (entry) => {
  const normalized = normalizeSlotEntry(entry);
  return `${formatSlotLabel(normalized.time_slot)} · ${normalized.mode}`;
};

export const formatDisplayDate = (dateKey) => {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default buildTimeSlots;

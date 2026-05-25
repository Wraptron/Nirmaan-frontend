/** Shared mentor availability slot helpers (mentor calendar + startup request form). */

export const SLOT_DURATION_MINUTES = 60;
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

export const normalizeAvailabilityMap = (data) => {
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

export const getTodayDateKey = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
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
  return availabilityMap[dateKey].map(normalizeSlot);
};

/** Hide slots that already started today. */
export const filterFutureSlots = (dateKey, slots) => {
  const today = getTodayDateKey();
  if (dateKey !== today) return slots;
  const now = getCurrentTimeKey();
  return slots.filter((slot) => normalizeSlot(slot) > now);
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

const minutesFromSlot = (slot) => {
  const [h, m] = slot.split(":").map(Number);
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
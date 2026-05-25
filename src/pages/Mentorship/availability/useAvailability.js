import { useEffect, useMemo, useState } from "react";
import { ApiFetchMentorAvailability } from "../../../API/API";
import {
  normalizeAvailabilityMap,
  getBookableDates,
  getSlotsForDate,
  filterFutureSlots,
} from "./availabilitySlots";

/**
 * Loads a mentor's saved availability for booking UIs (e.g. Request Mentor).
 * @param {string|number|null} mentorId
 */
function useAvailability(mentorId) {
  const [availabilityMap, setAvailabilityMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mentorId) {
      setAvailabilityMap({});
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    ApiFetchMentorAvailability(mentorId, { forBooking: true })
      .then((data) => {
        if (cancelled) return;
        setAvailabilityMap(normalizeAvailabilityMap(data));
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("useAvailability:", err);
        setAvailabilityMap({});
        setError("Could not load mentor availability.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [mentorId]);

  const availableDates = useMemo(
    () => getBookableDates(availabilityMap),
    [availabilityMap]
  );

  const slotsForDate = (dateKey) => {
    const slots = getSlotsForDate(availabilityMap, dateKey);
    return filterFutureSlots(dateKey, slots);
  };

  return {
    availabilityMap,
    availableDates,
    slotsForDate,
    loading,
    error,
    hasAvailability: availableDates.length > 0,
  };
}

export default useAvailability;
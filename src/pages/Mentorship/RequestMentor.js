import React, { useState } from "react";
import toast from "react-hot-toast";
import { ApiRequestMentor } from "../../API/API";
import useAvailability from "./availability/useAvailability.js";
import {
  formatSlotWithModeLabel,
  getSlotsForDate,
  getTodayDateKey,
  normalizeSlotEntry,
  slotEntryKey,
  SLOT_DURATION_MINUTES,
} from "./availability/availabilitySlots.js";

const RequestMentor = ({ onClose, mentorId, mentorName }) => {
  const {
    availabilityMap,
    slotsForDate,
    loading: availabilityLoading,
  } = useAvailability(mentorId);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    duration: String(SLOT_DURATION_MINUTES),
    mode: "",
    agenda: "",
  });
  const [selectedSlotKey, setSelectedSlotKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    date: "",
    time: "",
    duration: "",
    mode: "",
  });

  const savedSlotsForDate = formData.date
    ? getSlotsForDate(availabilityMap, formData.date)
    : [];
  const timeSlots = formData.date ? slotsForDate(formData.date) : [];
  const noAvailabilityOnDate =
    Boolean(formData.date) &&
    !availabilityLoading &&
    timeSlots.length === 0;
  const allSlotsPassedToday =
    noAvailabilityOnDate && savedSlotsForDate.length > 0;

  const clearFieldError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    clearFieldError("date");
    clearFieldError("time");
    clearFieldError("mode");
    setSelectedSlotKey("");
    setFormData((prev) => ({
      ...prev,
      date: value,
      time: "",
      mode: "",
    }));
  };

  const handleSlotSelect = (entry) => {
    const normalized = normalizeSlotEntry(entry);
    clearFieldError("time");
    clearFieldError("mode");
    const key = slotEntryKey(normalized);
    setSelectedSlotKey(key);
    setFormData((prev) => ({
      ...prev,
      time: normalized.time_slot,
      mode: normalized.mode,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "duration") clearFieldError("duration");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {
      date: "",
      time: "",
      duration: "",
      mode: "",
    };

    if (!mentorId) {
      toast.error("Mentor is required to submit a request.");
      return;
    }
    if (!formData.date) nextErrors.date = "Please select a date";
    if (!formData.time || !formData.mode) {
      nextErrors.time = noAvailabilityOnDate
        ? "No availability on this date — choose another date"
        : "Please select a time slot and session mode";
    }
    if (!formData.duration) nextErrors.duration = "Please select a duration";

    if (
      nextErrors.date ||
      nextErrors.time ||
      nextErrors.duration ||
      nextErrors.mode
    ) {
      setErrors(nextErrors);
      return;
    }

    setIsLoading(true);
    try {
      await ApiRequestMentor({
        mentor_id: mentorId,
        mentor_name: mentorName || "",
        date: formData.date,
        time: formData.time,
        duration: formData.duration,
        mode: formData.mode,
        agenda: formData.agenda,
      });
      toast.success(
        mentorName
          ? `Request sent for ${mentorName}.`
          : "Mentor request submitted."
      );
      onClose();
    } catch (err) {
      toast.error(err?.message || "Request failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formDisabled = isLoading;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:text-gray-500"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M1 13L13 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="p-6 pt-10">
          <h2 className="text-xl font-semibold text-[#232323] mb-1">
            Request Mentor
          </h2>
          {mentorName ? (
            <p className="text-sm text-gray-600 mb-5">{mentorName}</p>
          ) : (
            <p className="text-sm text-gray-500 mb-5">
              Select a date, then choose an available slot (time and mode).
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                min={getTodayDateKey()}
                onChange={handleDateChange}
                disabled={formDisabled}
                className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D] disabled:opacity-60"
              />
              {errors.date ? (
                <p className="text-xs text-red-500 mt-1">{errors.date}</p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Available slot <span className="text-red-500">*</span>
              </label>

              {!formData.date ? (
                <p className="text-xs text-gray-500">
                  Select a date to view this mentor&apos;s available slots.
                </p>
              ) : availabilityLoading ? (
                <p className="text-xs text-gray-500">Loading slots…</p>
              ) : noAvailabilityOnDate ? (
                <div
                  className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-800"
                  role="status"
                >
                  {allSlotsPassedToday
                    ? "No open slots remain on this date. Please choose another date."
                    : "This mentor has no availability on the selected date. Please choose another date."}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {timeSlots.map((entry) => {
                    const key = slotEntryKey(entry);
                    const isSelected = selectedSlotKey === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        disabled={formDisabled}
                        onClick={() => handleSlotSelect(entry)}
                        className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-colors ${
                          isSelected
                            ? "bg-[#45C74D] text-white border-[#45C74D]"
                            : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                        } disabled:opacity-60`}
                      >
                        <span className="block font-semibold">
                          {formatSlotWithModeLabel(entry)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {errors.time ? (
                <p className="text-xs text-red-500 mt-1">{errors.time}</p>
              ) : null}
              {formData.mode ? (
                <p className="text-xs text-gray-500 mt-2">
                  Selected mode:{" "}
                  <span className="font-medium text-gray-700">
                    {formData.mode}
                  </span>
                </p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Duration <span className="text-red-500">*</span>
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                disabled={formDisabled}
                className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D] disabled:opacity-60"
              >
                <option value={String(SLOT_DURATION_MINUTES)}>
                  {SLOT_DURATION_MINUTES} min
                </option>
              </select>
              {errors.duration ? (
                <p className="text-xs text-red-500 mt-1">{errors.duration}</p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Agenda{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                name="agenda"
                value={formData.agenda}
                onChange={handleChange}
                rows={3}
                disabled={formDisabled}
                placeholder="What do you want to cover in this session?"
                className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D] resize-none disabled:opacity-60"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formDisabled || noAvailabilityOnDate}
                className="inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[#45C74D] rounded-lg transition-colors hover:bg-[#3bae42] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#45C74D]"
              >
                {isLoading ? (
                  <>
                    <span
                      className="inline-block h-3.5 w-3.5 shrink-0 rounded-full border-2 border-white/35 border-t-white animate-spin"
                      aria-hidden
                    />
                    Submitting...
                  </>
                ) : (
                  "Submit request"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestMentor;

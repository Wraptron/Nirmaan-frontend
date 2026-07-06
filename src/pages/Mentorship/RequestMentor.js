import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import toast from "react-hot-toast";
import { ApiRequestMentor } from "../../API/API";
import MentorBookingPicker from "./availability/MentorBookingPicker.js";
import {
  normalizeSlotEntry,
  slotEntryKey,
  SLOT_DURATION_MINUTES,
} from "./availability/availabilitySlots.js";

const emptyForm = () => ({
  date: "",
  time: "",
  duration: String(SLOT_DURATION_MINUTES),
  mode: "",
  meeting_link: "",
  agenda: "",
});

const RequestMentor = ({ mentorId, mentorName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const [formData, setFormData] = useState(emptyForm);
  const [selectedSlotKey, setSelectedSlotKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    date: "",
    time: "",
    duration: "",
    mode: "",
    meeting_link: "",
  });

  const resetForm = () => {
    setFormData(emptyForm());
    setSelectedSlotKey("");
    setErrors({
      date: "",
      time: "",
      duration: "",
      mode: "",
      meeting_link: "",
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const clearFieldError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleModeChange = (mode) => {
    clearFieldError("mode");
    clearFieldError("date");
    clearFieldError("time");
    clearFieldError("meeting_link");
    setSelectedSlotKey("");
    setFormData((prev) => ({
      ...prev,
      mode,
      date: "",
      time: "",
      meeting_link: "",
    }));
  };

  const handleDateChange = (date) => {
    clearFieldError("date");
    clearFieldError("time");
    setSelectedSlotKey("");
    setFormData((prev) => ({
      ...prev,
      date,
      time: "",
    }));
  };

  const handleSlotSelect = (entry) => {
    if (!entry) {
      setSelectedSlotKey("");
      setFormData((prev) => ({ ...prev, time: "" }));
      return;
    }
    const normalized = normalizeSlotEntry(entry);
    clearFieldError("time");
    clearFieldError("mode");
    clearFieldError("meeting_link");
    const key = slotEntryKey(normalized);
    setSelectedSlotKey(key);
    setFormData((prev) => ({
      ...prev,
      time: normalized.time_slot,
      mode: normalized.mode,
      meeting_link: "",
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
      meeting_link: "",
    };

    if (!mentorId) {
      toast.error("Mentor is required to submit a request.");
      return;
    }
    if (!formData.mode) {
      nextErrors.mode = "Please choose Online or Offline";
    }
    if (!formData.date) nextErrors.date = "Please select a date";
    if (!formData.time) {
      nextErrors.time = "Please select a time slot";
    }
    if (!formData.duration) nextErrors.duration = "Please select a duration";

    const isOnline =
      formData.mode && formData.mode.toLowerCase() === "online";
    if (isOnline && !formData.meeting_link?.trim()) {
      nextErrors.meeting_link = "Meeting link is required for online sessions";
    }

    if (
      nextErrors.date ||
      nextErrors.time ||
      nextErrors.duration ||
      nextErrors.mode ||
      nextErrors.meeting_link
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
        meeting_link: formData.meeting_link?.trim() || "",
        agenda: formData.agenda,
      });
      toast.success(
        mentorName
          ? `Meeting scheduled with ${mentorName}.`
          : "Meeting scheduled successfully."
      );
      handleClose();
    } catch (err) {
      toast.error(err?.message || "Request failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formDisabled = isLoading;
  const isOnline =
    formData.mode && formData.mode.toLowerCase() === "online";
  const hasSlot = Boolean(formData.time);
  const canSubmit =
    formData.mode && formData.date && formData.time && formData.duration;

  const handleToggle = () => {
    setIsOpen((open) => !open);
  };

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const frame = requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  return (
    <div className="w-full">
      {isOpen ? (
        <div
          ref={panelRef}
          className="mb-5 rounded-2xl border border-gray-200 bg-white shadow-sm p-6 scroll-mt-6"
        >
          {mentorName ? (
            <p className="text-sm text-gray-600 mb-5">
              Booking a session with{" "}
              <span className="font-medium">{mentorName}</span>
            </p>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-5">
            <MentorBookingPicker
              mentorId={mentorId}
              mode={formData.mode}
              onModeChange={handleModeChange}
              date={formData.date}
              onDateChange={handleDateChange}
              selectedSlotKey={selectedSlotKey}
              onSlotSelect={handleSlotSelect}
              disabled={formDisabled}
              dateError={errors.date}
              timeError={errors.time || errors.mode}
            />

            {hasSlot ? (
              <>
                {isOnline ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Meeting Link <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      name="meeting_link"
                      value={formData.meeting_link}
                      onChange={(e) => {
                        clearFieldError("meeting_link");
                        setFormData((prev) => ({
                          ...prev,
                          meeting_link: e.target.value,
                        }));
                      }}
                      disabled={formDisabled}
                      placeholder="https://meet.google.com/... or Zoom/Teams link"
                      className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D] disabled:opacity-60"
                    />
                    {errors.meeting_link ? (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.meeting_link}
                      </p>
                    ) : null}
                  </div>
                ) : null}

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
                    onClick={handleClose}
                    disabled={isLoading}
                    className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formDisabled || !canSubmit}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] disabled:opacity-60 disabled:cursor-not-allowed"
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
                      "Schedule meeting"
                    )}
                  </button>
                </div>
              </>
            ) : null}
          </form>
        </div>
      ) : null}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleToggle}
          disabled={isLoading}
          className="inline-flex items-center gap-2 border border-[#45C74D] text-[#45C74D] hover:bg-green-50 px-6 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-60"
          aria-expanded={isOpen}
        >
          Request Mentor
          {isOpen ? (
            <FaChevronUp className="text-xs" />
          ) : (
            <FaChevronDown className="text-xs" />
          )}
        </button>
      </div>
    </div>
  );
};

export default RequestMentor;

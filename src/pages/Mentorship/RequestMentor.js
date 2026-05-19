import React, { useState } from "react";
import toast from "react-hot-toast";
import { ApiRequestMentor } from "../../API/API";

const RequestMentor = ({ onClose, mentorId, mentorName }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    duration: "",
    mode: "",
    agenda: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    date: "",
    time: "",
    duration: "",
    mode: "",
  });

  const clearFieldError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const getCurrentTime = () => new Date().toTimeString().slice(0, 5);

  const getMinTime = () => {
    if (formData.date === getTodayDate()) return getCurrentTime();
    return "00:00";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date" || name === "time" || name === "duration") {
      clearFieldError(name);
    }

    if (name === "date") {
      const today = getTodayDate();
      const currentTime = getCurrentTime();
      const shouldClearTime =
        value === today && formData.time && formData.time < currentTime;
      setFormData((prev) => {
        const next = { ...prev, date: value };
        if (value === today && prev.time && prev.time < currentTime) {
          next.time = "";
        }
        return next;
      });
      if (shouldClearTime) clearFieldError("time");
      return;
    }

    if (name === "time") {
      const today = getTodayDate();
      if (formData.date === today) {
        const currentTime = getCurrentTime();
        if (value < currentTime) {
          toast.error("Choose a future time for today.");
          return;
        }
      }
    }

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
    if (!formData.date) nextErrors.date = "Please select a date";
    if (!formData.time) nextErrors.time = "Please select a time";
    if (!formData.duration) nextErrors.duration = "Please select a duration";
    if (!formData.mode) nextErrors.mode = "Please select a session mode";

    if (nextErrors.date || nextErrors.time || nextErrors.duration || nextErrors.mode) {
      setErrors(nextErrors);
      return;
    }

    setIsLoading(true);
    try {
      await ApiRequestMentor({
        mentorId,
        mentorName: mentorName || "",
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

  const modes = ["Online", "In-person"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md relative">
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
              Pick a preferred slot and session mode.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                min={getTodayDate()}
                onChange={handleChange}
                className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
              />
              {errors.date ? (
                <p className="text-xs text-red-500 mt-1">{errors.date}</p>
              ) : null}
            </div>

            {/* Time + Duration side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  min={getMinTime()}
                  onChange={handleChange}
                  className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                />
                {errors.time ? (
                  <p className="text-xs text-red-500 mt-1">{errors.time}</p>
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
                  className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                >
                  <option value="">Select</option>
                  <option value="30">30 min</option>
                  <option value="60">60 min</option>
                  <option value="90">90 min</option>
                </select>
                {errors.duration ? (
                  <p className="text-xs text-red-500 mt-1">{errors.duration}</p>
                ) : null}
              </div>
            </div>

            {/* Mode — toggle buttons */}
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">
                Session mode <span className="text-red-500">*</span>
              </span>
              <div className="flex gap-2">
                {modes.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      clearFieldError("mode");
                      setFormData((prev) => ({ ...prev, mode: m }));
                    }}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      formData.mode === m
                        ? "bg-[#45C74D] text-white border-[#45C74D]"
                        : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              {errors.mode ? (
                <p className="text-xs text-red-500 mt-1">{errors.mode}</p>
              ) : null}
            </div>

            {/* Agenda — optional */}
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
                placeholder="What do you want to cover in this session?"
                className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D] resize-none"
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
                disabled={isLoading}
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
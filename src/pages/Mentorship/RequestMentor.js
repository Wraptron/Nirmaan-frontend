import React, { useState } from "react";
import toast from "react-hot-toast";

const RequestMentor = ({ onClose, mentorId, mentorName }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    mode: "Online",
  });

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const getCurrentTime = () => new Date().toTimeString().slice(0, 5);

  const getMinTime = () => {
    if (formData.date === getTodayDate()) return getCurrentTime();
    return "00:00";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      const today = getTodayDate();
      const currentTime = getCurrentTime();
      setFormData((prev) => {
        const next = { ...prev, date: value };
        if (value === today && prev.time && prev.time < currentTime) {
          next.time = "";
        }
        return next;
      });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time) {
      toast.error("Please select date and time.");
      return;
    }

    // TODO: ApiRequestMentor({ mentorId, mentorName, date: formData.date, time: formData.time, mode: formData.mode })
    toast.success(
      mentorName
        ? `Request sent for ${mentorName}.`
        : "Mentor request submitted."
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
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
            </div>

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
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">
                Preferred mode <span className="text-red-500">*</span>
              </span>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="Online"
                    checked={formData.mode === "Online"}
                    onChange={handleChange}
                    className="text-[#45C74D] focus:ring-[#45C74D]"
                  />
                  <span className="text-sm text-gray-800">Online</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value="Offline"
                    checked={formData.mode === "Offline"}
                    onChange={handleChange}
                    className="text-[#45C74D] focus:ring-[#45C74D]"
                  />
                  <span className="text-sm text-gray-800">Offline</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors"
              >
                Submit request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestMentor;

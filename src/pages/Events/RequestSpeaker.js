import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { ApiFetchMentor } from "../../API/API";

const RequestSpeaker = ({ onClose }) => {
  const [formData, setFormData] = useState({
    speaker_name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[700px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
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

        <div className="p-6">
          <h2 className="text-xl font-semibold text-[#232323] mb-6">
            Request Speaker
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">
                Speaker Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="speaker_name"
                value={formData.speaker_name}
                onChange={handleChange}
                placeholder="Enter speaker name"
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
              />
            </div>

            <div>
              <label className="block text-sm mb-1.5">Anything to Share?</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Type here..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors"
              >
                Request Speaker
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestSpeaker;

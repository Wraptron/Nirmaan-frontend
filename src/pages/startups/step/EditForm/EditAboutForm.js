import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ApiFetchStartup, ApiUpdateStartupAbout } from "../../../../API/API";

const EditAboutForm = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    sector: "",
    program: "",
    startup_type: "",
    about: "",
     email_address: "" 
  });

 useEffect(() => {
  if (initialData) {
    setFormData({
      sector: initialData.startup_sector || "",
      program: initialData.program || "",
      startup_type: initialData.startup_type || "",
      about: initialData.about || "",
       email_address: initialData.email_address || "" 
    });
  }
}, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", formData); // 🧪 Confirm before sending

    try {
      await ApiUpdateStartupAbout(formData); // ✅ send as JSON object
      toast.success("Profile updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
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
            Edit About Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1.5">Startup Type</label>
                <input
                  type="text"
                  name="startup_type"
                  value={formData.startup_type}
                  onChange={handleChange}
                  placeholder="Enter startup type"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">Sector</label>
                <input
                  type="text"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  placeholder="Enter sector"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">Program</label>
                <input
                  type="text"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  placeholder="Enter program"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAboutForm;
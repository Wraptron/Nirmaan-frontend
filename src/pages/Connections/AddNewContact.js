import React, { useState } from "react";
import toast from "react-hot-toast";

const AddNewContact = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    organisation: "",
    purpose: "",
    contact_number: "",
    email: "",
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5">
                  Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">
                  Designation<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Enter designation"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5">
                  Organisation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleChange}
                  placeholder="Enter organisation"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">
                  Purpose<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    placeholder="Enter purpose"
                    className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1.5">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    placeholder="xxxxx xxxxx"
                    className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1.5">
                  Email Address<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
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
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewContact;

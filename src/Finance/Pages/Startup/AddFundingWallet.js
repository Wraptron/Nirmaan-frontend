import React from "react";
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import {ApiAddFundingProject } from "../../../API/API";


const AddFundingWallet = ({ onClose, onSuccess }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({
    project_name: "",
    funding_type: "Funding Disbursed",
    amount: "",
    date: "",
  });

  const Project_names = [
    "Nirmaan Seed Funding",
    "Shankar Endownment Fund",
    "Nirmaan External",
    "AI for Healthcare",
    "UGFIR",
    "PGFIR",
    "Nirmaan the Pre-Incubator",
    "Amex Program for Innovation & Entrepreneurship",
  ];
  useEffect(() => {
    if (formData.project_name) {
      setFormData((prev) => ({
        ...prev,
        project_name: formData.project_name || "",
      }));
    }
  }, [formData.project_name]);

  const handleSelect = (project) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        project_name: project,
      };
      return updated;
    });
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "funding_type") {
      setFormData((prev) => ({
        ...prev,
        funding_type: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitting form with data:", formData);

  const formPayload = { ...formData };

  try {
    const res = await ApiAddFundingProject(formPayload);
    console.log("API Response:", res);

    toast.success("Funding saved successfully");
    if (onSuccess) onSuccess(); // refresh parent
    onClose();
  } catch (error) {
    console.error("Error saving funding:", error);
    toast.error("Failed to save funding");
  }
};

  const handleCancel = () => {
    setFormData({
      project_name: "",
      funding_type: "Funding Disbursed",
      amount: "",
      date: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#232323]">
              Add Funding Wallet
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX size={20} className="text-[#A1A1A1]" />
            </button>
          </div>

          {/* Form */}
          <div className="bg-gray-50 rounded-lg p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Project Name
                </label>

                <input
                  type="text"
                  name="project_name"
                  placeholder="Select Project name"
                  value={formData.project_name}
                  onFocus={() => setShowDropdown(true)}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      project_name: e.target.value,
                    }));
                    setShowDropdown(true);
                  }}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                  autoComplete="off"
                />

                {showDropdown && Project_names.length > 0 && (
                  <ul className="absolute z-10 w-[23rem] p-2 text-sm text-gray-900 border border-gray-300 max-h-48 overflow-y-auto rounded-lg bg-gray-50">
                    {Project_names.filter((p) =>
                      p
                        .toLowerCase()
                        .includes(formData.project_name.toLowerCase())
                    ).map((project, index) => (
                      <li
                        key={index}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        onMouseDown={() => handleSelect(project)}
                      >
                        {project}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Funding Type
                </label>
                <input
                  type="text"
                  name="funding_type"
                  value={formData.funding_type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  placeholder="Enter Funding Type"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  required
                />
              </div>

              <div className="col-span-2 flex gap-3">
                <button
                  funding_type="submit"
                  className="bg-[#45C74D] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#36a03d] transition"
                >
                  Add Wallet
                </button>
                <button
                  funding_type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFundingWallet;

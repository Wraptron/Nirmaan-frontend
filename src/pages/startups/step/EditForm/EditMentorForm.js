import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ApiUpdateStartupMentorDetails } from "../../../../API/API";

const EditMentorForm = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    mentors: "",
    role_of_faculty: "",
    cin_registration_number: "",
    year_of_graduation: "",
    funding_stage: "",
    industry: "",
    graduated_to: "",
    officially_registered: "",
    cohort: "",
    technology: "",
    dpiit_number: "",
    pia: "",
    email_address: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        mentors: initialData.mentor_associated || "",
        role_of_faculty: initialData.role_of_faculty || "",
        cin_registration_number: initialData.cin_registration_number || "",
        year_of_graduation: initialData.startup_yog || "",
        funding_stage: initialData.funding_stage || "",
        industry: initialData.startup_industry || "",
        graduated_to: initialData.graduated_to || "",
        officially_registered: initialData.register || "",
        cohort: initialData.startup_cohort || "",
        technology: initialData.startup_technology || "",
        dpiit_number: initialData.dpiit || "",
        pia: initialData.pia_state || "",
        email_address: initialData.email_address || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidYear = (year) =>
    /^\d{4}$/.test(year);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // === VALIDATION ===
    const requiredFields = [
      "mentors", "role_of_faculty", "cin_registration_number", "year_of_graduation",
      "funding_stage", "industry", "graduated_to", "officially_registered",
      "cohort", "technology", "dpiit_number", "pia", "email_address"
    ];

    for (const field of requiredFields) {
      if (!formData[field]?.trim()) {
        toast.error(`${field.replace(/_/g, " ")} is required`);
        return;
      }
    }

    if (!isValidEmail(formData.email_address)) {
      toast.error("Enter a valid email address");
      return;
    }

    if (!isValidYear(formData.year_of_graduation)) {
      toast.error("Year of graduation must be a 4-digit year");
      return;
    }

    if (isNaN(formData.dpiit_number)) {
      toast.error("DPIIT number must be numeric");
      return;
    }

    try {
      await ApiUpdateStartupMentorDetails(formData);
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
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-[#232323] mb-6">Edit Mentor & Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1.5 font-medium">Mentors <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="mentors"
                  value={formData.mentors}
                  onChange={handleChange}
                  placeholder="Enter Mentors"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Role of Faculty <span className="text-red-500">*</span></label>
                <select
                  onChange={handleChange}
                  name="role_of_faculty"
                  value={formData.role_of_faculty}
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-green-500"
                >
                  <option value="">Select Role </option>
                  <option value="Advisor/ Mentor">Advisor/ Mentor</option>
                  <option value="Co-Founder">Co-Founder</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">CIN/Registration Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="cin_registration_number"
                  value={formData.cin_registration_number}
                  onChange={handleChange}
                  placeholder="Enter CIN/Registration Number"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Year of Graduation <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="year_of_graduation"
                  value={formData.year_of_graduation}
                  onChange={handleChange}
                  placeholder="e.g., 2024"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Current Funding Stage <span className="text-red-500">*</span></label>
                <select
                  onChange={handleChange}
                  name="funding_stage"
                  value={formData.funding_stage}
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-green-500"
                >
                  <option value="">Select Funding Stage</option>
                  <option value="Pre-Seed">Pre-Seed</option>
                  <option value="Seed">Seed</option>
                  <option value="Pre-Series A">Pre-Series A</option>
                  <option value="Series A">Series A</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Industry <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="Enter Industry"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Graduated To <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="graduated_to"
                  value={formData.graduated_to}
                  onChange={handleChange}
                  placeholder="Enter Graduated To"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Officially Registered as <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="officially_registered"
                  value={formData.officially_registered}
                  onChange={handleChange}
                  placeholder="Enter Official Status"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Cohort (Name & Year) <span className="text-red-500">*</span></label>
                <input
                  type="month"
                  name="cohort"
                  value={formData.cohort}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Technology <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="technology"
                  value={formData.technology}
                  onChange={handleChange}
                  placeholder="Enter Technology"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">DPIIT Number <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="dpiit_number"
                  value={formData.dpiit_number}
                  onChange={handleChange}
                  placeholder="Enter DPIIT Number"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">PIA <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="pia"
                  value={formData.pia}
                  onChange={handleChange}
                  placeholder="Enter PIA"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-green-500"
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

export default EditMentorForm;

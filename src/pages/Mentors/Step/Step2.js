import React, { useState } from "react";

const Step2 = ({ formData, handleChange }) => {
  const [errors, setErrors] = useState({
    years_of_experience: "",
    area_of_expertise: "",
    current_designation: "",
    institution: "",
    qualification: "",
    year_of_passing_out: "",
    startup_associated: ""
  });

  // Options for dropdown fields
  const expertiseOptions = [
    "Software Development",
    "Business Strategy",
    "Marketing & Growth"
  ];

  const startupOptions = [
    "Seed Stage Startups",
    "Growth Stage Startups",
    "Enterprise Level"
  ];

  // Custom handler for validation
  const validateAndChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    // Validation rules
    switch (name) {
      case "years_of_experience":
        if (!value.trim()) {
          newErrors.years_of_experience = "Experience years is required";
        } else if (isNaN(value) || parseInt(value) < 0) {
          newErrors.years_of_experience = "Please enter a valid number of years";
        } else {
          newErrors.years_of_experience = "";
        }
        break;
      case "area_of_expertise":
        if (!value.trim()) {
          newErrors.area_of_expertise = "Area of expertise is required";
        } else {
          newErrors.area_of_expertise = "";
        }
        break;
      case "current_designation":
        if (!value.trim()) {
          newErrors.current_designation = "Current designation is required";
        } else {
          newErrors.current_designation = "";
        }
        break;
      case "institution":
        if (!value.trim()) {
          newErrors.institution = "Institution is required";
        } else {
          newErrors.institution = "";
        }
        break;
      case "qualification":
        if (!value.trim()) {
          newErrors.qualification = "Qualification is required";
        } else {
          newErrors.qualification = "";
        }
        break;
      case "year_of_passing_out":
        if (!value.trim()) {
          newErrors.year_of_passing_out = "Year is required";
        } else if (isNaN(value) || parseInt(value) < 1950 || parseInt(value) > new Date().getFullYear()) {
          newErrors.year_of_passing_out = "Please enter a valid year";
        } else {
          newErrors.year_of_passing_out = "";
        }
        break;
      case "startup_associated":
        if (!value.trim()) {
          newErrors.startup_associated = "Startup association is required";
        } else {
          newErrors.startup_associated = "";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    handleChange(e);
  };

  return (
    <div className="grid grid-cols-2 gap-4 items-start">
      <div className="mb-4">
        <div className="mb-1">
          Year of Experience <span className="text-[#E54545]">*</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter year of experience"
            onChange={validateAndChange}
            name="years_of_experience"
            value={formData.years_of_experience || ""}
            className={`block w-full p-2 text-sm text-gray-900 border ${
              errors.years_of_experience ? "border-[#E54545]" : "border-gray-300"
            } rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]`}
          />
          {errors.years_of_experience && (
            <p className="text-[#E54545] text-xs mt-1">{errors.years_of_experience}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-1">
          Area of Expertise <span className="text-[#E54545]">*</span>
        </div>
        <div>
          <select
            name="area_of_expertise"
            value={formData.area_of_expertise || ""}
            onChange={validateAndChange}
            className={`block w-full p-2 text-sm text-gray-900 border ${
              errors.area_of_expertise ? "border-[#E54545]" : "border-gray-300"
            } rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]`}
          >
            <option value="">Select area of expertise</option>
            {expertiseOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.area_of_expertise && (
            <p className="text-[#E54545] text-xs mt-1">{errors.area_of_expertise}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-1">
          Current Designation <span className="text-[#E54545]">*</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter current designation"
            onChange={validateAndChange}
            name="current_designation"
            value={formData.current_designation || ""}
            className={`block w-full p-2 text-sm text-gray-900 border ${
              errors.current_designation ? "border-[#E54545]" : "border-gray-300"
            } rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]`}
          />
          {errors.current_designation && (
            <p className="text-[#E54545] text-xs mt-1">{errors.current_designation}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-1">
          Institution <span className="text-[#E54545]">*</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Institution"
            onChange={validateAndChange}
            name="institution"
            value={formData.institution || ""}
            className={`block w-full p-2 text-sm text-gray-900 border ${
              errors.institution ? "border-[#E54545]" : "border-gray-300"
            } rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]`}
          />
          {errors.institution && (
            <p className="text-[#E54545] text-xs mt-1">{errors.institution}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-1">
          Qualification <span className="text-[#E54545]">*</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter qualification"
            onChange={validateAndChange}
            name="qualification"
            value={formData.qualification || ""}
            className={`block w-full p-2 text-sm text-gray-900 border ${
              errors.qualification ? "border-[#E54545]" : "border-gray-300"
            } rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]`}
          />
          {errors.qualification && (
            <p className="text-[#E54545] text-xs mt-1">{errors.qualification}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-1">
          Year of Passing-Out <span className="text-[#E54545]">*</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter year of passing-out"
            onChange={validateAndChange}
            name="year_of_passing_out"
            value={formData.year_of_passing_out || ""}
            className={`block w-full p-2 text-sm text-gray-900 border ${
              errors.year_of_passing_out ? "border-[#E54545]" : "border-gray-300"
            } rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]`}
          />
          {errors.year_of_passing_out && (
            <p className="text-[#E54545] text-xs mt-1">{errors.year_of_passing_out}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-1">
          Start-ups Associated <span className="text-[#E54545]">*</span>
        </div>
        <div>
          <select
            name="startup_associated"
            value={formData.startup_associated || ""}
            onChange={validateAndChange}
            className={`block w-full p-2 text-sm text-gray-900 border ${
              errors.startup_associated ? "border-[#E54545]" : "border-gray-300"
            } rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]`}
          >
            <option value="">Select startup association</option>
            {startupOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.startup_associated && (
            <p className="text-[#E54545] text-xs mt-1">{errors.startup_associated}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2;
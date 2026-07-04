import React, { useState } from "react";

const Step3 = ({ formData, handleChange }) => {
  const [contactError, setContactError] = useState("");

  const handleContactChange = (e) => {
    const value = e.target.value;
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length <= 10) {
      const syntheticEvent = {
        target: { name: "contact_number", value: digitsOnly },
      };
      handleChange(syntheticEvent);

      if (digitsOnly.length > 0 && digitsOnly.length < 10) {
        setContactError("Please enter a valid 10-digit phone number");
      } else {
        setContactError("");
      }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-5 items-start">
      <div className="mt-1 mb-4">
        <div className="mb-1">
          Contact Number <span className="text-[#E54545]">*</span>
        </div>
        <input
          type="text"
          placeholder="Enter 10-digit contact number"
          onChange={handleContactChange}
          name="contact_number"
          value={formData.contact_number || ""}
          maxLength="10"
          className={`block w-full p-2 text-sm text-gray-900 border ${contactError ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]`}
        />
        {contactError && (
          <div className="text-red-500 text-xs mt-1">{contactError}</div>
        )}
      </div>

      <div className="mt-1 mb-4">
        <div className="mb-1">
          Email Address <span className="text-[#E54545]">*</span>
        </div>
        <input
          type="email"
          placeholder="Enter email address"
          onChange={handleChange}
          name="email_address"
          value={formData.email_address || ""}
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
        />
      </div>

      <div className="mt-1 mb-4">
        <div className="mb-1">
          LinkedIn ID <span className="text-[#E54545]">*</span>
        </div>
        <input
          type="text"
          placeholder="https://linkedin.com/in/profile"
          onChange={handleChange}
          name="linkedIn_ID"
          value={formData.linkedIn_ID || ""}
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
        />
      </div>
    </div>
  );
};

export default Step3;

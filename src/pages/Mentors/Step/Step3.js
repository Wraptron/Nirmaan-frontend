import React, { useState } from "react";

const Step3 = ({ formData, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="grid grid-cols-2 gap-5 items-start">
      <div className="mt-1 mb-4">
        <div className="mb-1">
          Contact Number <span className="text-[#E54545]">*</span>
        </div>
        <input
          type="text"
          placeholder="Enter contact number"
          onChange={handleChange}
          name="contact_number"
          value={formData.contact_number || ""}
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
        />
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

      <div className="mt-1 mb-4">
        <div className="mb-1">
          Password <span className="text-[#E54545]">*</span>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            onChange={handleChange}
            name="password"
            value={formData.password || ""}
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;

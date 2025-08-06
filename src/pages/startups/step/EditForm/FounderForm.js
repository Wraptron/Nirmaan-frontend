import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ApiUpdateStartupFounder } from "../../../../API/API";

const FounderForm = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    founder_name: "",
    founder_email: "",
    founder_number: "",
    founder_gender: "",
    email_address: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("FounderForm initialData:", initialData);
    if (initialData) {
      // If we're adding a new founder, initialData might only have email_address
      if (initialData.email_address && !initialData.founder_name) {
        // This is a new founder - only set the email_address
        setFormData({
          founder_name: "",
          founder_email: "",
          founder_number: "",
          founder_gender: "",
          email_address: initialData.email_address,
        });
      } else {
        // This is editing an existing founder
        setFormData({
          founder_name: initialData.founder_name || "",
          founder_email: initialData.founder_email || "",
          founder_number: initialData.founder_number || "",
          founder_gender: initialData.founder_gender || "",
          email_address:
            initialData.email_address ||
            initialData.official_email_address ||
            "",
        });
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.founder_name.trim()) {
      newErrors.founder_name = "Founder name is required";
    }

    if (!formData.founder_email.trim()) {
      newErrors.founder_email = "Founder email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.founder_email)) {
      newErrors.founder_email = "Please enter a valid email address";
    }

    if (!formData.founder_number.trim()) {
      newErrors.founder_number = "Phone number is required";
    }

    if (!formData.founder_gender) {
      newErrors.founder_gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    console.log("Submitting founder data:", formData);

    try {
      // Create FormData instead of sending JSON
      const formPayload = new FormData();

      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formPayload.append(key, value);
        }
      });

      // Get the startup email address - try multiple sources
      let startupEmail =
        formData.email_address ||
        initialData?.email_address ||
        initialData?.official_email_address;

      // If we still don't have the startup email, get it from the URL
      if (!startupEmail) {
        // Extract email from URL path (e.g., /startups/startupprofile/email@example.com)
        const pathParts = window.location.pathname.split("/");
        startupEmail = pathParts[pathParts.length - 1];

        // Validate that it looks like an email
        if (!startupEmail || !startupEmail.includes("@")) {
          toast.error(
            "Could not identify startup. Please refresh the page and try again."
          );
          return;
        }
      }

      // Always add the startup email address
      if (!formPayload.has("email_address")) {
        formPayload.append("email_address", startupEmail);
      }

      console.log("FormData entries:");
      for (let [key, value] of formPayload.entries()) {
        // console.log(${key}: ${value});
      }

      console.log("Startup email being sent:", startupEmail);

      await ApiUpdateStartupFounder(formPayload);
      toast.success("Founder saved successfully");
      onSubmit();
      onClose();
    } catch (error) {
      console.error("Error saving founder:", error);
      toast.error("Failed to save founder");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[600px] max-h-[90vh] overflow-y-auto relative">
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
            {initialData ? "Edit Founder" : "Add Founder"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="founder_name"
                  value={formData.founder_name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className={`w-full h-10 px-3 text-sm border rounded-lg focus:ring-1 focus:ring-green-500 ${
                    errors.founder_name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.founder_name && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.founder_name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="founder_gender"
                  value={formData.founder_gender}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 text-sm border rounded-lg focus:ring-1 focus:ring-green-500 ${
                    errors.founder_gender ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.founder_gender && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.founder_gender}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Email Id <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="founder_email"
                  value={formData.founder_email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className={`w-full h-10 px-3 text-sm border rounded-lg focus:ring-1 focus:ring-green-500 ${
                    errors.founder_email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.founder_email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.founder_email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="founder_number"
                  value={formData.founder_number}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className={`w-full h-10 px-3 text-sm border rounded-lg focus:ring-1 focus:ring-green-500 ${
                    errors.founder_number ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.founder_number && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.founder_number}
                  </div>
                )}
              </div>
            </div>

            {/* <div>
              <label className="block text-sm mb-1.5 font-medium">
                Academic Background <span className="text-red-500">*</span>
              </label>
              <textarea
                name="academic_background"
                value={formData.academic_background}
                onChange={handleChange}
                placeholder="Enter Academic Background"
                rows="3"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-green-500 ${
                  errors.academic_background ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.academic_background && <div className="text-red-500 text-xs mt-1">{errors.academic_background}</div>}
            </div> */}

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-10 py-2 text-base font-semibold text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors"
              >
                {initialData ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FounderForm;

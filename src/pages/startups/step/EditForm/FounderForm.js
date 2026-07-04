import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ApiAddFounder} from "../../../../API/API";

const FounderForm = ({ startup_id, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    founder_name: "",
    founder_email: "",
    founder_number: "",
    founder_designation: "",
    startup_id: "",
  });

  const [errors, setErrors] = useState({});
 useEffect(() => {
  if (startup_id && formData.startup_id !== startup_id) {
    setFormData((prev) => ({
      ...prev,
      startup_id: startup_id,
    }));
  }
}, [startup_id]);



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

   // name
   if (!formData.founder_name.trim()) {
     newErrors.founder_name = "Founder name is required";
   }

   // email
   const allowedDomains = [
     "gmail.com",
     "outlook.com",
     "yahoo.com",
     "smail.iitm.ac.in",
   ];

   const emailParts = formData.founder_email.trim().split("@");
   const domain = emailParts[1] || "";

   if (!formData.founder_email.trim()) {
     newErrors.founder_email = "Founder email is required";
   } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(formData.founder_email)) {
     newErrors.founder_email = "Please enter a valid email address";
   } else if (!allowedDomains.includes(domain)) {
     newErrors.founder_email =
       "Please use a valid email domain (e.g., gmail.com, outlook.com, yahoo.com, smail.iitm.ac.in)";
   }

   // phone
  if (!formData.founder_number.trim()) {
    newErrors.founder_number = "Phone number is required";
  } else if (!/^\d+$/.test(formData.founder_number)) {
    newErrors.founder_number = "Phone number must contain only digits";
  } else if (formData.founder_number.length !== 10) {
    newErrors.founder_number = "Phone number must be 10 digits";
  }

   // designation
   if (!formData.founder_designation.trim()) {
     newErrors.founder_designation = "Designation is required";
   }

   setErrors(newErrors); 
   return newErrors; 
 };


  const handleSubmit = async (e) => {
    e.preventDefault();
      formData.founder_email = formData.founder_email.trim().toLowerCase();
const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
     const firstError = Object.values(validationErrors)[0];
     toast.error(firstError);
     return;
   }
     const formPayload = {
      ...formData,
    };

    try {
    
      await ApiAddFounder(formPayload)
      toast.success("Founder saved successfully");
      onClose();
    } catch (error) {
      // console.error("Error saving founder:", error);
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
            Add Founder
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
                 Designation <span className="text-red-500">*</span>
                </label>
                <select
                  name="founder_designation"
                  value={formData.founder_designation}
                  onChange={handleChange}
                  className={`w-full h-10 px-3 text-sm border rounded-lg focus:ring-1 focus:ring-green-500 ${
                    errors.founder_gender ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="" disabled>Select Designation</option>
                  <option value="Founder">Founder</option>
                  <option value="Co Founder">Co Founder</option>
                  {/* <option value="Other">Other</option> */}
                </select>
                {errors.founder_designation && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.founder_designation}
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
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FounderForm;
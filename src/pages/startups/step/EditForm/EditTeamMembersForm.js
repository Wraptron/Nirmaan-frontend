import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ApiUpdateStartupFounder } from "../../../../API/API";

const EditTeamMembersForm = ({ initialData, onClose, onSubmit }) => {
 const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    founder_name: "",
    founder_email: "",
    founder_number: "",
    founder_designation:"",
  });
  useEffect(() => {
    if (initialData) {
      console.log("imitial:",initialData)
      setFormData({
        founder_name: initialData.founder_name || "",
        founder_email: initialData.founder_email || "",
        founder_number: initialData.founder_number || "",
        founder_designation:initialData.founder_designation|| "",
        founder_id:initialData.founder_id|| ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.founder_name.trim()) {
      newErrors.founder_name = "Founder name is required";
    }

const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com","iitm.in.co"];

const emailParts = formData.founder_email.trim().split("@");
const domain = emailParts[1];

if (!formData.founder_email.trim()) {
  newErrors.founder_email = "Founder email is required";
} else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(formData.founder_email)) {
  newErrors.founder_email = "Please enter a valid email address";
} else if (!allowedDomains.includes(domain)) {
  newErrors.founder_email = `Please use a valid email domain (e.g., gmail.com, outlook.com)`;
}


    if (!formData.founder_number.trim()) {
      newErrors.founder_number = "Phone number is required";
    }

    if (!formData.founder_designation) {
      newErrors.founder_designation = "Designation is required";
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

    console.log("Submitting data:", formData);

    try {
      await ApiUpdateStartupFounder(formData);
      toast.success("Profile updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[430px] relative">
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
            Edit Founder
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
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Designation <span className="text-red-500">*</span>
                </label>
                <select
                  name="founder_designation"
                  value={formData.founder_designation}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                >
                  <option value="" disabled>
                    Select Designation
                  </option>
                  <option value="Founder">Founder</option>
                  <option value="Co-Founder">Co-Founder</option>
                </select>
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
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
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
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              {/* <div>
                <label className="block text-sm mb-1.5 font-medium">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 | XXXXX XXXXX"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div> */}
            </div>
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="px-10 py-2 text-base font-semibold text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors"
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

export default EditTeamMembersForm;
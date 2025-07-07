import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import { ApiUpdateStartupPersonalInfo } from "../../../../API/API";

const EditStartupForm = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    startup_name: "",
    status: "Active",
    email_address: "",
    contact_number: "",
    linkedin: "",
    website: "",
    profile_image: null,
    background_image: null,
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [bgPreview, setBgPreview] = useState(null);
  const profileInputRef = useRef();
  const bgInputRef = useRef();

  useEffect(() => {
    if (initialData) {
      setFormData({
        startup_name: initialData.startup_name || "",
        status: "Active",
        email_address: initialData.email_address || "",
        contact_number: initialData.contact_number || "",
        linkedin: initialData.linkedin || "",
        website: initialData.website || "",
        profile_image: initialData.profile_image || null,
        background_image: initialData.background_image || null,
      });

      setProfilePreview(initialData.profile_image || null);
      setBgPreview(initialData.background_image || null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profile_image: file }));
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleBgImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, background_image: file }));
      setBgPreview(URL.createObjectURL(file));
    }
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone) =>
    /^[6-9]\d{9}$/.test(phone);

  const isValidLinkedIn = (url) =>
    url === "" || /^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(url);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.startup_name.trim()) {
      toast.error("Startup name is required");
      return;
    }

    if (!formData.email_address.trim() || !isValidEmail(formData.email_address)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!formData.contact_number.trim() || !isValidPhone(formData.contact_number)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    if (!isValidLinkedIn(formData.linkedin)) {
      toast.error("Please enter a valid LinkedIn URL");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("startup_name", formData.startup_name);
    formPayload.append("email_address", formData.email_address);
    formPayload.append("contact_number", formData.contact_number);
    formPayload.append("linkedin", formData.linkedin);
    formPayload.append("website", formData.website);
    if (formData.profile_image) {
      formPayload.append("profile_image", formData.profile_image);
    }
    if (formData.background_image) {
      formPayload.append("background_image", formData.background_image);
    }

    try {
      await ApiUpdateStartupPersonalInfo(formPayload);
      toast.success("Profile updated successfully");
      // onClose will trigger parent FetchData to refresh images
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="p-6 pt-4">
          <h2 className="text-xl font-semibold text-[#232323] mb-4">Edit Personal Info</h2>
          <div className="relative w-full h-32 rounded-xl mb-10 bg-gray-100">
            <img
              src={bgPreview}
              alt="Background"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute left-1/2 -bottom-12 -translate-x-1/2 z-30 flex flex-col items-center w-24">
              <div className="relative w-24 h-24">
                <img
                  src={profilePreview}
                  alt="Profile"
                  className="w-24 h-24 rounded-xl border-4 border-white shadow-lg object-cover bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => profileInputRef.current && profileInputRef.current.click()}
                  className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 border border-gray-300 z-40"
                  title="Edit Profile Photo"
                >
                  <FiEdit2 size={16} className="text-[#232323]" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={profileInputRef}
                  className="hidden"
                  onChange={handleProfileImage}
                />
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-14 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Name Of The Start-up <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="startup_name"
                  value={formData.startup_name}
                  onChange={handleChange}
                  placeholder="Enter name of the start-up"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Email ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email_address"
                  value={formData.email_address}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  placeholder="+91 | XXXXX XXXXX"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Website Link <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">LinkedIn ID <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
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

export default EditStartupForm;

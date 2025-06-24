import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Graduated", label: "Graduated" },
  // Add more as needed
];

const EditStartupForm = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    startup_name: initialData?.startup_name || "",
    status: initialData?.status || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    linkedin: initialData?.linkedin || "",
    website: initialData?.website || "",
    profile_image: initialData?.profile_image || null,
    background_image: initialData?.background_image || null,
    startup_type: initialData?.startup_type || "",
    sector: initialData?.sector || "",
    program: initialData?.program || "",
    mentor: initialData?.mentor || "",
    role_of_faculty: initialData?.role_of_faculty || "",
    cohort: initialData?.cohort || "",
    cin_number: initialData?.cin_number || "",
    industry: initialData?.industry || "",
    technology: initialData?.technology || "",
    year_of_graduation: initialData?.year_of_graduation || "",
    graduated_to: initialData?.graduated_to || "",
    dpiit_number: initialData?.dpiit_number || "",
    current_funding_state: initialData?.current_funding_state || "",
    officially_registered: initialData?.officially_registered || "",
    pia: initialData?.pia || "",
    about: initialData?.about || ""
  });
  const [profilePreview, setProfilePreview] = useState(formData.profile_image);
  const [bgPreview, setBgPreview] = useState(formData.background_image);
  const profileInputRef = useRef();
  const bgInputRef = useRef();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!formData.startup_name || !formData.status || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }
    await onSubmit(formData);
    onClose();
    toast.success("Profile updated successfully");
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
          {/* Banner image (not editable) */}
          <div className="relative w-full h-32 rounded-xl mb-10 bg-gray-100">
            <img
              src={bgPreview}
              alt="Background"
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Profile image (rounded rectangle, overlapping banner, editable) */}
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
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
          {/* Form fields */}
          <form onSubmit={handleSubmit} className="mt-14 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5 font-medium">Name Of The Start-up <span className="text-red-500">*</span></label>
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
                <label className="block text-sm mb-1.5 font-medium">Status <span className="text-red-500">*</span></label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 bg-white"
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Email Id <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Contact Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 | XXXXX XXXXX"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Website Link</label>
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
                <label className="block text-sm mb-1.5 font-medium">LinkedIn ID</label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder=""
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
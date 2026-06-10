import React, { useRef, useState } from "react";
import { ApiUpdateMentor } from "../../API/API";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { MENTOR_TAG_OPTIONS } from "../../utils/mentorTagUtils";
import bgImg from "../../assets/images/Rectangle 5.svg";
import { FiEdit2 } from "react-icons/fi";

const EditMentorForm = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    mentor_id: initialData.mentor_id || "",
    mentor_name: initialData.mentor_name || "",
    mentor_logo: initialData.mentor_logo || "No Profile",
    designation: initialData.designation || "",
    mentor_description: initialData.mento_description || "",
    email_address: initialData.email_address || "",
    contact_num: initialData.contact_num || "",
    qualification: initialData.qualification || "",
    institution: initialData.institution || "",
    year_of_passing_out: initialData.year_of_passing_out || "",
    expertise: initialData.area_of_expertise || "",
    linkedin_id: initialData.linkedin_id || "",
    tag: initialData.tag || "",
    representing_from: initialData.representing_from || "",
  });
  // console.log(initialData);
   const [preview, setPreview] = useState(
     typeof initialData.mentor_logo === "string"
       ? initialData.mentor_logo
       : null
   );
   const profileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    const handleProfileImage = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setFormData((prev) => ({
        ...prev,
        mentor_logo: file,
      }));
      setPreview(URL.createObjectURL(file));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log the complete form data
      // console.log(
      //   "Form Data being submitted:",
      //   JSON.stringify(formData, null, 2)
      // );
      // console.log("Mentor ID:", initialData.mentor_id);

      // Validate required fields
      const requiredFields = ["mentor_name", "email_address"];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        toast.error(`Missing required fields: ${missingFields.join(", ")}`);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email_address)) {
        toast.error("Please enter a valid email address");
        return;
      }

      // Validate phone number if provided
      if (formData.contact_num && !/^\d{10}$/.test(formData.contact_num)) {
        toast.error("Please enter a valid 10-digit phone number");
        return;
      }

      const response = await ApiUpdateMentor(formData);
      // console.log("Update response:", response);

      toast.success("Mentor profile updated successfully");
      onSubmit(formData);
      onClose();
    } catch (error) {
      // console.error("Error updating mentor:", error?.response?.data?.Error);
      toast.error(getErrorMessage(error, "Failed to update mentor profile"));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-2 text-gray-500 hover:text-gray-700 text-3xl"
        >
          &times;
        </button>
        <div className="w-full h-40 rounded-xl  mb-20 relative overflow-visible">
          <img
            src={bgImg}
            alt="banner"
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Profile image */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <img
              src={preview || "/default-profile.png"}
              alt="profile"
              className="w-32 h-32 border-4 rounded-lg  object-cover"
            />
            <div>
              <button
                type="button"
                onClick={() =>
                  profileInputRef.current && profileInputRef.current.click()
                }
                className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 border border-gray-300 z-40"
                title="Edit Profile Photo"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
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
        <h2 className="text-xl font-semibold mb-6">Edit Mentor Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                name="mentor_name"
                value={formData.mentor_name}
                onChange={handleChange}
                placeholder="Mentor Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#45C74D] focus:border-[#45C74D]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation
              </label>
              <input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Designation"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#45C74D] focus:border-[#45C74D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email_address"
                value={formData.email_address}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#45C74D] focus:border-[#45C74D]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                name="contact_num"
                value={formData.contact_num}
                onChange={handleChange}
                placeholder="Contact Number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#45C74D] focus:border-[#45C74D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qualification
              </label>
              <input
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="Qualification"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#45C74D] focus:border-[#45C74D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution
              </label>
              <input
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="Institution"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#45C74D] focus:border-[#45C74D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year of Passing
              </label>
              <input
                type="number"
                name="year_of_passing_out"
                value={formData.year_of_passing_out}
                onChange={handleChange}
                placeholder="Year of Passing"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#45C74D] focus:border-[#45C74D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expertise
              </label>
              <input
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                placeholder="Area of Expertise"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#45C74D] focus:border-[#45C74D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn ID
              </label>
              <input
                name="linkedin_id"
                value={formData.linkedin_id}
                onChange={handleChange}
                placeholder="LinkedIn Profile ID"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#45C74D] focus:border-[#45C74D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag
              </label>
              <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#45C74D] focus:border-[#45C74D]"
              >
                <option value="">Select tag</option>
                {MENTOR_TAG_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Representing From
              </label>
              <input
                name="representing_from"
                value={formData.representing_from}
                onChange={handleChange}
                placeholder="Organization or fund name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#45C74D] focus:border-[#45C74D]"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              About
            </label>
            <textarea
              name="mentor_description"
              value={formData.mentor_description}
              onChange={handleChange}
              placeholder="About the mentor"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#45C74D] focus:border-[#45C74D]"
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#45C74D] text-white rounded-lg "
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMentorForm;

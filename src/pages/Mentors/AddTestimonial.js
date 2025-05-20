import React, { useState } from "react";
import { ApiTestimonials } from "../../API/API";
import { useNavigate } from "react-router-dom";

const AddTestimonial = ({ onClose, mentorRefId, onTestimonialAdded }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      mentor_ref_id: mentorRefId,
      ...formData,
    };
    try {
      await ApiTestimonials(payload);
      console.log("posted");
      console.log(payload);
      onClose(); // Close modal after save
      // Refresh testimonials before navigation
      await onTestimonialAdded();
      // Navigate back to mentor profile after successful submission
      navigate(`/mentor/mentor_profile/${mentorRefId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-4">Testimonial</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter Role"
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Type here.."
              className="w-full border rounded-md px-3 py-2 h-28 resize-none"
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTestimonial;

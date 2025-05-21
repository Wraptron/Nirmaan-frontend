import React, { useState } from "react";
import { ApiUpdateMentor } from "../../API/API";
import toast from "react-hot-toast";

const EditMentorForm = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    mentor_name: initialData.mentor_name || "",
    designation: initialData.designation || "",
    about: initialData.about || "",
    email_address: initialData.email_address || "",
    contact_num: initialData.contact_num || "",
    qualification: initialData.qualification || "",
    institution: initialData.institution || "",
    year_of_passing_out: initialData.year_of_passing_out || "",
    expertise: initialData.expertise || "",
    linkedin_id: initialData.linkedin_id || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log the complete form data
      console.log('Form Data being submitted:', JSON.stringify(formData, null, 2));
      console.log('Mentor ID:', initialData.mentor_id);
      
      // Validate required fields
      const requiredFields = ['mentor_name', 'email_address'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        toast.error(`Missing required fields: ${missingFields.join(', ')}`);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email_address)) {
        toast.error('Please enter a valid email address');
        return;
      }

      // Validate phone number if provided
      if (formData.contact_num && !/^\d{10}$/.test(formData.contact_num)) {
        toast.error('Please enter a valid 10-digit phone number');
        return;
      }

      const response = await ApiUpdateMentor(initialData.mentor_id, formData);
      console.log('Update response:', response);
      
      toast.success("Mentor profile updated successfully");
      onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error updating mentor:", error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        toast.error(`Failed to update mentor profile: ${error.response.data?.error || error.response.data?.message || 'Server error'}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        toast.error('No response received from server');
      } else {
        console.error('Error message:', error.message);
        toast.error('Failed to update mentor profile');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-6">Edit Mentor Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                name="mentor_name"
                value={formData.mentor_name}
                onChange={handleChange}
                placeholder="Mentor Name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Designation"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email_address"
                value={formData.email_address}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input
                name="contact_num"
                value={formData.contact_num}
                onChange={handleChange}
                placeholder="Contact Number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
              <input
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="Qualification"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="Institution"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year of Passing</label>
              <input
                type="number"
                name="year_of_passing_out"
                value={formData.year_of_passing_out}
                onChange={handleChange}
                placeholder="Year of Passing"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
              <input
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                placeholder="Area of Expertise"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn ID</label>
              <input
                name="linkedin_id"
                value={formData.linkedin_id}
                onChange={handleChange}
                placeholder="LinkedIn Profile ID"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="About the mentor"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMentorForm;

import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";

const EditMentorForm = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    mentors: initialData?.mentors || "",
    role_of_faculty: initialData?.role_of_faculty || "",
    cin_number: initialData?.cin_number || "",
    year_of_graduation: initialData?.year_of_graduation || "",
    current_funding_state: initialData?.current_funding_state || "",
    industry: initialData?.industry || "",
    graduated_to: initialData?.graduated_to || "",
    officially_registered: initialData?.officially_registered || "",
    cohort: initialData?.cohort || "",
    technology: initialData?.technology || "",
    dpiit_number: initialData?.dpiit_number || "",
    pia: initialData?.pia || ""
  });

  const [showMentorForm, setShowMentorForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
    toast.success("Mentor details updated successfully");
  };

  const handleMentorEditClick = () => setShowMentorForm(true);
  const handleMentorEditClose = () => setShowMentorForm(false);

  const handleMentorEditSubmit = async (updatedData) => {
    setFormData(prev => ({
      ...prev,
      ...updatedData
    }));
    setShowMentorForm(false);
    toast.success("Mentor details updated successfully");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[700px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-[#232323] mb-6">Edit Mentor & Details</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-2xl">Details</span>
            
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-1 mb-1 font-semibold">
                  Mentors
                  <span className="material-icons text-xs text-[#A1A1A1]">expand_more</span>
                  {/* <button */}
                    {/* className="ml-2 p-1 hover:bg-gray-100 rounded"
                    // onClick={handleMentorEditClick}
                    title="Edit Mentor Details"
                  > */}
                    {/* <FiEdit2 size={16} className="text-white" /> */}
                  {/* </button> */}
                </div>
                <input
                  type="text"
                  name="mentors"
                  value={formData.mentors}
                  onChange={handleChange}
                  placeholder="Enter Mentors"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Role of Faculty</label>
                <input
                  type="text"
                  name="role_of_faculty"
                  value={formData.role_of_faculty}
                  onChange={handleChange}
                  placeholder="Enter Role of Faculty"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">CIN/Registration Number</label>
                <input
                  type="text"
                  name="cin_number"
                  value={formData.cin_number}
                  onChange={handleChange}
                  placeholder="Enter CIN/Registration Number"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Year of Graduation</label>
                <input
                  type="text"
                  name="year_of_graduation"
                  value={formData.year_of_graduation}
                  onChange={handleChange}
                  placeholder="Enter Year of Graduation"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Current Funding State</label>
                <input
                  type="text"
                  name="current_funding_state"
                  value={formData.current_funding_state}
                  onChange={handleChange}
                  placeholder="Enter Current Funding State"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="Enter Industry"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Graduated To</label>
                <input
                  type="text"
                  name="graduated_to" 
                  value={formData.graduated_to}
                  onChange={handleChange}
                  placeholder="Enter Graduated To"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Officially Registered as</label>
                <input
                  type="text"
                  name="officially_registered"
                  value={formData.officially_registered}
                  onChange={handleChange}
                  placeholder="Enter Officially Registered as"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Cohort (Name & Year)</label>
                <input
                  type="text"
                  name="cohort"
                  value={formData.cohort}
                  onChange={handleChange}
                  placeholder="Enter Cohort"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Technology</label>
                <input
                  type="text"
                  name="technology"
                  value={formData.technology}
                  onChange={handleChange}
                  placeholder="Enter Technology"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">DPIIT Number</label>
                <input
                  type="text"
                  name="dpiit_number"
                  value={formData.dpiit_number}
                  onChange={handleChange}
                  placeholder="Enter DPIIT Number"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">PIA</label>
                <input
                  type="text"
                  name="pia"
                  value={formData.pia}
                  onChange={handleChange}
                  placeholder="Enter PIA"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      {showMentorForm && (
        <EditMentorForm
          initialData={initialData}
          onClose={handleMentorEditClose}
          onSubmit={handleMentorEditSubmit}
        />
      )}
    </div>
  );
};

export default EditMentorForm;
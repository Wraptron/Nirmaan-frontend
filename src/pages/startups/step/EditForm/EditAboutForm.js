import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EditAboutForm = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));
    }
  }, [initialData]);

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
      await onSubmit(formData);
      onClose();
      toast.success("About section updated successfully");
    } catch (error) {
      console.error("Error updating about section:", error);
      toast.error("Failed to update about section");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[700px] relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-[#232323] mb-6">Edit About Us</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1.5">Startup Type</label>
                <input
                  type="text"
                  name="startup_type"
                  value={formData.startup_type}
                  onChange={handleChange}
                  placeholder="Enter startup type"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">Sector</label>
                <input
                  type="text"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  placeholder="Enter sector"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">Program</label>
                <input
                  type="text"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  placeholder="Enter program"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1.5">Mentor</label>
                <input
                  type="text"
                  name="mentor"
                  value={formData.mentor}
                  onChange={handleChange}
                  placeholder="Enter mentor"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">Role of Faculty</label>
                <input
                  type="text"
                  name="role_of_faculty"
                  value={formData.role_of_faculty}
                  onChange={handleChange}
                  placeholder="Enter role of faculty"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">Cohort</label>
                <input
                  type="text"
                  name="cohort"
                  value={formData.cohort}
                  onChange={handleChange}
                  placeholder="Enter cohort"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1.5">CIN/Registration Number</label>
                <input
                  type="text"
                  name="cin_number"
                  value={formData.cin_number}
                  onChange={handleChange}
                  placeholder="Enter CIN/Registration number"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="Enter industry"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">Technology</label>
                <input
                  type="text"
                  name="technology"
                  value={formData.technology}
                  onChange={handleChange}
                  placeholder="Enter technology"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1.5">Year of Graduation</label>
                <input
                  type="text"
                  name="year_of_graduation"
                  value={formData.year_of_graduation}
                  onChange={handleChange}
                  placeholder="Enter graduation year"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">Graduated To</label>
                <input
                  type="text"
                  name="graduated_to"
                  value={formData.graduated_to}
                  onChange={handleChange}
                  placeholder="Enter graduated to"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">DPIIT Number</label>
                <input
                  type="text"
                  name="dpiit_number"
                  value={formData.dpiit_number}
                  onChange={handleChange}
                  placeholder="Enter DPIIT number"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1.5">Current Funding State</label>
                <input
                  type="text"
                  name="current_funding_state"
                  value={formData.current_funding_state}
                  onChange={handleChange}
                  placeholder="Enter funding state"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">Officially Registered as</label>
                <input
                  type="text"
                  name="officially_registered"
                  value={formData.officially_registered}
                  onChange={handleChange}
                  placeholder="Enter registration type"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">PIA</label>
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

            <div>
              <label className="block text-sm mb-1.5">About Us</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows="4"
                placeholder="Type here..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 resize-none"
              />
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
    </div>
  );
};

export default EditAboutForm;
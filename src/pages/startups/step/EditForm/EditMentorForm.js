import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ApiUpdateStartupMentorDetails } from "../../../../API/API";

// Dropdown Options
const technologyOptions = [
  "3D Printing & Fabrication",
  "App Development",
  "Artificial Intelligence (AI) & Machine Learning (ML)",
  "Augmented Reality (AR) & Virtual Reality (VR)",
  "BioMimicry Applications",
  "Blockchain",
  "Deep Technology (Anything with a deep technical expertise)",
  "Internet of Things (IoT)",
  "Other",
];

const academicOptions = [
  "Bsc Datascience",
  "B.Tech",
  "M.Tech",
  "Msc",
  "MBA",
  "Msc in Research",
  "External",
];

const modeOfEntryOptions = [
  "CFI",
  "E-cell",
  "CZC",
  "PALS",
  "IZI",
  "Direct entry",
  "Non-iit",
];

const EditMentorForm = ({ initialData, onClose }) => {
  const [formData, setFormData] = useState({
    mentors: "",
    role_of_faculty: "",
    cin_registration_number: "",
    year_of_graduation: "",
    funding_stage: "",
    startup_community: "",
    graduated_to: "",
    officially_registered: "",
    cohort: "",
    technology: "",
    dpiit_number: "",
    pia: "",
    academic_background: "",
    email_address: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        mentors: initialData.mentor_associated || "",
        role_of_faculty: initialData.role_of_faculty || "",
        cin_registration_number: initialData.cin_registration_number || "",
        year_of_graduation: initialData.startup_yog || "",
        funding_stage: initialData.funding_stage || "",
        startup_community: initialData.startup_community || "",
        graduated_to: initialData.graduated_to || "",
        officially_registered: initialData.register || "",
        cohort: initialData.startup_cohort || "",
        technology: initialData.startup_technology || "",
        dpiit_number: initialData.dpiit || "",
        pia: initialData.pia_state || "",
        academic_background: initialData.academic_background || "",
        email_address: initialData.email_address || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiUpdateStartupMentorDetails(formData);
      toast.success("Profile updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
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
            Edit Mentor & Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1.5 font-medium">Mentors</label>
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
                <select
                  name="role_of_faculty"
                  value={formData.role_of_faculty}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                >
                  <option value="">Select Role</option>
                  <option value="Advisor/ Mentor">Advisor/ Mentor</option>
                  <option value="Co-Founder">Co-Founder</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1.5 font-medium">CIN/Registration Number</label>
                <input
                  type="text"
                  name="cin_registration_number"
                  value={formData.cin_registration_number}
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
                <label className="block text-sm mb-1.5 font-medium">Current Funding Stage</label>
                <select
                  name="funding_stage"
                  value={formData.funding_stage}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                >
                  <option value="">Select Funding Stage</option>
                  <option value="Pre-Seed">Pre-Seed</option>
                  <option value="Seed">Seed</option>
                  <option value="Pre-Series A">Pre-Series A</option>
                  <option value="Series A">Series A</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1.5 font-medium">Mode of Entry</label>
                <select
                  name="startup_community"
                  value={formData.startup_community}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                >
                  <option value="" disabled>Select Mode of entry to nirmaan</option>
                  {modeOfEntryOptions.map((entry) => (
                    <option key={entry} value={entry}>
                      {entry}
                    </option>
                  ))}
                </select>
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
  <select
    name="officially_registered"
    value={formData.officially_registered}
    onChange={handleChange}
    className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
  >
    <option value="">Select an option</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>

              <div>
                <label className="block text-sm mb-1.5 font-medium">Cohort (Name & Year)</label>
                <select
                  name="cohort"
                  value={formData.cohort}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                >
                  <option value="">Select Cohort</option>
                  {[
                    "2017-18", "2018-19", "January 2019", "July 2019",
                    "January 2020", "August 2020", "January 2021", "July 2021",
                    "January 2022", "August 2022", "January 2023", "August 2023",
                    "November-24", "April-2025"
                  ].map(cohort => (
                    <option key={cohort} value={cohort}>{cohort}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1.5 font-medium">Technology</label>
                <select
                  name="technology"
                  value={formData.technology}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                >
                  <option value="">Select Technology</option>
                  {technologyOptions.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
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
                <select
                  name="pia"
                  value={formData.pia}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                >
                  <option value="">Select PIA Status</option>
                  <option value="Signed">Signed</option>
                  <option value="Not Signed">Not Signed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1.5 font-medium">Academic Background</label>
                <select
                  name="academic_background"
                  value={formData.academic_background}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                >
                  <option value="">Choose an Academic</option>
                  {academicOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
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
    </div>
  );
};

export default EditMentorForm;


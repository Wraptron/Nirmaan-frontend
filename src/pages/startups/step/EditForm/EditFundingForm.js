import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { IoCalendarOutline } from "react-icons/io5";

const fundingTypes = [
  { value: "Grant", label: "Grant" },
  { value: "Equity", label: "Equity" },
  { value: "Debt", label: "Debt" },
  // Add more as needed
];

const EditFundingForm = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    startup: initialData?.startup || "",
    funding_type: initialData?.funding_type || "",
    amount: initialData?.amount || "",
    purpose: initialData?.purpose || "",
    description: initialData?.description || "",
    funding_date: initialData?.funding_date || "",
    reference_number: initialData?.reference_number || "",
    document: initialData?.document || null,
  });
  const [docName, setDocName] = useState("");
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, document: file }));
      setDocName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!formData.startup || !formData.funding_type || !formData.amount || !formData.purpose || !formData.funding_date || !formData.reference_number) {
      toast.error("Please fill all required fields");
      return;
    }
    await onSubmit(formData);
    onClose();
    toast.success("Funding saved successfully");
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
        <div className="p-6">
          <h2 className="text-xl font-semibold text-[#232323] mb-6">Create Funding</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Two-column grid for top fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5 font-medium">Start-ups <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="startup"
                  value={formData.startup}
                  onChange={handleChange}
                  placeholder="Select Start-ups"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Funding Type <span className="text-red-500">*</span></label>
                <select
                  name="funding_type"
                  value={formData.funding_type}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 bg-white"
                >
                  <option value="">Select Funding Type</option>
                  {fundingTypes.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Amount <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter Amount"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">Purpose <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  placeholder="Enter Purpose"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>
            {/* Description */}
            <div>
              <label className="block text-sm mb-1.5 font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Type here.."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
              />
            </div>
            {/* Funding Date */}
            <div>
              <label className="block text-sm mb-1.5 font-medium">Funding Date <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  name="funding_date"
                  value={formData.funding_date}
                  onChange={handleChange}
                  placeholder="DD/MM/YYYY"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
                <IoCalendarOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            {/* Reference Number */}
            <div>
              <label className="block text-sm mb-1.5 font-medium">Reference Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="reference_number"
                value={formData.reference_number}
                onChange={handleChange}
                placeholder="Enter Reference Number"
                className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
              />
            </div>
            {/* Upload document */}
            <div>
              <label className="block text-sm mb-1.5 font-medium">Upload document (If any)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={docName}
                  readOnly
                  placeholder=""
                  className="flex-1 h-10 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  className="h-10 px-6 text-sm font-semibold flex items-center gap-2 text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors"
                >
                  Upload
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            {/* Save button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="px-10 py-2 text-base font-semibold text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFundingForm;
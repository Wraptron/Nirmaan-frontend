import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { IoCalendarOutline } from "react-icons/io5";
import { ApiUpdateFunding } from "../../../../API/API";

const EditFundingForm = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    startup_name: "",
    funding_type: "",
    amount: "",
    status: "",
    purpose: "",
    funding_date: "",
    reference_number: "",
    document: null,
  });
  const [docName, setDocName] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    console.log("initial", initialData);
    if (initialData) {
      setFormData({
        startup_name: initialData.startup_name || "",
        funding_type: initialData.funding_type || "",
        amount: initialData.amount || "",
        status: initialData.status || "",
        purpose: initialData.purpose || "",
        funding_date: initialData.funding_date || "",
        reference_number: initialData.reference_number || "",
        document: initialData.document || "",
      });
    }
  }, [initialData]);

  console.log(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file
    if (file) {
      setFormData((prev) => ({
        ...prev,
        document: file,
      }));
      setDocName(file.name); // Optional: Store file name for display
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await ApiUpdateFunding({
        ...formData,
        id: initialData.id,
        startup_id: initialData.startup_id,
      });
      onSubmit({
        ...formData,
        id: initialData.id,
        startup_id: initialData.startup_id,
      });
      console.log("sumitted data:", {
        ...formData,
        id: initialData.id,
        startup_id: initialData.startup_id,
      });

      toast.success("Funding updated successfully");
      onClose();
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data?.error || "Failed to update funding";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
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
            Edit Funding
          </h2>
          <div className="bg-gray-50 rounded-lg">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Startup_name
                </label>
                <input
                  type="text"
                  name="startup_name"
                  value={formData.startup_name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  placeholder="Enter Starup_name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Type
                </label>
                <select
                  name="funding_type"
                  value={formData.funding_type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Funding Disbursed">Funding Disbursed</option>
                  <option value="Funding Utilized">Funding Utilized</option>
                  <option value="External Funding">External Funding</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Purpose
                </label>
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  placeholder="Enter purpose"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="funding_date"
                  value={formData.funding_date}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  required
                />
              </div>
              {formData.funding_type !== "Funding Disbursed" && (
                <div>
                  <label className="block text-sm font-medium text-[#232323] mb-1">
                    Ref No
                  </label>
                  <input
                    type="text"
                    name="reference_number"
                    value={formData.reference_number}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                    placeholder="Enter reference number"
                  />
                </div>
              )}

              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Document
                </label>
                <input
                  type="file"
                  name="document"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>

              <div className="col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="bg-[#45C74D] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#36a03d] transition"
                >
                  Edit
                </button>
                {/* <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFundingForm;

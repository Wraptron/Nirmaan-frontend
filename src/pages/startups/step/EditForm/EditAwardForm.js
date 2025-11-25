import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import { ApiAddAward, ApiUpdateAward } from "../../../../API/API";

const EditAwardForm = ({ initialData, onClose }) => {
  const [formData, setFormData] = useState({
    award_name: "",
    award_org: "",
    prize_money: "",
    awarded_date: "",
    document: null,
    description: "",
  });

  useEffect(() => {
    console.log(initialData);
    if (initialData) {
      setFormData({
        award_name: initialData.award_name || "",
        award_org: initialData.award_org || "",
        prize_money: initialData.prize_money || "",
        awarded_date: initialData.awarded_date
          ? new Date(initialData.awarded_date).toLocaleDateString("en-CA")
          : "",
        document: initialData.document || "",
        description: initialData.description || "",
        id: initialData.id || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDocumentUpload = (file) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        document: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await ApiUpdateAward(formData);
      toast.success("Award updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to Award profile");
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
            Edit Award/Recognition
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5">
                  Name Of The Award / Recognition
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="award_name"
                  value={formData.award_name}
                  onChange={handleChange}
                  placeholder="Enter Award/Recognition Name"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">
                  Award / Recognition Org<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="award_org"
                  value={formData.award_org}
                  onChange={handleChange}
                  placeholder="Enter Award/Recognition Org"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5">
                  Prize Money (If any)
                </label>
                <input
                  type="text"
                  name="prize_money"
                  value={formData.prize_money}
                  onChange={handleChange}
                  placeholder="Enter Prize Money"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5">
                  Awarded Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="awarded_date"
                  value={formData.awarded_date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1.5">
                Award / Recognition document (If any)
              </label>
              <div className="flex items-center gap-2">
                <label className="h-10 px-4 text-sm font-medium flex items-center gap-2 text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors cursor-pointer">
                  <FiUpload size={16} />
                  Upload
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleDocumentUpload(e.target.files[0])}
                  />
                </label>
                <span className="text-sm text-gray-500">
                  {formData.document
                    ? formData.document.name
                    : "No file chosen"}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1.5">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Type here..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAwardForm;

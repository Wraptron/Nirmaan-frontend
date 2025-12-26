import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ApiIPDetails } from "../../../../API/API";

const AddIPform = ({ initialData, onClose,startup_id }) => {
 const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    patent: "",
    design: "",
    trademark: "",
    copyright:"",
  });
  useEffect(() => {
    if (initialData) {
      setFormData({
        patent: initialData.patent|| 0,
        design: initialData.design || 0,
        trademark: initialData.trademark || 0,
        copyright:initialData.copyright|| 0,
        user_id:startup_id
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

 
 const handleSubmit = async (e) => {
   e.preventDefault();

   // console.log("Submitting data:", formData);

   try {
     await ApiIPDetails(formData);
     toast.success("IP Added successfully");
     onClose();
   } catch (error) {
     toast.error("Failed to Add IP");
   }
 };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[430px] relative">
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
            Add IP Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Patent <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="patent"
                  value={formData.patent}
                  onChange={handleChange}
                  placeholder="Enter patent details"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
             <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Design <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="design"
                  value={formData.design}
                  onChange={handleChange}
                  placeholder="Enter design details"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Trademark <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="trademark"
                  value={formData.trademark}
                  onChange={handleChange}
                  placeholder="Enter trademark details"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Copyright <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="copyright"
                  value={formData.copyright}
                  onChange={handleChange}
                  placeholder="Enter copyright details"
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

export default AddIPform;
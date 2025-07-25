// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { FiUpload } from "react-icons/fi";
// import { IoCalendarOutline } from "react-icons/io5";

// const AddAwardForm = ({ initialData, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: initialData?.name || "",
//     organization: initialData?.organization || "",
//     prize_money: initialData?.prize_money || "",
//     awarded_date: initialData?.awarded_date || "",
//     document: initialData?.document || null,
//     description: initialData?.description || ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleDocumentUpload = (file) => {
//     const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
//     if (file && !allowedTypes.includes(file.type)) {
//       toast.error("Only PDF, DOC or DOCX files are allowed");
//       return;
//     }
//     setFormData(prev => ({
//       ...prev,
//       document: file
//     }));
//   };

//   const validateDate = (date) => {
//     return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Required field checks
//     if (!formData.name.trim()) {
//       toast.error("Award/Recognition Name is required");
//       return;
//     }
//     if (!formData.organization.trim()) {
//       toast.error("Organization is required");
//       return;
//     }
//     if (!formData.awarded_date.trim()) {
//       toast.error("Awarded date is required");
//       return;
//     }
//     if (!validateDate(formData.awarded_date)) {
//       toast.error("Date format should be DD/MM/YYYY");
//       return;
//     }
//     if (formData.prize_money && isNaN(formData.prize_money)) {
//       toast.error("Prize Money must be a number");
//       return;
//     }

//     try {
//       await onSubmit(formData);
//       onClose();
//       toast.success("Award added successfully");
//     } catch (error) {
//       console.error("Error adding award:", error);
//       toast.error("Failed to add award");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl shadow-lg w-[700px] relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//             <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//           </svg>
//         </button>

//         <div className="p-6">
//           <h2 className="text-xl font-semibold text-[#232323] mb-6">Add New Award/Recognition</h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm mb-1.5">
//                   Name Of The Award / Recognition <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter Award/Recognition Name"
//                   className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm mb-1.5">
//                   Award / Recognition Org <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="organization"
//                   value={formData.organization}
//                   onChange={handleChange}
//                   placeholder="Enter Award/Recognition Org"
//                   className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm mb-1.5">Prize Money (If any)</label>
//                 <input
//                   type="text"
//                   name="prize_money"
//                   value={formData.prize_money}
//                   onChange={handleChange}
//                   placeholder="Enter Prize Money"
//                   className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm mb-1.5">
//                   Awarded Date <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     name="awarded_date"
//                     value={formData.awarded_date}
//                     onChange={handleChange}
//                     placeholder="DD/MM/YYYY"
//                     className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
//                   />
//                   <IoCalendarOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm mb-1.5">Award / Recognition document (If any)</label>
//               <div className="flex items-center gap-2">
//                 <label className="h-10 px-4 text-sm font-medium flex items-center gap-2 text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors cursor-pointer">
//                   <FiUpload size={16} />
//                   Upload
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept=".pdf,.doc,.docx"
//                     onChange={(e) => handleDocumentUpload(e.target.files[0])}
//                   />
//                 </label>
//                 <span className="text-sm text-gray-500">
//                   {formData.document ? formData.document.name : 'No file chosen'}
//                 </span>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm mb-1.5">Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="4"
//                 placeholder="Type here..."
//                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
//               />
//             </div>

//             <div className="flex justify-end gap-4 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-6 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-2 text-sm font-medium text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddAwardForm;

import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import { ApiAddAward } from "../../../../API/API";

const AddAwardForm = ({ officialEmail, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    prize_money: "",
    awarded_date: "",
    document: null,
    description: "",
  });

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

    if (!formData.name || !formData.organization || !formData.awarded_date) {
      toast.error("Please fill all required fields");
      return;
    }
    console.log("📧 officialEmail prop:", officialEmail);
    const formdata = new FormData();
    formdata.append("official_email_address", officialEmail);
    formdata.append("award_name", formData.name);
    formdata.append("award_org", formData.organization);
    formdata.append("prize_money", formData.prize_money);
    formdata.append("awarded_date", formData.awarded_date);
    formdata.append("description", formData.description);
    if (formData.document) {
      formdata.append("document", formData.document);
    }
    console.log("🟡 Submitting Award FormData:");

    try {
      const response = await ApiAddAward(formdata);
      console.log("✅ Response from API:", response);

      toast.success("Award added successfully");
      if (onSuccess) onSuccess(); // ✅ important line
      onClose();
    } catch (error) {
      console.error(
        "❌ Error adding award:",
        error?.response?.data || error.message || error
      );
      toast.error("Failed to add award");
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
            Add New Award/Recognition
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
                  name="name"
                  value={formData.name}
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
                  name="organization"
                  value={formData.organization}
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
                <div className="relative">
                  <input
                    type="date"
                    name="awarded_date"
                    value={formData.awarded_date}
                    onChange={handleChange}
                    placeholder="DD/MM/YYYY"
                    className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                  />
                  <IoCalendarOutline
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
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

export default AddAwardForm;
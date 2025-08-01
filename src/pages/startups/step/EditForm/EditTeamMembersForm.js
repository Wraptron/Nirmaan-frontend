// import React, { useState } from "react";
// import toast from "react-hot-toast";

// const EditTeamMembersForm = ({ initialData, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     designation: "",
//     email: "",
//     phone: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateEmail = (email) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   const validatePhone = (phone) => {
//     return /^\d{10}$/.test(phone);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name.trim()) {
//       toast.error("Name is required");
//       return;
//     }

//     if (!formData.designation.trim()) {
//       toast.error("Designation is required");
//       return;
//     }

//     if (!formData.email.trim() || !validateEmail(formData.email)) {
//       toast.error("Enter a valid email address");
//       return;
//     }

//     if (!formData.phone.trim() || !validatePhone(formData.phone)) {
//       toast.error("Enter a valid 10-digit phone number");
//       return;
//     }

//     await onSubmit(formData);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl shadow-lg w-[430px] relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//             <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//           </svg>
//         </button>
//         <div className="p-6">
//           <h2 className="text-xl font-semibold text-[#232323] mb-6">Team Members</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm mb-1.5 font-medium">
//                   Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter Name"
//                   className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm mb-1.5 font-medium">
//                   Designation <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="designation"
//                   value={formData.designation}
//                   onChange={handleChange}
//                   placeholder="Enter Designation"
//                   className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm mb-1.5 font-medium">
//                   Email Id <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter email address"
//                   className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm mb-1.5 font-medium">
//                   Phone Number <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
//                     setFormData((prev) => ({ ...prev, phone: value }));
//                   }}
//                   maxLength={10}
//                   placeholder="e.g. 9876543210"
//                   className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
//                 />
//               </div>
//             </div>
//             <div className="flex justify-center pt-2">
//               <button
//                 type="submit"
//                 className="px-10 py-2 text-base font-semibold text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors"
//               >
//                 Add
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditTeamMembersForm;

// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { ApiUpdateStartupFounder } from "../../../../API/API";

// const EditTeamMembersForm = ({ initialData, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     founder_name: "",
//     founder_email: "",
//     founder_number: "",
//     email_address: "",
//   });
//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         founder_name: initialData.founder_name || "",
//         founder_email: initialData.founder_email || "",
//         founder_number: initialData.founder_number || "",
//         email_address: initialData.email_address || "",
//       });
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Submitting data:", formData);

//     try {
//       await ApiUpdateStartupFounder(formData);
//       toast.success("Profile updated successfully");
//       onClose();
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("Failed to update profile");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl shadow-lg w-[430px] relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//             <path
//               d="M1 1L13 13M1 13L13 1"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />
//           </svg>
//         </button>
//         <div className="p-6">
//           <h2 className="text-xl font-semibold text-[#232323] mb-6">
//             Team Members
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm mb-1.5 font-medium">
//                   Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="founder_name"
//                   value={formData.founder_name}
//                   onChange={handleChange}
//                   placeholder="Enter Name"
//                   className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm mb-1.5 font-medium">
//                   Designation <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="founder_email"
//                   name="email"
//                   value={formData.founder_email}
//                   onChange={handleChange}
//                   placeholder="Enter Designation"
//                   className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm mb-1.5 font-medium">
//                   Email Id <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   name="founder_number"
//                   value={formData.founder_number}
//                   onChange={handleChange}
//                   placeholder="Enter email address"
//                   className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
//                 />
//               </div>
//               {/* <div>
//                 <label className="block text-sm mb-1.5 font-medium">Phone Number <span className="text-red-500">*</span></label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="+91 | XXXXX XXXXX"
//                   className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
//                 />
//               </div> */}
//             </div>
//             <div className="flex justify-center pt-2">
//               <button
//                 type="submit"
//                 className="px-10 py-2 text-base font-semibold text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors"
//               >
//                 Add
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditTeamMembersForm;

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ApiUpdateStartupFounder } from "../../../../API/API";

const EditTeamMembersForm = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    founder_name: "",
    founder_email: "",
    founder_number: "",
    email_address: "",
  });
  useEffect(() => {
    if (initialData) {
      setFormData({
        founder_name: initialData.founder_name || "",
        founder_email: initialData.founder_email || "",
        founder_number: initialData.founder_number || "",
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

    console.log("Submitting data:", formData);

    try {
      await ApiUpdateStartupFounder(formData);
      toast.success("Profile updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
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
            Team Members
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="founder_name"
                  value={formData.founder_name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Designation <span className="text-red-500">*</span>
                </label>
                <select
                  type="founder_email"
                  name="email"
                  // value={}
                  onChange={handleChange}
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                >
                  <option value="" disabled>
                    Select Designation
                  </option>
                  <option value="Founder">Founder</option>
                  <option value="Co-Founder">Co-Founder</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Email Id <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="founder_email"
                  value={formData.founder_email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5 font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="founder_number"
                  value={formData.founder_number}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div>
              {/* <div>
                <label className="block text-sm mb-1.5 font-medium">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 | XXXXX XXXXX"
                  className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500"
                />
              </div> */}
            </div>
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="px-10 py-2 text-base font-semibold text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTeamMembersForm;
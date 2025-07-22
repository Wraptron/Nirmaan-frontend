// // import React from "react";

// // const Step1 = ({formData, handleChange}) => {
// //   return (
// //     <div className="grid grid-cols-2 gap-5 mt-9 px-7">
// //                 <div>
// //                     <div>Name of the Start-up <span className="text-red-500">*</span></div>
// //                     <div className="mt-1"><input type="text" onChange={handleChange} name="startup_name" value={formData.startup_name} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="Enter name of the Start-up"/></div>
// //                 </div>
// //                 <div>
// //                     <div>Sector <span className="text-red-500">*</span></div>
// //                     <div className="mt-1"><input type="text" onChange={handleChange} name="startup_sector" value={formData.startup_sector} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="Select sector"/></div>
// //                 </div>
// //                 <div>
// //                     <div>Start-up Type <span className="text-red-500">*</span></div>
// //                     <div className="mt-1"><input type="text" onChange={handleChange} name="startup_type" value={formData.startup_type} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="Select start-up type"/></div>
// //                 </div>
// //                 <div>
// //                     <div>Start-up Industry <span className="text-red-500">*</span></div>
// //                     <div className="mt-1"><input type="text" onChange={handleChange} name="startup_industry" value={formData.startup_industry} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="Select Start-up Industry"/></div>
// //                 </div>
// //                 <div>
// //                     <div>Start-up Technology <span className="text-red-500">*</span></div>
// //                     <div className="mt-1">
// //                       <select onChange={handleChange} name="startup_technology" value={formData.startup_technology} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="Select Start-up technology">
// //                           <option disabled>Select start-up technology</option>
// //                           <option>Hardware</option>
// //                           <option>Software</option>
// //                           <option>Internet of Things</option>
// //                       </select>
// //                     </div>
// //                 </div>
// //                 <div>
// //                     <div>Start-up Cohort <span className="text-red-500">*</span></div>
// //                     <div className="mt-1"><input type="month" onChange={handleChange} name="startup_cohort" value={formData.startup_cohort} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="Select Cohort"/></div>
// //                 </div>
// //                 <div>
// //                     <div>Year of Graduation <span className="text-red-500">*</span></div>
// //                     <div className="mt-1"><input type="text" onChange={handleChange} name="startup_yog" value={formData.startup_yog} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="Enter Year of graduation"/></div>
// //                 </div>
// //                 <div>
// //                     <div>Graduated To <span className="text-red-500">*</span></div>
// //                     <div className="mt-1"><input type="text" onChange={handleChange} name="graduated_to" value={formData.graduated_to} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="Select Graduated"/></div>
// //                 </div>
// //       </div>
// //   );
// // };
// // export default Step1;

// import React, { useState } from "react";

// const Step1 = ({ formData, handleChange, errors = {}, setErrors = () => {} }) => {
//   const [touched, setTouched] = useState({});

//   // Validation logic for each field
//   const validateField = (name, value) => {
//     const trimmed = typeof value === "string" ? value.trim() : value;
//     if (!trimmed) return "This field is required";

//     switch (name) {
//       case "startup_name":
//       case "startup_sector":
//       case "startup_type":
//       case "startup_industry":
//       case "graduated_to":
//         if (!/^[a-zA-Z][a-zA-Z\s-]*$/.test(trimmed)) {
//           return "Only letters, spaces and hyphens allowed";
//         }
//         if (trimmed.length < 2) return "Minimum 2 characters required";
//         break;

//       case "startup_yog":
//         if (!/^\d{4}$/.test(value)) return "Must be 4 digits (e.g., 2023)";
//         const year = parseInt(value, 10);
//         const currentYear = new Date().getFullYear();
//         if (year > currentYear) return "Year cannot be in the future";
//         if (year < 2000) return "Year should be after 2000";
//         break;

//       case "startup_technology":
//         if (!value) return "Please select a technology";
//         break;

//       case "startup_cohort":
//         if (!value) return "Please select a valid month/year";
//         break;

//       default:
//         break;
//     }

//     return "";
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     const cleanedValue = value.startsWith(" ") ? value.trimStart() : value;

//     handleChange({ target: { name, value: cleanedValue } });

//     if (touched[name]) {
//       const error = validateField(name, cleanedValue);
//       setErrors((prev) => ({ ...prev, [name]: error }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched((prev) => ({ ...prev, [name]: true }));
//     const error = validateField(name, value);
//     setErrors((prev) => ({ ...prev, [name]: error }));
//   };

//   const renderInput = (label, name, placeholder, type = "text", maxLength = 50, extraProps = {}) => (
//     <div>
//       <label className="block font-medium text-gray-700">
//         {label} <span className="text-red-500">*</span>
//       </label>
//       <input
//         type={type}
//         name={name}
//         placeholder={placeholder}
//         maxLength={maxLength}
//         value={formData[name]}
//         onChange={handleInputChange}
//         onBlur={handleBlur}
//         className={`mt-1 block w-full p-2 text-sm rounded-lg border focus:ring-[#45C74D] focus:border-[#45C74D] ${
//           touched[name] && errors[name] ? "border-red-500 bg-red-50" : "border-gray-300"
//         }`}
//         {...extraProps}
//       />
//       {touched[name] && errors[name] && (
//         <p className="text-sm text-red-600 mt-1">{errors[name]}</p>
//       )}
//     </div>
//   );

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 px-6">
//       {renderInput(
//         "Name of the Start-up",
//         "startup_name",
//         "Enter startup name"
//       )}
//       {renderInput("Sector", "startup_sector", "Business sector")}
//       {renderInput("Start-up Type", "startup_type", "Type of startup")}
//       {renderInput(
//         "Start-up Industry",
//         "startup_industry",
//         "Industry category"
//       )}

//       {/* Technology Select */}
//       <div>
//         <label className="block font-medium text-gray-700">
//           Start-up Technology <span className="text-red-500">*</span>
//         </label>
//         <select
//           name="startup_technology"
//           value={formData.startup_technology}
//           onChange={handleInputChange}
//           onBlur={handleBlur}
//           className={`mt-1 block w-full p-2 text-sm rounded-lg border focus:ring-[#45C74D] focus:border-[#45C74D] ${
//             touched.startup_technology && errors.startup_technology
//               ? "border-red-500 bg-red-50"
//               : "border-gray-300"
//           }`}
//         >
//           <option value="">Select technology</option>
//           <option value="Hardware">Hardware</option>
//           <option value="Software">Software</option>
//           <option value="Internet of Things">Internet of Things</option>
//           <option value="Artificial Intelligence">
//             Artificial Intelligence
//           </option>
//           <option value="Blockchain">Blockchain</option>
//         </select>
//         {touched.startup_technology && errors.startup_technology && (
//           <p className="text-sm text-red-600 mt-1">
//             {errors.startup_technology}
//           </p>
//         )}
//       </div>

//       {/* Cohort Month Picker */}
//       <div>
//         <label className="block font-medium text-gray-700">
//           Start-up Cohort <span className="text-red-500">*</span>
//         </label>
//         <input
//           type="month"
//           name="startup_cohort"
//           value={formData.startup_cohort}
//           onChange={handleInputChange}
//           onBlur={handleBlur}
//           min="2000-01"
//           max="2099-12"
//           className={`mt-1 block w-full p-2 text-sm rounded-lg border focus:ring-[#45C74D] focus:border-[#45C74D] ${
//             touched.startup_cohort && errors.startup_cohort
//               ? "border-red-500 bg-red-50"
//               : "border-gray-300"
//           }`}
//         />
//         {touched.startup_cohort && errors.startup_cohort && (
//           <p className="text-sm text-red-600 mt-1">{errors.startup_cohort}</p>
//         )}
//       </div>

//       {/* Year of Graduation with numeric restrictions */}
//       {renderInput(
//         "Year of Graduation",
//         "startup_yog",
//         "Only Fill Graduated Year ",
//         "text",
//         4,
//         {
//           inputMode: "numeric",
//           pattern: "\\d{4}",
//           onInput: (e) => {
//             e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
//           },
//         }
//       )}

//       {renderInput("Graduated To", "graduated_to", "Graduation status")}

//       {/* Community Select */}
//       <div>
//         <label className="block font-medium text-gray-700">
//           Community <span className="text-red-500">*</span>
//         </label>
//         <select
//           name="startup_Community"
//           value={formData.startup_Community}
//           onChange={handleInputChange}
//           onBlur={handleBlur}
//           className={`mt-1 block w-full p-2 text-sm rounded-lg border focus:ring-[#45C74D] focus:border-[#45C74D] ${
//             touched.startup_Community && errors.startup_Community
//               ? "border-red-500 bg-red-50"
//               : "border-gray-300"
//           }`}
//         >
//           <option value="" disabled>Select start-up Community</option>
//           <option value="CFI">CFI</option>
//           <option value="E-cell">E-cell</option>
//           <option value="CZC">CZC</option>
//           <option value="PALS">PALS</option>
//           <option value="IZI">IZI</option>
//           <option value="Direct entry">Direct entry</option>
//           <option value="Non-iit">Non-iit</option>
//         </select>
//         {touched.startup_Community && errors.startup_Community && (
//           <p className="text-sm text-red-600 mt-1">{errors.startup_Community}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Step1;

import React, { useState } from "react";

const Step1 = ({
  formData,
  handleChange,
  errors = {},
  setErrors = () => {},
}) => {
  const [touched, setTouched] = useState({});

  // Dropdown options
  const sectorOptions = [
    "Manufacturing and industry ",
    "Social and leisure",
    "Hardware & IOT",
    "EdTech",
    "Energy & Environment",
    "Software & Data",
    "Services",
    "Ecommerce & Retail",
    "Agriculture & Food",
  ];

  const domainOptions = [
    "Industry 4.0",
    "Sustainability",
    "Health Care",
    "FinTech",
    "E-Mobility",
    "EdTech",
  ];

  const technologyOptions = [
    "	3D Printing & Fabrication",
    "App Development",
    "	Artificial Intelligence (AI) & Machine Learning (ML)",
    "	Augmented Reality (AR) & Virtual Reality (VR)",
    "	BioMimicry Applications",
    "Blockchain",
    "	Deep Technology (Anything with a deep technical expertise)",
    "	Internet of Things (IoT)",
    "Other",
  ];

  const graduatedToOptions = ["IITM-IC ", "Other"];

  // Validation logic for each field
  const validateField = (name, value) => {
    const trimmed = typeof value === "string" ? value.trim() : value;
    if (!trimmed) return "This field is required";

    switch (name) {
      case "startup_name":
      case "startup_industry":
        if (!/^[a-zA-Z][a-zA-Z\s-]*$/.test(trimmed)) {
          return "Only letters, spaces and hyphens allowed";
        }
        if (trimmed.length < 2) return "Minimum 2 characters required";
        break;

      case "startup_yog":
        if (!/^\d{4}$/.test(value)) return "Must be 4 digits (e.g., 2023)";
        const year = parseInt(value, 10);
        const currentYear = new Date().getFullYear();
        if (year > currentYear) return "Year cannot be in the future";
        if (year < 2000) return "Year should be after 2000";
        break;

      case "startup_technology":
      case "startup_sector":
      case "startup_domain":
      case "graduated_to":
      case "startup_Community":
        if (!value) return "Please select an option";
        break;

      case "startup_cohort":
        if (!value) return "Please select a valid month/year";
        break;

      default:
        break;
    }

    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const cleanedValue = value.startsWith(" ") ? value.trimStart() : value;

    handleChange({ target: { name, value: cleanedValue } });

    if (touched[name]) {
      const error = validateField(name, cleanedValue);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const renderInput = (
    label,
    name,
    placeholder,
    type = "text",
    maxLength = 50,
    extraProps = {}
  ) => (
    <div>
      <label className="block font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        value={formData[name]}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className={`mt-1 block w-full p-2 text-sm rounded-lg border focus:ring-[#45C74D] focus:border-[#45C74D] ${
          touched[name] && errors[name]
            ? "border-red-500 bg-red-50"
            : "border-gray-300"
        }`}
        {...extraProps}
      />
      {touched[name] && errors[name] && (
        <p className="text-sm text-red-600 mt-1">{errors[name]}</p>
      )}
    </div>
  );

  const renderSelect = (label, name, options, placeholder) => (
    <div>
      <label className="block font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className={`mt-1 block w-full p-2 text-sm rounded-lg border focus:ring-[#45C74D] focus:border-[#45C74D] ${
          touched[name] && errors[name]
            ? "border-red-500 bg-red-50"
            : "border-gray-300"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {touched[name] && errors[name] && (
        <p className="text-sm text-red-600 mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 px-6">
      {/* 1. Startup Name */}
      {renderInput(
        "Name of the Start-up",
        "startup_name",
        "Enter startup name"
      )}

      {/* 2. Startup Domain  */}
      {renderSelect(
        "Start-up Domain",
        "startup_domain",
        domainOptions,
        "Select startup domain"
      )}

      {/* 3. Sector */}
      {renderSelect("Sector", "startup_sector", sectorOptions, "Select sector")}

      {/* 4. Industry */}
      {/* {renderInput(
        "Start-up Industry",
        "startup_industry",
        "Industry category"
      )} */}

      {/* 5. Technology */}
      {renderSelect(
        "Start-up Technology",
        "startup_technology",
        technologyOptions,
        "Select technology"
      )}

      {/* 6. Cohort */}
      <div>
        <label className="block font-medium text-gray-700">
          Start-up Cohort <span className="text-red-500">*</span>
        </label>
        <input
          type="month"
          name="startup_cohort"
          value={formData.startup_cohort}
          onChange={handleInputChange}
          onBlur={handleBlur}
          min="2000-01"
          max="2099-12"
          className={`mt-1 block w-full p-2 text-sm rounded-lg border focus:ring-[#45C74D] focus:border-[#45C74D] ${
            touched.startup_cohort && errors.startup_cohort
              ? "border-red-500 bg-red-50"
              : "border-gray-300"
          }`}
        />
        {touched.startup_cohort && errors.startup_cohort && (
          <p className="text-sm text-red-600 mt-1">{errors.startup_cohort}</p>
        )}
      </div>

      {/* 7. Year of Graduation */}
      {renderInput(
        "Year of Graduation",
        "startup_yog",
        "Only Fill Graduated Year",
        "text",
        4,
        {
          inputMode: "numeric",
          pattern: "\\d{4}",
          onInput: (e) => {
            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
          },
        }
      )}

      {/* 8. Graduated To */}
      {renderSelect(
        "Graduated To",
        "graduated_to",
        graduatedToOptions,
        "Select graduation status"
      )}

      {/* 9. Community */}
      <div>
        <label className="block font-medium text-gray-700">
          Community <span className="text-red-500">*</span>
        </label>
        <select
          name="startup_Community"
          value={formData.startup_Community}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={`mt-1 block w-full p-2 text-sm rounded-lg border focus:ring-[#45C74D] focus:border-[#45C74D] ${
            touched.startup_Community && errors.startup_Community
              ? "border-red-500 bg-red-50"
              : "border-gray-300"
          }`}
        >
          <option value="" disabled>
            Select start-up Community
          </option>
          <option value="CFI">CFI</option>
          <option value="E-cell">E-cell</option>
          <option value="CZC">CZC</option>
          <option value="PALS">PALS</option>
          <option value="IZI">IZI</option>
          <option value="Direct entry">Direct entry</option>
          <option value="Non-iit">Non-iit</option>
        </select>
        {touched.startup_Community && errors.startup_Community && (
          <p className="text-sm text-red-600 mt-1">
            {errors.startup_Community}
          </p>
        )}
      </div>
    </div>
  );
};

export default Step1;
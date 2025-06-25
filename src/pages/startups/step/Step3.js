// import React, {useState} from "react";

// const Step3 = ({formData, handleChange}) => {
//   let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   const [emailValid, setEmailValid] = useState(0);
//   const [formDataa, setFormData] = useState({ founder_email: "" });

//   const handleEmailValidation = (e) => {
//       let email = e.target.value;
//       setFormData({ ...formDataa, founder_email: email });
//       if (regex.test(email)) {
//           console.log("Valid Email address");
//           setEmailValid(1);
//       } else if(email == ""){
//           setEmailValid(0);
//       }
//       else
//       {
//         setEmailValid(2);
//       }
//   };
//   let handleBothChange = (e) => {
//     handleChange(e);
//     handleEmailValidation(e);
//   }
//   return (
//     <div className="grid grid-cols-2 gap-5 mt-9 px-7">
//         <div>
//             <div>Founder Name</div>
//             <div className="mt-1"><input type="text" onChange={handleChange} name="founder_name" value={formData.founder_name} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="Enter founded name"/></div>
//         </div>
//         <div>
//             <div>Email Address</div>
//             <div className="mt-1">
//               <input type="text" onChange={handleChange}  onInput={handleEmailValidation} name="founder_email" value={formData.founder_email} className={`block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D] ${emailValid === 2 && 'focus:ring-[#E54545] focus:border-[#E54545]'}`} placeholder="Enter email address"/>
//               {emailValid===2 && <span className="text-xs text-[#E54545]">Please enter a valid email address</span> || ''}
//             </div>
//         </div>
//         <div>
//             <div>Contact Number</div>
//             <div className="mt-1"><input type="text" onChange={handleChange} name="founder_number" value={formData.founder_number} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="xxxxx xxxxx"/></div>
//         </div>
//         <div>
//             <div>Gender</div>
//             <div className="mt-1">
//               <select onChange={handleChange} name="founder_gender" value={formData.founder_gender} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="Select gender">
//                   <option>Choose a Gender</option>
//                   <option>Male</option>
//                   <option>Female</option>
//               </select>

//             </div>
//         </div>
//         <div>
//             <div>Student ID</div>
//             <div className="mt-1"><input type="text" onChange={handleChange} name="founder_student_id" value={formData.founder_student_id} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="Enter student ID"/></div>
//         </div>
//         <div>
//             <div>LinkedIn Id</div>
//             <div className="mt-1"><input type="text" onChange={handleChange} name="linkedInid" value={formData.linkedInid} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"/></div>
//         </div>
//     </div>
//   );
// };
// export default Step3;
















import React, {useState, useEffect} from "react";

const Step3 = ({formData, handleChange}) => {
  const [errors, setErrors] = useState({});

  // Validation functions for each field
  const validateFounderName = (value) => {
    if (!value) return "Founder name is required";
    if (value.length < 2) return "Founder name must be at least 2 characters";
    if (!/^[a-zA-Z\s]+$/.test(value)) return "Founder name can only contain letters and spaces";
    return "";
  };

  const validateFounderEmail = (value) => {
    if (!value) return "Email address is required";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  };

  const validateFounderNumber = (value) => {
    if (!value) return "Contact number is required";
    if (!/^\d{10}$/.test(value)) return "Please enter a valid 10-digit phone number";
    return "";
  };

  const validateFounderGender = (value) => {
    if (!value || value === "Choose a Gender") return "Gender is required";
    return "";
  };

  const validateFounderStudentId = (value) => {
    if (!value) return "Student ID is required";
    if (value.length < 3) return "Student ID must be at least 3 characters";
    return "";
  };

  // Fixed LinkedIn validation - now required
  const validateLinkedInId = (value) => {
    if (!value) return "LinkedIn ID is required";
    if (!/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/.test(value)) {
      return "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)";
    }
    return "";
  };

  // Validate all fields at once
  const validateAllFields = () => {
    const newErrors = {};
    
    newErrors.founder_name = validateFounderName(formData.founder_name);
    newErrors.founder_email = validateFounderEmail(formData.founder_email);
    newErrors.founder_number = validateFounderNumber(formData.founder_number);
    newErrors.founder_gender = validateFounderGender(formData.founder_gender);
    newErrors.founder_student_id = validateFounderStudentId(formData.founder_student_id);
    newErrors.linkedInid = validateLinkedInId(formData.linkedInid);
    
    setErrors(newErrors);
    
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== "");
    return !hasErrors;
  };

  // Check if form is valid (all required fields filled and no errors)
  const isFormValid = () => {
    const requiredFields = [
      'founder_name',
      'founder_email', 
      'founder_number',
      'founder_gender',
      'founder_student_id',
      'linkedInid' // Added LinkedIn ID as required field
    ];
    
    // Check if all required fields are filled
    const allRequiredFieldsFilled = requiredFields.every(field => {
      const value = formData[field];
      return value && value.toString().trim() !== "" && value !== "Choose a Gender";
    });
    
    // Check if there are no validation errors
    const noErrors = Object.values(errors).every(error => error === "");
    
    return allRequiredFieldsFilled && noErrors;
  };

  // Handle field validation on change
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    
    // Call the original handleChange
    handleChange(e);
    
    // Validate the specific field
    let error = "";
    switch(name) {
      case "founder_name":
        error = validateFounderName(value);
        break;
      case "founder_email":
        error = validateFounderEmail(value);
        break;
      case "founder_number":
        error = validateFounderNumber(value);
        break;
      case "founder_gender":
        error = validateFounderGender(value);
        break;
      case "founder_student_id":
        error = validateFounderStudentId(value);
        break;
      case "linkedInid":
        error = validateLinkedInId(value);
        break;
      default:
        break;
    }
    
    // Update errors state
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Handle form submission or next step
  const handleNextStep = () => {
    const isValid = validateAllFields();
    
    if (isValid) {
      // Proceed to next step
      console.log("Form is valid, proceeding to next step");
      // You can call your next step function here
      // e.g., onNextStep();
      return true;
    } else {
      // Show validation errors
      console.log("Form has validation errors");
      return false;
    }
  };

  // Effect to validate form whenever formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      // Validate all fields when form data changes
      const newErrors = {};
      Object.keys(formData).forEach(fieldName => {
        switch(fieldName) {
          case "founder_name":
            newErrors[fieldName] = validateFounderName(formData[fieldName]);
            break;
          case "founder_email":
            newErrors[fieldName] = validateFounderEmail(formData[fieldName]);
            break;
          case "founder_number":
            newErrors[fieldName] = validateFounderNumber(formData[fieldName]);
            break;
          case "founder_gender":
            newErrors[fieldName] = validateFounderGender(formData[fieldName]);
            break;
          case "founder_student_id":
            newErrors[fieldName] = validateFounderStudentId(formData[fieldName]);
            break;
          case "linkedInid":
            newErrors[fieldName] = validateLinkedInId(formData[fieldName]);
            break;
        }
      });
      setErrors(newErrors);
    }
  }, [formData]);

  // Get input class with error styling
  const getInputClass = (fieldName) => {
    const baseClass = "block w-full p-2 text-sm border rounded-lg bg-gray-50 focus:ring-[#45C74D]";
    const errorClass = errors[fieldName] ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-[#45C74D]";
    return `${baseClass} ${errorClass} text-gray-900`;
  };

  return (
    <div className="grid grid-cols-2 gap-5 mt-9 px-7">
        <div>
            <div>Founder Name <span className="text-red-500">*</span></div>
            <div className="mt-1">
              <input 
                type="text" 
                onChange={handleFieldChange} 
                name="founder_name" 
                value={formData.founder_name || ""} 
                className={getInputClass('founder_name')}
                placeholder="Enter founder name"
                maxLength="50"
              />
            </div>
            {errors.founder_name && <div className="text-red-500 text-xs mt-1">{errors.founder_name}</div>}
        </div>
        
        <div>
            <div>Email Address <span className="text-red-500">*</span></div>
            <div className="mt-1">
              <input 
                type="email" 
                onChange={handleFieldChange} 
                name="founder_email" 
                value={formData.founder_email || ""} 
                className={getInputClass('founder_email')}
                placeholder="Enter email address"
              />
            </div>
            {errors.founder_email && <div className="text-red-500 text-xs mt-1">{errors.founder_email}</div>}
        </div>
        
        <div>
            <div>Contact Number <span className="text-red-500">*</span></div>
            <div className="mt-1">
              <input 
                type="tel" 
                onChange={handleFieldChange} 
                name="founder_number" 
                value={formData.founder_number || ""} 
                className={getInputClass('founder_number')}
                placeholder="xxxxx xxxxx"
                maxLength="10"
              />
            </div>
            {errors.founder_number && <div className="text-red-500 text-xs mt-1">{errors.founder_number}</div>}
        </div>
        
        <div>
            <div>Gender <span className="text-red-500">*</span></div>
            <div className="mt-1">
              <select 
                onChange={handleFieldChange} 
                name="founder_gender" 
                value={formData.founder_gender || ""} 
                className={getInputClass('founder_gender')}
              >
                  <option value="">Choose a Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
              </select>
             </div>
             {errors.founder_gender && <div className="text-red-500 text-xs mt-1">{errors.founder_gender}</div>}
        </div>
        
        <div>
            <div>Student ID <span className="text-red-500">*</span></div>
            <div className="mt-1">
              <input 
                type="text" 
                onChange={handleFieldChange} 
                name="founder_student_id" 
                value={formData.founder_student_id || ""} 
                className={getInputClass('founder_student_id')}
                placeholder="Enter student ID"
                maxLength="20"
              />
            </div>
            {errors.founder_student_id && <div className="text-red-500 text-xs mt-1">{errors.founder_student_id}</div>}
        </div>
        
        <div>
            <div>LinkedIn ID <span className="text-red-500">*</span></div>
            <div className="mt-1">
              <input 
                type="url" 
                onChange={handleFieldChange} 
                name="linkedInid" 
                value={formData.linkedInid || ""} 
                className={getInputClass('linkedInid')}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            {errors.linkedInid && <div className="text-red-500 text-xs mt-1">{errors.linkedInid}</div>}
        </div>
        
        {/* Form Status and Next Button */}
        <div className="col-span-2 mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              {isFormValid() ? (
                <span className="text-green-600 font-medium">✓ All fields completed successfully</span>
              ) : (
                <span className="text-orange-600 font-medium">⚠ Please complete all required fields</span>
              )}
            </div>
            
          </div>
          
          {/* Progress indicator */}
        
        </div>
    </div>
  );
};

export default Step3;
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

  // Academic Background validation
  const validateAcademicBackground = (value) => {
    if (!value || value === "Choose a Academic ") return "Academic background is required";
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
      case "academic_background":
        error = validateAcademicBackground(value);
        break;
      default:
        error = "";
        break;
    }
    
    // Update errors state
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
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
          case "academic_background":
            newErrors[fieldName] = validateAcademicBackground(formData[fieldName]);
            break;
          default:
            // No validation for other fields
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

  const isFormValid = () => {
    // List all required fields
    const requiredFields = [
      "founder_name",
      "founder_email",
      "founder_number",
      "founder_gender",
      "founder_student_id",
      "linkedInid",
      "academic_background"
    ];
    // Check if any required field is empty or has an error
    for (let field of requiredFields) {
      if (!formData[field] || errors[field]) {
        return false;
      }
    }
    return true;
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
        {/* Academic Background Field */}
        <div>
          <div>Academic Background <span className="text-red-500">*</span></div>
          <div className="mt-1">
            <select
              onChange={handleFieldChange}
              name="academic_background"
              value={formData.academic_background || ""}
              className={getInputClass('academic_background')}
              placeholder="Academic-Background"
            >
              <option value="">Choose a Academic </option>
              <option>Bsc Datascience</option>
              <option>B.Tech</option>
              <option>M.Tech</option>
              <option>Msc</option>
              <option>MBA</option>
              <option>Msc in Research</option>
              <option>External</option>
            </select>
          </div>
          {errors.academic_background && <div className="text-red-500 text-xs mt-1">{errors.academic_background}</div>}
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
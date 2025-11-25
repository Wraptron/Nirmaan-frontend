
import React, {useRef, useState, useEffect} from "react";

const Step4 = ({formData, handleChange}) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});

  // Validation functions for each field
  const validateLogo = (file) => {
    if (!file) return "Logo is required";
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return "Please upload a valid image file (JPEG, PNG, GIF, or WebP)";
    }
    
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }
    
    return "";
  };

  const validateDescription = (value) => {
    if (!value || value.trim() === "") return "Description is required";
    if (value.trim().length < 10) return "Description must be at least 10 characters";
    if (value.trim().length > 1000) return "Description must be less than 1000 characters";
    return "";
  };

  // Validate all fields at once
  // const validateAllFields = () => {
  //   const newErrors = {};
    
  //   newErrors.logo = validateLogo(formData.logo);
  //   newErrors.startup_description = validateDescription(formData.startup_description);
    
  //   setErrors(newErrors);
    
  //   // Check if there are any errors
  //   const hasErrors = Object.values(newErrors).some(error => error !== "");
  //   return !hasErrors;
  // };

  // Check if form is valid (all required fields filled and no errors)
  const isFormValid = () => {
    const requiredFields = [
      'logo',
      'startup_description'
    ];
    
    // Check if all required fields are filled
    const allRequiredFieldsFilled = requiredFields.every(field => {
      const value = formData[field];
      if (field === 'logo') {
        return value && value instanceof File;
      }
      return value && value.toString().trim() !== "";
    });
    
    // Check if there are no validation errors
    const noErrors = Object.values(errors).every(error => error === "");
    
    return allRequiredFieldsFilled && noErrors;
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileName(file.name);
      
      // Create a synthetic event to pass to handleChange
      const syntheticEvent = {
        target: {
          name: 'logo',
          value: file,
          files: event.target.files
        }
      };
      
      // Call the parent handleChange
      handleChange(syntheticEvent);
      
      // Validate the file
      const error = validateLogo(file);
      setErrors(prev => ({
        ...prev,
        logo: error
      }));
    }
  };

  // Handle description change with validation
  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    
    // Call the original handleChange
    handleChange(e);
    
    // Validate the description
    const error = validateDescription(value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Effect to validate form whenever formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      const newErrors = {};
      
      if (formData.logo !== undefined) {
        newErrors.logo = validateLogo(formData.logo);
      }
      
      if (formData.startup_description !== undefined) {
        newErrors.startup_description = validateDescription(formData.startup_description);
      }
      
      setErrors(newErrors);
    }
  }, [formData]);

  // Set initial filename if logo exists
  useEffect(() => {
    if (formData.logo && formData.logo instanceof File) {
      setFileName(formData.logo.name);
    }
  }, [formData.logo]);

  // Get input class with error styling
  const getInputClass = (fieldName) => {
    const baseClass = "block w-full p-2 text-sm border rounded-lg bg-gray-50 focus:ring-[#45C74D]";
    const errorClass = errors[fieldName] ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-[#45C74D]";
    return `${baseClass} ${errorClass} text-gray-900`;
  };

  const getButtonClass = () => {
    const baseClass = "p-2 text-white rounded-lg text-sm transition-all";
    const errorClass = errors.logo ? "bg-red-500 hover:bg-red-600" : "bg-[#45C74D] hover:bg-[#3BA03F]";
    return `${baseClass} ${errorClass}`;
  };

  return (
    <div className="grid grid-cols-1 mt-9 px-7">
      <div>
        <div>Choose Logo <span className="text-red-500">*</span></div>
        <div className="mt-1 flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={handleClick}
            className={getButtonClass()}
          >
            Upload Logo
          </button>
          <span className={`text-sm ${errors.logo ? 'text-red-500' : 'text-gray-700'}`}>
            {fileName || "No file chosen"}
          </span>
        </div>
        {errors.logo && <div className="text-red-500 text-xs mt-1">{errors.logo}</div>}
      </div>

      <div className="mt-4">
        <div>Description <span className="text-red-500">*</span></div>
        <div className="mt-1">
          <textarea 
            onChange={handleDescriptionChange} 
            name="startup_description" 
            value={formData.startup_description || ""} 
            className={`${getInputClass('startup_description')} resize-none`}
            placeholder="Enter your startup description (minimum 10 characters)"
            rows="4"
            maxLength="1000"
          />
        </div>
        {errors.startup_description && <div className="text-red-500 text-xs mt-1">{errors.startup_description}</div>}
        <div className="text-xs text-gray-500 mt-1">
          {formData.startup_description ? formData.startup_description.length : 0}/1000 characters
        </div>
      </div>

      {/* Form Status and Submit Button */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            {isFormValid() ? (
              <span className="text-green-600 font-medium">✓ All fields completed successfully</span>
            ) : (
              <span className="text-orange-600 font-medium">⚠ Please complete all required fields</span>
            )}
          </div>
          {/* <button
            type="button"
            onClick={handleNextStep}
            disabled={!isFormValid()}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              isFormValid()
                ? 'bg-[#45C74D] text-white hover:bg-[#3BA03F] cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit
          </button> */}
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4">
          <div className="text-xs text-gray-600 mb-1">
            Form Completion: {Math.round((Object.values(formData).filter(value => {
              if (value instanceof File) return true;
              return value && value.toString().trim() !== "";
            }).length / 2) * 100)}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#45C74D] h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.round((Object.values(formData).filter(value => {
                if (value instanceof File) return true;
                return value && value.toString().trim() !== "";
              }).length / 2) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
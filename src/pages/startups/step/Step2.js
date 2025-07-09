// 









import React, {useState, useEffect} from "react";
import { ApiFetchMentor } from "../../../API/API";

const Step2 = ({formData, handleChange}) => {
  const [errors, setErrors] = useState({});

  const FetchData = async() => {
    try {
        await ApiFetchMentor();
    }
    catch(err)
    {
        console.log(err);
    }
  }

  useEffect(() =>{
    FetchData();
  },[])

  // Validation functions for each field
  const validateOfficialContactNumber = (value) => {
    if (!value) return "Official contact number is required";
    if (!/^\d{10}$/.test(value)) return "Please enter a valid 10-digit phone number";
    return "";
  };

  const validateOfficialEmailAddress = (value) => {
    if (!value) return "Official email address is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
    return "";
  };

  const validateWebsiteLink = (value) => {
    if (value && !/^https?:\/\/.+\..+/.test(value)) return "Please enter a valid website URL";
    return "";
  };

  const validateLinkedinId = (value) => {
    if (value && !/^https?:\/\/(www\.)?linkedin\.com\//.test(value)) return "Please enter a valid LinkedIn URL";
    return "";
  };

  const validateMentorAssociated = (value) => {
    if (!value) return "Mentor associated is required";
    if (value.length < 2) return "Mentor name must be at least 2 characters";
    return "";
  };

  const validateRoleOfFaculty = (value) => {
    if (!value) return "Role of faculty is required";
    return "";
  };

  const validateCinRegistrationNumber = (value) => {
    if (!value) return "CIN/Registration number is required";
    if (value.length < 5) return "CIN/Registration number must be at least 5 characters";
    return "";
  };

  const validateDpiitNumber = (value) => {
    if (value && !/^DPIIT\d+$/.test(value)) return "Please enter a valid DPIIT number (format: DPIIT followed by numbers)";
    return "";
  };

  const validateFundingStage = (value) => {
    if (!value) return "Current funding stage is required";
    return "";
  };

  const validateOfficialRegistered = (value) => {
    if (!value) return "Official registered as is required";
    if (value.length < 2) return "Must be at least 2 characters";
    return "";
  };

  const validatePiaState = (value) => {
    if (!value) return "PIA is required";
    return "";
  };

  const validateScheme = (value) => {
    if (!value) return "Scheme is required";
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
      case "official_contact_number":
        error = validateOfficialContactNumber(value);
        break;
      case "official_email_address":
        error = validateOfficialEmailAddress(value);
        break;
      case "website_link":
        error = validateWebsiteLink(value);
        break;
      case "linkedin_id":
        error = validateLinkedinId(value);
        break;
      case "mentor_associated":
        error = validateMentorAssociated(value);
        break;
      case "role_of_faculty":
        error = validateRoleOfFaculty(value);
        break;
      case "cin_registration_number":
        error = validateCinRegistrationNumber(value);
        break;
      case "dpiit_number":
        error = validateDpiitNumber(value);
        break;
      case "funding_stage":
        error = validateFundingStage(value);
        break;
      case "official_registered":
        error = validateOfficialRegistered(value);
        break;
      case "pia_state":
        error = validatePiaState(value);
        break;
      case "scheme":
        error = validateScheme(value);
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

  // Get input class with error styling
  const getInputClass = (fieldName) => {
    const baseClass = "block w-full p-2 text-sm border rounded-lg bg-gray-50 focus:ring-[#45C74D]";
    const errorClass = errors[fieldName] ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-[#45C74D]";
    return `${baseClass} ${errorClass} text-gray-900`;
  };

  return (
    <div className="grid grid-cols-2 gap-5 mt-9 px-7">
          <div>
              <div>Official Contact Number <span className="text-red-500">*</span></div>
              <div className="mt-1 flex">
                <span className="absolute px-[10px] my-[10px] text-sm border border-r-1 border-l-0 border-t-0 border-b-0 border-gray-300 focus:ring-[#45C74D] focus:border-[#45C74D] text-gray-900">+91</span>
                <input 
                  type="text" 
                  onChange={handleFieldChange} 
                  name="official_contact_number" 
                  value={formData.official_contact_number || ""} 
                  className={`${getInputClass('official_contact_number')} ps-12`}
                  placeholder="xxxxx xxxxx"
                  maxLength="10"
                />
              </div>
              {errors.official_contact_number && <div className="text-red-500 text-xs mt-1">{errors.official_contact_number}</div>}
          </div>
          
          <div>
              <div>Official Email Address <span className="text-red-500">*</span></div>
              <div className="mt-1">
                <input 
                  type="email" 
                  onChange={handleFieldChange} 
                  name="official_email_address" 
                  value={formData.official_email_address || ""} 
                  className={getInputClass('official_email_address')}
                  placeholder="Enter official email address"
                />
              </div>
              {errors.official_email_address && <div className="text-red-500 text-xs mt-1">{errors.official_email_address}</div>}
          </div>
          
          <div>
              <div>Website Link</div>
              <div className="mt-1">
                <input 
                  type="url" 
                  onChange={handleFieldChange} 
                  name="website_link" 
                  value={formData.website_link || ""} 
                  className={getInputClass('website_link')}
                  placeholder="https://example.com"
                />
              </div>
              {errors.website_link && <div className="text-red-500 text-xs mt-1">{errors.website_link}</div>}
          </div>
          
          <div>
              <div>LinkedIn ID</div>
              <div className="mt-1">
                <input 
                  type="url" 
                  onChange={handleFieldChange} 
                  name="linkedin_id" 
                  value={formData.linkedin_id || ""} 
                  className={getInputClass('linkedin_id')}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              {errors.linkedin_id && <div className="text-red-500 text-xs mt-1">{errors.linkedin_id}</div>}
          </div>
          
          <div>
              <div>Mentor Associated <span className="text-red-500">*</span></div>
              <div className="mt-1">
                <input 
                  type="text" 
                  onChange={handleFieldChange} 
                  name="mentor_associated" 
                  value={formData.mentor_associated || ""} 
                  className={getInputClass('mentor_associated')}
                  placeholder="Select Mentor associated"
                />
              </div>
              {errors.mentor_associated && <div className="text-red-500 text-xs mt-1">{errors.mentor_associated}</div>}
          </div>
          
          <div>
              <div>Role of Faculty <span className="text-red-500">*</span></div>
              <div className="mt-1">
                  <select 
                    onChange={handleFieldChange} 
                    name="role_of_faculty" 
                    value={formData.role_of_faculty || ""} 
                    className={getInputClass('role_of_faculty')}
                  >
                        <option value="">Select Role</option>
                        <option value="Advisor/ Mentor">Advisor/ Mentor</option>
                        <option value="Co-Founder">Co-Founder</option>
                  </select>
               </div>
               {errors.role_of_faculty && <div className="text-red-500 text-xs mt-1">{errors.role_of_faculty}</div>}
          </div>
          
          <div>
              <div>CIN/Registration Number <span className="text-red-500">*</span></div>
              <div className="mt-1">
                <input 
                  type="text" 
                  onChange={handleFieldChange} 
                  name="cin_registration_number" 
                  value={formData.cin_registration_number || ""} 
                  className={getInputClass('cin_registration_number')}
                  placeholder="Enter CIN/Registration number"
                />
              </div>
              {errors.cin_registration_number && <div className="text-red-500 text-xs mt-1">{errors.cin_registration_number}</div>}
          </div>
          
          <div>
              <div>DPIIT Number</div>
              <div className="mt-1">
                <input 
                  type="text" 
                  onChange={handleFieldChange} 
                  name="dpiit_number" 
                  value={formData.dpiit_number || ""} 
                  className={getInputClass('dpiit_number')}
                  placeholder="DPIIT123456"
                />
              </div>
              {errors.dpiit_number && <div className="text-red-500 text-xs mt-1">{errors.dpiit_number}</div>}
          </div>
          
          <div>
              <div>Current Funding Stage <span className="text-red-500">*</span></div>
              <div className="mt-1">
                <select 
                  onChange={handleFieldChange} 
                  name="funding_stage" 
                  value={formData.funding_stage || ""} 
                  className={getInputClass('funding_stage')}
                >
                    <option value="">Select Funding Stage</option>
                    <option value="Pre-Seed">Pre-Seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Pre-Series A">Pre-Series A</option>
                    <option value="Series A">Series A</option>
                </select>
              </div>
              {errors.funding_stage && <div className="text-red-500 text-xs mt-1">{errors.funding_stage}</div>}
          </div>
          
          <div>
              <div>Official registered As <span className="text-red-500">*</span></div>
              <div className="mt-1">
                <input 
                  type="text" 
                  onChange={handleFieldChange} 
                  name="official_registered" 
                  value={formData.official_registered || ""} 
                  className={getInputClass('official_registered')}
                  placeholder="e.g., Private Limited Company"
                />
              </div>
              {errors.official_registered && <div className="text-red-500 text-xs mt-1">{errors.official_registered}</div>}
          </div>
          
          <div>
              <div>PIA <span className="text-red-500">*</span></div>
              <div className="mt-1">
                <input 
                  type="text" 
                  onChange={handleFieldChange} 
                  name="pia_state" 
                  value={formData.pia_state || ""} 
                  className={getInputClass('pia_state')}
                  placeholder="Enter PIA"
                />
              </div>
              {errors.pia_state && <div className="text-red-500 text-xs mt-1">{errors.pia_state}</div>}
          </div>
          
          <div>
              <div>Scheme <span className="text-red-500">*</span></div>
              <div className="mt-1">
                <select 
                  onChange={handleFieldChange} 
                  name="scheme" 
                  value={formData.scheme || ""} 
                  className={getInputClass('scheme')}
                >
                    <option value="">Select Scheme</option>
                    <option value="Pratham">Pratham</option>
                    <option value="Akshar">Akshar</option>
                    <option value="Graduated">Graduated</option>
                </select>
              </div>
              {errors.scheme && <div className="text-red-500 text-xs mt-1">{errors.scheme}</div>}
          </div>
    </div>
  );
};

export default Step2;
import React, { useState, useEffect } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import Step1 from "./Step/Step1";
import Step2 from "./Step/Step2";
import Step3 from "./Step/Step3";
import { useNavigate } from "react-router-dom";
import { ApiAddNewMentor } from "../../API/API";
import toast from "react-hot-toast";

import backarrow from "../../assets/images/Frame (1).svg";
import messagesvg from "../../assets/images/Frame (2).svg";
import messagesvgblack from "../../assets/images/Frame (22).svg";
import settingsvg from "../../assets/images/Frame (3).svg";
import professionalsvg from "../../assets/images/Frame (4).svg";
import professionalsvgblack from "../../assets/images/Frame (24).svg";
import settingsvgblack from "../../assets/images/Frame (25).svg";
import exclamtionwhite from "../../assets/images/Frame (26).svg";
import settingsvgwhite from "../../assets/images/Frame (27).svg";

function AddNewMentor() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: {
      mentor_name: "",
      choose_logo: "",
      mentor_description: "",
    },
    professional: {
      years_of_experience: null,
      area_of_expertise: "",
      current_designation: "",
      institution: "",
      qualification: "",
      year_of_passing_out: null,
      startup_associated: "",
    },
    contact: {
      contact_number: "",
      email_address: "",
      linkedIn_ID: "",
      password: "",
    },
  });

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [name]: value,
      },
    }));
  };

  const [showw, setShoww] = useState(false);
  useEffect(() => {
    setShoww(true);
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiAddNewMentor(formData);
      toast.success("Mentor added successfully");
      navigate("/mentors");
    } catch (error) {
      console.error("Error in API", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <NavBar />
        <div className="bg-gray-100 min-h-screen">
          <div className={`mx-10 py-5 ${showw ? "visible" : ""}`}>
            <div className="bg-white rounded-sm bg-white rounded-sm px-10 py-10">
              <div className="text-sm text-[#808080]">
                Dashboard &gt; Mentor &gt; Add New Mentor
              </div>
              <div className="text-lg font-semibold pt-2 flex gap-3 items-center">
                <a href="/mentors">
                  <img src={backarrow} className="w-4" alt="Back" />
                </a>
                <span>Add New Mentor</span>
              </div>

              {/* Step Indicator */}
              <div className="grid grid-cols-3 mt-6 gap-2">
                {/* Step 1 */}
                <div
                  className={`flex flex-col items-center justify-center p-2 ${currentStep === 0 ? "bg-[#45C74D]" : "bg-[#D8F3D9]"}`}
                  style={{
                    clipPath:
                      "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)",
                  }}
                >
                  <img
                    src={currentStep === 0 ? messagesvg : messagesvgblack}
                    className="w-5 mb-1"
                    alt="Step 1"
                  />
                  <span
                    className={`text-xs ${currentStep === 0 ? "text-white" : "text-black"}`}
                  >
                    Description
                  </span>
                </div>

                {/* Step 2 */}
                <div
                  className={`flex flex-col items-center justify-center p-2 ${currentStep === 1 ? "bg-[#45C74D]" : "bg-[#D8F3D9]"}`}
                  style={{
                    clipPath:
                      "polygon(89% 0%, 100% 50%, 89% 100%, 0% 100%, 9% 50%, 0% 0%)",
                  }}
                >
                  <img
                    src={
                      currentStep === 1 ? exclamtionwhite : professionalsvgblack
                    }
                    className="w-5 mb-1"
                    alt="Step 2"
                  />
                  <span
                    className={`text-xs ${currentStep === 1 ? "text-white" : "text-black"}`}
                  >
                    Professional
                  </span>
                </div>

                {/* Step 3 */}
                <div
                  className={`flex flex-col items-center justify-center p-2 ${currentStep === 2 ? "bg-[#45C74D]" : "bg-[#D8F3D9]"}`}
                  style={{
                    clipPath:
                      "polygon(100% 0%, 100% 49%, 100% 100%, 0% 100%, 9% 50%, 0% 0%)",
                  }}
                >
                  <img
                    src={currentStep === 2 ? settingsvgwhite : settingsvg}
                    className="w-5 mb-1"
                    alt="Step 3"
                  />
                  <span
                    className={`text-xs ${currentStep === 2 ? "text-white" : "text-black"}`}
                  >
                    Contact
                  </span>
                </div>
              </div>

              {/* Form Content */}
              <div className="mt-7">
                {currentStep === 0 && (
                  <Step1
                    formData={formData.description}
                    handleChange={(e) => handleChange(e, "description")}
                  />
                )}
                {currentStep === 1 && (
                  <Step2
                    formData={formData.professional}
                    handleChange={(e) => handleChange(e, "professional")}
                  />
                )}
                {currentStep === 2 && (
                  <Step3
                    formData={formData.contact}
                    handleChange={(e) => handleChange(e, "contact")}
                  />
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-center items-center mt-7 gap-4">
                  {currentStep > 0 && (
                    <button
                      className="bg-[#45C74D] p-2 text-white rounded-lg"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  )}
                  {currentStep < 2 && (
                    <button
                      className="bg-[#45C74D] p-2 text-white rounded-lg"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  )}
                  {currentStep === 2 && (
                    <form onSubmit={handleSubmit}>
                      <button
                        type="submit"
                        className="bg-[#45C74D] p-2 text-white rounded-lg"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewMentor;

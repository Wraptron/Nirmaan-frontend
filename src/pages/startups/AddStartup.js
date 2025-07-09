import React, { useState, useEffect } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import Step1 from "./step/Step1";
import Step2 from "./step/Step2";
import Step3 from "./step/Step3";
import Step4 from "./step/Step4";
import exclamtionsvg from '../../assets/images/Frame (14).svg';
import exclamationsvgblack from '../../assets/images/Frame (18).svg';
import settingsvgwhite from '../../assets/images/Frame (15).svg';
import settingsvgblack from '../../assets/images/Frame (19).svg';
import foundersvgwhite from '../../assets/images/Frame (16).svg';
import foundersvgblack from '../../assets/images/Frame (20).svg';
import messagesvgwhite from '../../assets/images/Frame (17).svg';
import messagesvgblack from '../../assets/images/Frame (21).svg';
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from 'react-router-dom';

function AddStartup() {
    const [formData, setFormData] = useState({
        basic: {
            startup_name: '',
            startup_sector: '',
            startup_type: '',
            startup_industry: '',
            startup_technology: '',
            startup_cohort: '',
            startup_yog: '',
            graduated_to: '',
            program: '',
            startup_Community: ''
        },
        official: {
            official_contact_number: '',
            official_email_address: '',
            website_link: '',
            linkedin_id: '',
            mentor_associated: '',
            role_of_faculty: '',
            cin_registration_number: '',
            dpiit_number: '',
            funding_stage: '',
            official_registered: '',
            pia_state: '',
            scheme: '',
            password: ''
        },
        founder: {
            founder_name: '',
            founder_email: '',
            founder_number: '',
            founder_gender: '',
            founder_student_id: '',
            linkedInid: '',
            academic_background: ''
        },
        description: {
            logo_image: '',
            startup_description: ''
        }
    });

    const handleChange = (e, section) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [name]: value
            }
        }));
    };

    const [steps, setSteps] = useState(0);
    const [showw, setShoww] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setShoww(true);
    }, []);

    const validateStep = () => {
        let requiredFields = [];

        if (steps === 0) {
            requiredFields = ['startup_name', 'startup_sector', 'startup_type', 'startup_industry', 'startup_technology', 'startup_Community', 'startup_cohort',  'graduated_to', 'program'];
            for (let field of requiredFields) {
                if (!formData.basic[field]) {
                    toast.error(`Please fill ${field.replaceAll('_', ' ')}`);
                    return false;
                }
            }
        }

        if (steps === 1) {
            requiredFields = ['official_contact_number', 'official_email_address', 'website_link', 'linkedin_id', 'mentor_associated', 'role_of_faculty', 'cin_registration_number', 'dpiit_number', 'funding_stage', 'official_registered', 'pia_state', 'scheme']

            for (let field of requiredFields) {
                if (!formData.official[field]) {
                    toast.error(`Please fill ${field.replaceAll('_', ' ')}`);
                    return false;
                }
            }
        }

        if (steps === 2) {
            requiredFields = ['founder_name', 'founder_email', 'founder_number'];
            for (let field of requiredFields) {
                if (!formData.founder[field]) {
                    toast.error(`Please fill ${field.replaceAll('_', ' ')}`);
                    return false;
                }
            }
        }

        if (steps === 3) {
            requiredFields = ['startup_description'];
            for (let field of requiredFields) {
                if (!formData.description[field]) {
                    toast.error(`Please fill ${field.replaceAll('_', ' ')}`);
                    return false;
                }
            }
        }

        return true;
    };

    const handlestepsincrement = (e) => {
        e.preventDefault();
        if (validateStep()) {
            setSteps(steps + 1);
        }
    };

    const handlestepsdecrement = (e) => {
        e.preventDefault();
        setSteps(steps - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep()) return;

        try {
            // 1. Add startup
            const result = await axios.post('http://localhost:3003/api/v1/add-startup', formData, {
                headers: {
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }
            });

            if (result.data?.status?.status === "data already exists") {
                toast.error('Startup already exists');
            } else {
                if (result.data?.result?.role === '5') {
                    navigate(`/startupprofile/${result.data.result.id}`);
                }

                Swal.fire({
                    icon: "success",
                    title: "Startup added successfully!",
                    timer: 1500
                });
                navigate('/startups');
            }
        } catch (err) {
            const backendMsg = err?.response?.data?.error || "Server Error: Something went wrong. Please try again.";
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: backendMsg
            });
        }
    };

    return (
        <div className="flex">
            <div>
                <SideBar />
            </div>
            <div className="ms-[221px] flex-grow">
                <div>
                    <NavBar />
                </div>
                <div className="bg-gray-100">
                    <div className={`mx-10 py-5  content ${showw ? "visible" : ""}`}>
                        <div className="bg-white">
                            <div className="p-3">
                                <div className="text-sm text-[#808080]">Dashboard {'>'} Start-ups {'>'} Add New Start-up</div>
                                <div className="flex mt-4">
                                    <div className="text-lg">Add New Start-up</div>
                                </div>
                                <div className="mt-4">Stage <span className="text-red-600">*</span></div>
                                <div className="mt-2">
                                    <select
                                        name="program"
                                        value={formData.basic.program}
                                        onChange={(e) => handleChange(e, 'basic')}
                                        className="border p-2 rounded"
                                        required
                                    >
                                        <option value="">Select Stage</option>
                                        <option value="Pratham">Pratham</option>
                                        <option value="Akshar">Akshar</option>
                                        <option value="Graduated">Graduated</option>
                                    </select>
                                </div>

                                {/* Step Indicators */}
                                <div className="grid grid-cols-4 mt-10 mx-7">
                                    {[
                                        { icon: exclamtionsvg, iconAlt: exclamationsvgblack, label: "Basic" },
                                        { icon: settingsvgwhite, iconAlt: settingsvgblack, label: "Official" },
                                        { icon: foundersvgwhite, iconAlt: foundersvgblack, label: "Founder" },
                                        { icon: messagesvgwhite, iconAlt: messagesvgblack, label: "Description" },
                                    ].map((step, index) => (
                                        <div key={index} className={`${steps === index ? 'bg-[#45C74D]' : 'bg-[#D8F3D9]'} text-white flex justify-center items-center text-lg gap-2 md:py-2`}
                                            style={{ clipPath: index === 0 ? "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)" : index === 3 ? "polygon(100% 0%, 100% 49%, 100% 100%, 0% 100%, 9% 50%, 0% 0%)" : "polygon(89% 0%, 100% 50%, 89% 100%, 0% 100%, 9% 50%, 0% 0%)" }}>
                                            <span>
                                                <img src={steps === index ? step.icon : step.iconAlt} alt={step.label} />
                                            </span>
                                            <span className={`my-2 text-lg ${steps === index ? 'text-white' : 'text-black'}`}>{step.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Step Form */}
                                {steps === 0 && <Step1 formData={formData.basic} handleChange={(e) => handleChange(e, 'basic')} />}
                                {steps === 1 && <Step2 formData={formData.official} handleChange={(e) => handleChange(e, 'official')} />}
                                {steps === 2 && <Step3 formData={formData.founder} handleChange={(e) => handleChange(e, 'founder')} />}
                                {steps === 3 && <Step4 formData={formData.description} handleChange={(e) => handleChange(e, 'description')} />}

                                {/* Navigation Buttons */}
                                <div className="flex justify-center items-center mt-3 gap-5">
                                    {steps > 0 && (
                                        <button className="border-[#45c74d] border p-2 rounded-lg text-[#45c74d] font-semibold" onClick={handlestepsdecrement}>Back</button>
                                    )}
                                    {steps === 3 ? (
                                        <button className="bg-[#45c74d] p-2 rounded-lg text-white font-semibold" onClick={handleSubmit}>Submit</button>
                                    ) : (
                                        <button className="bg-[#45c74d] p-2 rounded-lg text-white font-semibold" onClick={handlestepsincrement}>Next</button>
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

export default AddStartup;

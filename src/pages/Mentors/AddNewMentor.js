import React, { useState, useEffect } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import { FaGear, FaMessage } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa";
import Step1 from "./Step/Step1";
import Step2 from "./Step/Step2";
import Step3 from "./Step/Step3";
import axios from "axios";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ApiAddNewMentor } from "../../API/API";
import backarrow from '../../assets/images/Frame (1).svg';
import messagesvg from '../../assets/images/Frame (2).svg';
import messagesvgblack from '../../assets/images/Frame (22).svg';
import settingsvg from '../../assets/images/Frame (3).svg';
import professionalsvgblack from '../../assets/images/Frame (24).svg';
import professionalsvg from '../../assets/images/Frame (4).svg';
import settingsvgblack from '../../assets/images/Frame (25).svg';
import exclamtionwhite from '../../assets/images/Frame (26).svg';
import settingsvgwhite from '../../assets/images/Frame (27).svg';
// import toast from "react-hot-toast/headless";
import toast from 'react-hot-toast';
function AddNewMentor() {
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        description: {
            mentor_name: '',
            choose_logo: '',
            mentor_description: ''
        },
        professional: {
            years_of_experience: null,
            area_of_expertise: '',
            current_designation: '',
            institution: '',
            qualification: '',
            year_of_passing_out: null,
            startup_associated: ''
        },
        contact: {
            contact_number: '',
            email_address: '',
            linkedIn_ID: '',
            password: ''
        }
    });
    console.log(formData);
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
    }, [])
    const [nextt, setNextt] = useState(0)
    const handleNext = (e) => {
          e.preventDefault();
          setNextt(nextt + 1);
    }
    let handleBack = (e) => {
        e.preventDefault();
        setNextt(nextt - 1);
    }
    console.log(formData);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page reload
        // Your submission logic here
      };
    return (
        <div className="flex">
            <div>
                <SideBar />
            </div>
            <div className="ms-[221px] flex-grow">
                <NavBar />
                <div className="bg-gray-100">
                        <div className={`mx-10 py-5  content ${showw ? "visible": ""}`}>
                            <div className="bg-white rounded-sm px-10 py-10">
                                    <div className="flex text-sm text-[#808080]">Dashboard {'>'} Mentor {'>'} Add New Mentor</div>
                                    <div className="text-lg font-semibold pt-2 flex gap-3">
                                        <span><img src={backarrow} className="w-[90%]"/></span>
                                        <span className="">Add New Mentor</span>
                                    </div>
                                    <div className="grid grid-cols-3 mt-2">
                                            <div className={`flex justify-center items-center border bg-[#45C74D] p-3 py-5 ${nextt==0 && 'bg-[#45C74D]' || 'bg-[#D8F3D9]'}`} style={{clipPath: "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)",}}>
                                                    <div><img src={`${nextt==0 && messagesvg || messagesvgblack}`} className="w-[80%]"/></div>
                                                    <div className={`text-black text-lg ${nextt == 0 && 'text-white'}`}>Description</div>
                                            </div> 
                                            <div className={`flex justify-center items-center border bg-[#45C74D] p-3 py-5 ${nextt==1 && 'bg-[#45C74D]' || 'bg-[#D8F3D9]'}`} style={{clipPath: "polygon(89% 0%, 100% 50%, 89% 100%, 0% 100%, 9% 50%, 0% 0%)",}}>
                                                <div><img src={`${nextt==1 && exclamtionwhite || professionalsvgblack}`} className="w-[80%]" alt=''/></div>
                                                <div className={`text-black text-lg ${nextt == 1 && 'text-white'}`}>Professional</div>
                                            </div>
                                            <div className={`flex justify-center items-center border bg-[#45C74D] p-3 py-5 ${nextt==2 && 'bg-[#45C74D]' || 'bg-[#D8F3D9]'}`} style={{clipPath: "polygon(100% 0%, 100% 49%, 100% 100%, 0% 100%, 9% 50%, 0% 0%)",}}>
                                                    <div><img src={`${nextt==2 && settingsvgwhite || settingsvg}`} className="w-[80%]" alt=''/></div>
                                                    <div className={`text-lg text-lg ${nextt == 2 && 'text-white'}`}>Contact</div>
                                            </div>  
                                    </div>
                                    <div className="mt-7">
                                        {nextt == 0 && <Step1 formData={formData.description} handleChange={(e) => handleChange(e, 'description')}/>}
                                        {nextt == 1 && <Step2 formData={formData.professional} handleChange={(e) => handleChange(e, 'professional')}/>}
                                        {nextt == 2 && <Step3 formData={formData.contact} handleChange={(e) => handleChange(e, 'contact')}/>}
                                        <div className="flex justify-center item-center mt-7 gap-4">
                                            {nextt == 1 && <button className={`bg-[#45C74D] p-2 text-white rounded-lg`} onClick={handleBack}>Back</button>}
                                            {nextt == 2 && <button className={`bg-[#45C74D] p-2 text-white rounded-lg`} onClick={handleBack}>Back</button>}
                                            <button className={`bg-[#45C74D] p-2 text-white rounded-lg ${nextt == 2 && 'hidden'}`} onClick={handleNext}>Next</button>
                                            {nextt === 2 && (<form onSubmit={handleSubmit}><button type="submit"className="bg-[#45C74D] p-2 text-white rounded-lg">Submit</button></form>)} 
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

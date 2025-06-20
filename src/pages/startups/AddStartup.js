import React, {useState, useEffect} from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import {AddTeams} from "../../API/API";
import AddStartupMultiForm from "./AddStartupMultiForm";
import exclamtionsvg from '../../assets/images/Frame (14).svg';
import exclamationsvgblack from '../../assets/images/Frame (18).svg';
import settingsvgwhite from '../../assets/images/Frame (15).svg';
import settingsvgblack from '../../assets/images/Frame (19).svg';
import foundersvgwhite from '../../assets/images/Frame (16).svg';
import foundersvgblack from '../../assets/images/Frame (20).svg';
import messagesvgwhite from '../../assets/images/Frame (17).svg';
import messagesvgblack from '../../assets/images/Frame (21).svg';
import Step1 from "./step/Step1";
import Step2 from "./step/Step2";
import Step3 from "./step/Step3";
import Step4 from "./step/Step4";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useNavigate } from 'react-router-dom';

function AddStartup() {
    let startups = new FormData();
    const [formData, setFormData] = useState({
        basic: {
         startup_name: '',
         startup_sector: '',
         startup_type: '',
         startup_industry: '',
         startup_technology: '',
         startup_cohort: '',
         startup_yog:'',
         graduated_to: '',
         program: '',
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
         linkedInid: ''
       },
       description: {
         logo_image: '',
         startup_description: ''
       }
     });
  const handleChange = (e, section) => {
    const {name, value} = e.target;
    setFormData((prevData)=>({  
        ...prevData,
        [section]: {
            ...prevData[section],
            [name]: value        },
    })) 
  }
  const handleClick = async (e) =>{
      e.preventDefault();
      try
      {
        // const API = await AddTeams(getData);
        console.log("Hello");
      }
      catch(err)
      {
        console.error("An error occurred:", err);
      }
  }
    const [showw, setShoww] = useState(false);
    useEffect(() => {
        setShoww(true);
    }, [])
    const[steps, setsteps] = useState(0);
    const handlestepsincrement = (e) => {
            e.preventDefault();
            setsteps(steps + 1);
    }
    const handlestepsdecrement = (e) => {
        e.preventDefault();
        setsteps(steps - 1);
    }
    const navigate = useNavigate();
    let handleSubmit = async(e) => {
    e.preventDefault();
    try {
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
            Swal.fire({
                icon: "success",
                title: "Startup added successfully!",
                timer: 1500
            });
            navigate('/startups');
        }
    } catch (err) {
        console.error("Error in handleSubmit:", err);

        const status = err?.response?.status;

        if (status === 400) {
            Swal.fire({
                icon: "error",
                title: "Please fill necessary data",
                timer: 1500
            });
        } else if (status === 409) {
            Swal.fire({
                icon: "warning",
                title: "Startup already exists",
                text: err.response.data?.error || "Duplicate entry"
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Something went wrong. Please try again."
            });
        }
    }
} 
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
                              <div className={`mx-10 py-5  content ${showw ? "visible": ""}`}>
                                    <div className="bg-white">
                                            <div className="p-3">
                                                  <div className="text-sm text-[#808080]">Dashboard {'>'} Start-ups {'>'} Add New Start-up</div>
                                                  <div className="flex mt-4">
                                                        {/* <div><img src={exclamtionsvg} /></div> */}
                                                        <div className="text-lg">Add New Start-up</div>
                                                  </div> 
                                                  {/* <div className="mt-4">Program <span className="text-red-600">*</span></div>
                                                  <div className="mt-2"><input type="text" className="block w-[50%] p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="Select Program"/></div> */}
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
                                                  <div className="grid grid-cols-4 mt-10 mx-7">
                                                          <div className={`${steps==0 && 'bg-[#45C74D]' || 'bg-[#D8F3D9]'}  text-white flex justify-center items-center text-lg gap-2 md:py-2`} style={{clipPath: "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)",}}>
                                                                <span><img src={`${steps==0 && exclamtionsvg || exclamationsvgblack}`} class /></span>
                                                                <span className={`my-2 text-lg ${steps==0 && 'text-white'} text-black`}>Basic</span > 
                                                           </div>
                                                          <div className={`${steps==1 && 'bg-[#45C74D]' || 'bg-[#D8F3D9]'}  text-white flex justify-center items-center text-lg gap-2 md:py-2`} style={{clipPath: "polygon(89% 0%, 100% 50%, 89% 100%, 0% 100%, 9% 50%, 0% 0%)",}}>
                                                                <span><img src={`${steps==1 && settingsvgwhite || settingsvgblack}`} /></span>
                                                                <span className={`my-2 text-lg ${steps==1 && 'text-white'} text-black`}>Official</span >
                                                          </div>
                                                          <div className={`${steps==2 && 'bg-[#45C74D]' || 'bg-[#D8F3D9]'} text-white flex justify-center items-center text-lg gap-2 md:py-2`} style={{clipPath: "polygon(89% 0%, 100% 50%, 89% 100%, 0% 100%, 9% 50%, 0% 0%)",}}>
                                                                <span><img src={`${steps==2 && foundersvgwhite || foundersvgblack}`} /></span>
                                                                <span className={`my-2 text-lg ${steps==2 && 'text-white'} text-black`}>Founder</span >
                                                          </div>
                                                          <div className={`${steps==3 && 'bg-[#45C74D]' || 'bg-[#D8F3D9]'} text-white flex justify-center items-center text-lg gap-2 md:py-2`} style={{clipPath: "polygon(100% 0%, 100% 49%, 100% 100%, 0% 100%, 9% 50%, 0% 0%)",}}>
                                                                <span><img src={`${steps==3 && messagesvgwhite || messagesvgblack}`} /></span>
                                                                <span className={`my-2 text-lg ${steps==3 && 'text-white'} text-black`}>Description</span >
                                                          </div>
                                                  </div>
                                                  {steps == 0 && (
                                                    <Step1 formData={formData.basic} handleChange={(e) => handleChange(e, 'basic')}/>
                                                  )}
                                                  {steps == 1 && (
                                                    <Step2 formData={formData.official} handleChange={(e) => handleChange(e, 'official')}/>
                                                  )}
                                                  {steps == 2 && (
                                                    <Step3 formData={formData.founder} handleChange={(e) => handleChange(e, 'founder')}/>
                                                  )}
                                                  {steps == 3 && (
                                                    <Step4 formData={formData.description} handleChange={(e) => handleChange(e, 'description')}/>
                                                  )}
                                                  <div className="flex justify-center items-center mt-3 gap-5">
                                                      {steps == 1 && <button className="border-[#45c74d] border p-2 rounded-lg text-[#45c74d] font-semibold" onClick={handlestepsdecrement}>Back</button>}
                                                      {steps == 2 && <button className="border-[#45c74d] border p-2 rounded-lg text-[#45c74d] font-semibold" onClick={handlestepsdecrement}>Back</button>}
                                                      {steps == 3 && <button className="border-[#45c74d] border p-2 rounded-lg text-[#45c74d] font-semibold" onClick={handlestepsdecrement}>Back</button>}
                                                      {steps == 3 && <button className="bg-[#45c74d] p-2 rounded-lg text-white font-semibold" onClick={handleSubmit}>Submit</button>}
                                                      <button  className={`bg-[#45c74d] p-2 rounded-lg text-white font-semibold ${steps==3 && 'hidden'}`} onClick={handlestepsincrement}>Next</button>
                                                  </div>
                                            </div>
                                    </div>
                              </div>
                        </div>
          </div>
    </div>
  )
}
export default AddStartup;
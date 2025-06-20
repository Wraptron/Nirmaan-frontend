import React, {useState, useEffect} from "react";
import { ApiFetchMentor, ApiDeletMentorData } from "../../../API/API";

const Step2 = ({formData, handleChange}) => {
  const [data, setData] = useState([]);
  const FetchData = async() => {
    try {
        const API = await ApiFetchMentor();
        setData(API.STATUS.rows);
        //console.log(API.STATUS.rows);
    }
    catch(err)
    {
        console.log(err);
    }
}
useEffect(() =>{
  FetchData();
  setData()
},[])

function generatePassword() {
      var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
          retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      return retVal;
}
useEffect(() => {
  generatePassword()
})
  return (
    <div className="grid grid-cols-2 gap-5 mt-9 px-7">
          <div>
              <div>Official Contact Number</div>
              <div className="mt-1 flex">
                <span className="absolute px-[10px] my-[10px] text-sm border border-r-1 border-l-0 border-t-0 border-b-0 border-gray-300 focus:ring-[#45C74D] focus:border-[#45C74D] text-gray-900">+91</span>
                <input type="text" onChange={handleChange} name="official_contact_number" value={formData.official_contact_number} className="block w-full p-2 ps-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="xxxxx xxxxx"/>
              </div>
          </div>
          <div>
              <div>Official Email Address</div>
              <div className="mt-1"><input type="text" onChange={handleChange} name="official_email_address" value={formData.official_email_address}  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="Enter official email address"/></div>
          </div>
          <div>
              <div>Website Link</div>
              <div className="mt-1"><input type="text" onChange={handleChange} name="website_link" value={formData.website_link}  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"/></div>
          </div>
          <div>
              <div>LinkedIn ID</div>
              <div className="mt-1"><input type="text" onChange={handleChange} name="linkedin_id" value={formData.linkedin_id}  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"/></div>
          </div>
          <div>
              <div>Mentor Associated</div>
              <div className="mt-1"><input type="text" onChange={handleChange} name="mentor_associated" value={formData.mentor_associated}  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="Select Mentor associated"/></div>
          </div>
          <div>
              <div>Role of Faculty</div>
              <div className="mt-1">
                  <select onChange={handleChange} name="role_of_faculty" value={formData.role_of_faculty}  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]" placeholder="Select Mentor associated">
                        <option>Advisor/ Mentor</option>
                        <option>Co-Founder</option>
                  </select>
               </div>
          </div>
          <div>
              <div>CIN/Registration Number</div>
              <div className="mt-1"><input type="text" onChange={handleChange} name="cin_registration_number" value={formData.cin_registration_number}  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"/></div>
          </div>
          <div>
              <div>DPIIT Number</div>
              <div className="mt-1"><input type="text" onChange={handleChange} name="dpiit_number" value={formData.dpiit_number}  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"/></div>
          </div>
          <div>
              <div>Current Funding Stage</div>
              <div className="mt-1">
                <select onChange={handleChange} name="funding_stage" value={formData.funding_stage} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]">
                    <option>Pre-Seed</option>
                    <option>Seed</option>
                    <option>Pre-Series A</option>
                    <option>Series A</option>
                </select>
              </div>
          </div>
          <div>
              <div>Official registered As</div>
              <div className="mt-1"><input type="text" onChange={handleChange} name="official_registered" value={formData.official_registered}  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"/></div>
          </div>
          <div>
              <div>PIA</div>
              <div className="mt-1"><input type="text" onChange={handleChange} name="pia_state" value={formData.pia_state}  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"/></div>
          </div>
          <div>
              <div>Scheme</div>
              <div className="mt-1">
                <select onChange={handleChange} name="scheme" value={formData.scheme}  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]">
                    <option>Pratham</option>
                    <option>Akshar</option>
                    <option>Graduated</option>
                </select>
              </div>
          </div>
    </div>
  );
};

export default Step2;

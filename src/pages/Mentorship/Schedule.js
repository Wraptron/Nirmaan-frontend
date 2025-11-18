
// import React, {useEffect, useState} from "react";
// function Schedule({isVisible, onClose, children})
// {
//     const handleClose = (e) => {
//         if(e.target.id === 'wrapper') onClose();
//     }
//     const [isAnimating, setIsAnimating] = useState(false);

//     useEffect(()=>{
//         if(isVisible)
//         {
//                 setIsAnimating(true);
//         }
//         else{
//             const timer = setTimeout(()=> setIsAnimating(false), 200);
//             return () => clearTimeout(timer);
//         }
//     }, [isVisible])

//     if (!isAnimating && !isVisible) {
//         return null;
//     }
//     return(
//         <div className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-xs flex justify-center items-center border-md ${isVisible ? 'animate-show' : 'animate-hide'}`}  id="wrapper" onClick={handleClose}>
//             <div className="w-[700px]">
//                 {/* <button className="text-white text-xl place-self-end justify-end" onClick={()=>onClose()}>X</button> */}
//                 <div className="bg-white p-4 rounded">
//                       {children}
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Schedule;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/sidebar";
import mentorsvg from "../../assets/images/Frame (11).svg";
import { ApiFetchMentor, ApiFetchStartup, ApiScheduleMeeting } from "../../API/API";

function Schedule() {
  const [startupname, setStartupName] = useState([]);
  const [mentorname, setMentorName] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [meetingdata, setMeetingdata] = useState({
    startup_name: "",
    startup_id: "",
    founder_name: "",
    mentor_name:"",
    meeting_mode: "Virtual",
    meeting_link: "",
    meeting_location: "",
    participants: "",
    date: "",
    time: "",
    meeting_duration: "",
    meeting_agenda: "",
  });
  const { mentor_id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // startup_name dropdown options
      const response = await ApiFetchStartup();
      const startupnames = response.rows.map((item) => ({
        id: item.startup_id,
        startup_name: item.startup_name,
      }));
      setStartupName(startupnames);

        const API = await ApiFetchMentor();
        const sortedData = API.STATUS?.rows || [];
      setMentorName(sortedData.map(row => row.mentor_name));
    } catch (err) {
      console.log(err);
    }
  };
  
  
  useEffect(() => {
    fetchData();
  }, [mentor_id]);

  const durationOptions = ["30 mins", "1 hour", "2 hour"];

  const filteredStartups = startupname
    .filter((startup) =>
      startup.startup_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.startup_name.localeCompare(b.startup_name));

  const handleSelect = (startup) => {
    setMeetingdata((prev) => {
      const updated = {
        ...prev,
        startup_name: startup.startup_name,
        startup_id: startup.id,
      };
      return updated;
    });
    setSearchTerm(startup.startup_name);
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startup_name") {
      setSearchTerm(value);
      setShowDropdown(true);
      setMeetingdata((prev) => {
        const updated = {
          ...prev,
          startup_name: value,
          startup_id: "",
        };
        return updated;
      });
    } else {
      setMeetingdata((prev) => {
        const updated = { ...prev, [name]: value };
        return updated;
      });
    }
  };


  // const handleReset = () => {
  //   setMeetingdata({
  //     start_up_name: "",
  //     founder_name: "",
  //     meeting_mode: "",
  //     meeting_link: "",
  //     meeting_location: "",
  //     participants: "",
  //     date: "",
  //     time: "",
  //     meeting_duration: "",
  //     meeting_agenda: "",
  //   });
  // };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="ml-[221px] flex-1 flex flex-col">
        <NavBar />
        <div className="mx-10 py-5 ">
          <div className="bg-white rounded-sm px-10 py-10">
            {/* Breadcrumb */}
            <div className="text-sm text-[#808080]">
              Dashboard {">"} Mentorship {">"} Schedule Session
            </div>

            {/* Heading */}
            <div className="text-lg font-semibold pt-2 flex gap-3 items-center">
              <a href="/mentorship">
                <img src={mentorsvg} alt="Back" />
              </a>
              <div className="text-lg font-semibold">Schedule New Meeting</div>
            </div>

            {/* Form */}
            <form >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* Start-up Name */}
                <div>
                  <label className="block font-medium mb-1">
                    Start-up Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Select Startup Name"
                    value={searchTerm}
                    onFocus={() => setShowDropdown(true)}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowDropdown(true);
                    }}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                  />

                  {showDropdown && filteredStartups.length > 0 && (
                    <ul className="absolute w-[27rem] p-2 text-sm text-gray-900 border border-gray-300 max-h-48 overflow-y-auto rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]">
                      {filteredStartups.map((startup) => (
                        <li
                          key={startup.id}
                          onMouseDown={() => handleSelect(startup)}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          {startup.startup_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Founder/Team Member Name */}
                <div>
                  <label className="block font-medium mb-1">
                    Founder/Team Member Name{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="founder_name"
                    value={meetingdata.founder_name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                  />
                </div>


                <div>
                  <label className="block font-medium mb-1">
                    Mentor Name{" "}
                    <span className="text-red-500">*</span>
                  </label>
                   <select 
                    name="mentor_name"
                    value={meetingdata.mentor_name}
                    onChange={handleChange}
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                  >
                    <option >Select Mentor Name</option>
                    {mentorname.map((item, index) => (
                     <option key={index} value={item}>
                            {item}
                     </option>
                    ))}
                  </select>
                </div>

                {/* Meeting Mode */}
                <div>
                  <label className="block font-medium mb-1">
                    Meeting Mode <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="meeting_mode"
                        value="Virtual"
                        onChange={handleChange}
                        checked={meetingdata.meeting_mode === "Virtual"}
                        className="mr-2"
                      />
                      Virtual (Online)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="meeting_mode"
                        value="In Person"
                        onChange={handleChange}
                        checked={meetingdata.meeting_mode === "In Person"}
                        className="mr-2"
                      />
                      In Person (Offline)
                    </label>
                  </div>
                </div>

                {/* Conditional: Meeting Link OR Location */}
                <div>
                  {meetingdata.meeting_mode === "Virtual" ? (
                    <>
                      <label className="block font-medium mb-1">
                        Meeting Link <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="meeting_link"
                        value={meetingdata.meeting_link}
                        onChange={handleChange}
                        placeholder="Enter virtual meeting link"
                        className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                      />
                    </>
                  ) : (
                    <>
                      <label className="block font-medium mb-1">
                        Meeting Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="meeting_location"
                        value={meetingdata.meeting_location}
                        onChange={handleChange}
                        placeholder="Enter meeting location"
                        className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                      />
                    </>
                  )}
                </div>

                {/* Participants */}
                <div>
                  <label className="block font-medium mb-1">Participants</label>
                  <input
                    type="number"
                    name="participants"
                    value={meetingdata.participants}
                    onChange={handleChange}
                    placeholder="Enter Number of Participants"
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                  />
                </div>

                {/* Date */}
                <div className="flex gap-6">
                <div className="w-1/2">
                  <label className="block font-medium mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={meetingdata.date}
                    onChange={handleChange}
                    className=" w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                  />
                </div>

                {/* Time */}
                <div className="w-1/2">
                  <label className="block font-medium mb-1">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={meetingdata.time}
                    onChange={handleChange}
                    className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                  />
                </div>
                </div>

                {/* Meeting Duration */}
                <div>
                  <label className="block font-medium mb-1">
                    Meeting Duration <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                    name="meeting_duration"
                    value={meetingdata.meeting_duration}
                    onChange={handleChange}
                  >
                    <option value="">Select Meeting Durations</option>
                    {durationOptions.map((durations, index) => (
                      <option key={index} value={durations}>
                        {durations}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Meeting Agenda */}
              <div>
                <label className="block font-medium mb-1">Meeting Agenda</label>
                <textarea
                  rows="4"
                  name="meeting_agenda"
                  value={meetingdata.meeting_agenda}
                  onChange={handleChange}
                  placeholder="Type agenda..."
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-between pt-4">
                <button
                  type="reset"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded"
                  // onClick={handleReset}
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#45C74D] text-white rounded"
                >
                  Schedule Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;

import React, { useState, useEffect } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEllipsis } from "react-icons/fa6";

// If image is in `public/assets/images/Frame (4).svg`, use:
const mentorImage = "/assets/images/Frame (4).svg";

function MentorShip() {
  const [openPopUp, setOpenpopup] = useState(false);
  const [startupsData, setStartupsData] = useState([]);
  const [mentorData, setMentorData] = useState([]);
  const [showw, setShoww] = useState(false);
  const [formData, setFormData] = useState({
    select_startup: "",
    select_mentor: "",
    schedule_date: "",
    schedule_time: "",
    description: "",
  });

  const StartupsData = async () => {
    try {
      const result = await axios.get("http://localhost:3003/api/v1/fetch-startup");
      setStartupsData(result.data.rows || []);
    } catch (err) {
      console.log(err);
    }
  };

  const MentorData = async () => {
    try {
      const result = await axios.get("http://localhost:3003/api/v1/get-mentor-details");
      setMentorData(result.data.STATUS.rows || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const ScheduleButton = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3003/api/v1/schedule-meeting", formData);
      if (result) {
        toast.success("Meeting Scheduled successfully");
        setFormData({
          select_startup: "",
          select_mentor: "",
          schedule_date: "",
          schedule_time: "",
          description: "",
        });
        setOpenpopup(false);
      }
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        toast.error("Please fill the required fields");
      } else if (err.response?.status === 500) {
        toast.error("Unknown error occurred");
      }
    }
  };

  useEffect(() => {
    StartupsData();
    MentorData();
    setShoww(true);
  }, []);

  const dummyMeetings = [
    {
      status: "Completed",
      time: "HH:MM:SS",
      mentor: "Mentor Name",
      startup: "Start-up name",
      date: "MM/DD/YYYY",
      hour: "HH:MM",
    },
    // Add more items as needed
  ];

  return (
    <div className="flex">
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <NavBar />
        <div className="bg-gray-100 min-h-screen">
          <div className={`mx-10 py-5 ${showw ? "visible" : "invisible"}`}>
            <div className="bg-white rounded-lg shadow-sm">
              <div className="flex gap-2 text-sm p-3 text-[#808080]">
                <div>Dashboard</div>
                <div>{">"}</div>
                <div>Mentorship</div>
              </div>
              <div className="mt-1 text-xl px-3 font-semibold">Mentorship</div>

              <div className="grid grid-cols-2 gap-4 px-3 py-3">
                <input
                  type="text"
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="Search..."
                />
                <div className="flex gap-5 justify-end">
                  <button className="border border-[#45C74D] rounded-lg p-2 text-sm">
                    Request Mentor
                  </button>
                  <button
                    className="border bg-[#45C74D] rounded-lg p-2 text-sm text-white"
                    onClick={() => setOpenpopup(true)}
                  >
                    Schedule Meeting
                  </button>
                </div>
              </div>

              {/* Meeting Cards */}
              <div className="grid grid-cols-3 gap-10 px-3 mt-4 pb-4">
                {dummyMeetings.map((meeting, index) => (
                  <div key={index} className="border rounded-md shadow-md bg-white">
                    <div className="flex justify-between p-3">
                      <div className="bg-[#D8F3D9] text-[#45C74D] text-xs px-2 rounded-lg">
                        {meeting.status}
                      </div>
                      <FaEllipsis />
                    </div>

                    <div className="flex justify-between text-sm px-3 mt-3">
                      <img src={mentorImage} alt="Mentor" className="w-10 h-10" />
                      <div className="text-[#45C74D] font-semibold">{meeting.time}</div>
                    </div>

                    <div className="flex justify-between border-t px-3 mt-5 mb-3 pb-2">
                      <div>
                        <div className="text-lg font-semibold">{meeting.mentor}</div>
                        <div className="text-[#808080]">{meeting.startup}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs">{meeting.date}</div>
                        <div className="text-xs">{meeting.hour}</div>
                      </div>
                    </div>

                    <div className="pb-2">
                      <div className="text-[#808080] px-3">Feedback</div>
                      <div className="flex items-center px-[6px]">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-yellow-300 ms-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pop-up Form (if needed) */}
            {openPopUp && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                  <h2 className="text-lg font-semibold mb-4">Schedule Meeting</h2>
                  <form onSubmit={ScheduleButton} className="space-y-4">
                    <select
                      name="select_startup"
                      value={formData.select_startup}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    >
                      <option value="">Select Startup</option>
                      {startupsData.map((startup, i) => (
                        <option key={i} value={startup.email}>
                          {startup.startup_name || startup.email}
                        </option>
                      ))}
                    </select>

                    <select
                      name="select_mentor"
                      value={formData.select_mentor}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    >
                      <option value="">Select Mentor</option>
                      {mentorData.map((mentor, i) => (
                        <option key={i} value={mentor.email}>
                          {mentor.name || mentor.email}
                        </option>
                      ))}
                    </select>

                    <input
                      type="date"
                      name="schedule_date"
                      value={formData.schedule_date}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />

                    <input
                      type="time"
                      name="schedule_time"
                      value={formData.schedule_time}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Description"
                      className="w-full border p-2 rounded"
                    ></textarea>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setOpenpopup(false)}
                        className="px-4 py-2 border rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#45C74D] text-white rounded"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorShip;

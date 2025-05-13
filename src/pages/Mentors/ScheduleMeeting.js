import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/sidebar";
import mentorsvg from "../../assets/images/Frame (11).svg";
import { ApiScheduleMeeting } from "../../API/API";

function ScheduleMeeting({ selectedMentorId }) {
  const [meetingdata, setMeetingdata] = useState({
    start_up_name: "",
    founder_name: "",
    meeting_mode: "Virtual",
    meeting_link: "",
    meeting_location: "",
    participants: "",
    date: "",
    time: "",
    meeting_duration: "",
    meeting_agenda: "",
  });
  const { mentor_reference_id } = useParams();

  // Drop down options
  const startupOptions = [
    "Seed Stage Startups",
    "Growth Stage Startups",
    "Enterprise Level",
  ];

  const participantsOptions = ["John Doe", "Dev"];
  const durationOptions = ["30 mins", "1 hour", "2 hour"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      mentor_reference_id: mentor_reference_id,
      ...meetingdata,
      date: new Date(meetingdata.date).toISOString().split("T")[0], // Format date as YYYY-MM-DD
      time: meetingdata.time + ":00",
    };
    console.log(payload);
    try {
      await ApiScheduleMeeting(payload);
      console.log(payload);
      console.log("posted");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleReset = () => {
    setMeetingdata({
      start_up_name: "",
      founder_name: "",
      meeting_mode: "",
      meeting_link: "",
      meeting_location: "",
      participants: "",
      date: "",
      time: "",
      meeting_duration: "",
      meeting_agenda: "",
    });
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="ml-[221px] flex-1 flex flex-col">
        <NavBar />
        <div className="mx-10 py-5 ">
          <div className="bg-white rounded-sm px-10 py-10">
            {/* Breadcrumb */}
            <div className="text-sm text-[#808080]">
              Dashboard {">"} Mentors {">"} Schedule Session
            </div>

            {/* Heading */}
            <div className="text-lg font-semibold pt-2 flex gap-3 items-center">
              <a href="/mentors">
                <img src={mentorsvg} alt="Back" />
              </a>
              <div className="text-lg font-semibold">Schedule New Meeting</div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* Start-up Name */}
                <div>
                  <label className="block font-medium mb-1">
                    Start-up Name *
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    name="start_up_name"
                    value={meetingdata.start_up_name}
                    onChange={handleChange}
                  >
                    <option value="">Select Start-up Name</option>
                    {startupOptions.map((startup, index) => (
                      <option key={index} value={startup}>
                        {startup}
                      </option>
                    ))}
                  </select>
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
                  <select
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                    name="participants"
                    value={meetingdata.participants}
                    onChange={handleChange}
                  >
                    <option value="">Select Participants</option>
                    {participantsOptions.map((participants, index) => (
                      <option key={index} value={participants}>
                        {participants}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block font-medium mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={meetingdata.date}
                    onChange={handleChange}
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block font-medium mb-1">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={meetingdata.time}
                    onChange={handleChange}
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                  />
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
                  onClick={handleReset}
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

export default ScheduleMeeting;

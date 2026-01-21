import React, { useState, useEffect } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEllipsis } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Briefcase, Users } from "lucide-react";
import RequestMentor from "./RequestMentor";
import { ApiFetchScheduleMeetingsDetailsWithMentor } from "../../API/API";

// If image is in `public/assets/images/Frame (4).svg`, use:
const mentorImage = "/assets/images/Frame (4).svg";

function MentorShip() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mentorship, setMentorship] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showw, setShoww] = useState(false);
  const [showrequestmentor, setShowRequestMentor] = useState(false);
  const navigate = useNavigate();

  const handleScheduleClick = () => {
    navigate(`/mentorship/scheduleMeeting`);
  };

  const handleRequestMentorClick = () => setShowRequestMentor(true);
  const handleRequestMentorClose = async () => {
    setShowRequestMentor(false);
  };

  const FetchData = async () => {
    try {
      setLoading(true);
      const response = await ApiFetchScheduleMeetingsDetailsWithMentor();
      setMentorship(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    FetchData();
    setShoww(true);
  }, []);

  const stats = [
    {
      id: 1,
      icon: <GraduationCap className="w-5 h-5" />,
      value: "30,000",
      label: "No. of Abhyasa Sessions Conducted",
      badgeColor: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      icon: <Briefcase className="w-5 h-5" />,
      value: "14,700",
      label: "No. of Venture capitalist Mentors",
      badgeColor: "bg-red-100 text-red-700",
    },
    {
      id: 3,
      icon: <Users className="w-5 h-5" />,
      value: "147",
      label: "IITMEF Mentors",
      badgeColor: "bg-green-100 text-green-700",
    },
  ];

   const filteredmentorship = mentorship.filter((m) =>
     m.mentor_name?.toLowerCase().includes(searchTerm.toLowerCase()),
   );

  const formatDate = (dateString) => {
    if (!dateString) return "--";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
              <div className="w-full py-5">
                <h2 className="text-xl px-3 font-semibold  mb-6 ">
                  Mentorship
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                  {stats.map((item) => (
                    <div
                      key={item.id}
                      className="relative bg-white shadow-md rounded-2xl p-6 flex flex-col"
                    >
                      {/* Floating Icon Badge */}
                      <div
                        className={`absolute -top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center ${item.badgeColor}`}
                      >
                        {item.icon}
                      </div>

                      {/* Number */}
                      <h3 className="text-3xl font-bold mt-4">{item.value}</h3>

                      {/* Label */}
                      <p className="text-sm text-gray-600 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-1 text-xl px-3 font-semibold">
                All Mentorship
              </div>

              <div className="flex flex-wrap items-center justify-between mb-6 mt-6 px-4">
                <div className="relative w-full md:w-1/2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-4 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-[#45C74D] focus:border-[#45C74D]"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <button
                    className="border border-[#45C74D] rounded-lg p-2 text-sm"
                    onClick={handleRequestMentorClick}
                  >
                    Request Mentor
                  </button>
                  <button
                    className="bg-[#45C74D] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    onClick={handleScheduleClick}
                  >
                    Schedule Meeting
                  </button>
                </div>
              </div>

              {/* Meeting Cards */}
              <div className="grid grid-cols-3 gap-10 px-3 mt-4 pb-4">
                {filteredmentorship.map((meeting) => (
                  <div
                    key={meeting.meet_id}
                    className="border rounded-md shadow-md bg-white"
                  >
                    <div className="flex justify-between p-3">
                      <div className="bg-[#D8F3D9] text-[#45C74D] text-xs px-2 rounded-lg">
                        {meeting.status}
                      </div>
                      <FaEllipsis />
                    </div>

                    <div className="flex justify-between text-sm px-3 mt-3">
                      <img
                        src={meeting.mentor_logo}
                        alt="Mentor"
                        className="w-20 h-20"
                      />
                      <div className="text-[#45C74D] font-semibold">
                        {meeting.time}
                      </div>
                    </div>

                    <div className="flex justify-between border-t px-3 mt-5 mb-3 pb-2">
                      <div>
                        <div className="text-lg font-semibold">
                          {meeting.mentor_name}
                        </div>
                        <div className="text-[#808080]">
                          {meeting.start_up_name}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs">
                          {formatDate(meeting.date)}
                        </div>
                        <div className="text-xs">
                          {meeting.meeting_duration}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showrequestmentor && (
        <RequestMentor
          onClose={handleRequestMentorClose}
          // onSubmit={handleAddAwardSubmit}
        />
      )}
    </div>
  );
}

export default MentorShip;

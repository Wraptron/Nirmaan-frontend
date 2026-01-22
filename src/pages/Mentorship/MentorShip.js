import React, { useState, useEffect } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEllipsis } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Briefcase, Users } from "lucide-react";
import RequestMentor from "./RequestMentor";
import {
  ApiDeleteMeeting,
  ApiFetchMeetingFeedback,
  ApiFetchScheduleMeetingsDetailsWithMentor,
} from "../../API/API";
import { FaEllipsisV, FaSpinner } from "react-icons/fa";
import { BsListUl } from "react-icons/bs";
import { MdViewModule } from "react-icons/md";
import FeedbackForm from "../Mentors/FeedbackForm";
import DeleteConfirmation from "../../components/DeleteConfirmation";

// If image is in `public/assets/images/Frame (4).svg`, use:
const mentorImage = "/assets/images/Frame (4).svg";

function MentorShip() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mentorship, setMentorship] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showw, setShoww] = useState(false);
  const [viewMode, setViewMode] = useState("card");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);
  const [showAddFeedbackForm, setShowAddFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [initialFeedback, setInitialFeedback] = useState(null);
  const [showrequestmentor, setShowRequestMentor] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
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

      const feedbackPromises = response.map((meet) =>
        ApiFetchMeetingFeedback(
          selectedSession?.mentor_id || meet.mentor_id,
          meet.startup_id,
        ).then((res) => res || []),
      );
      const allFeedbackArrays = await Promise.all(feedbackPromises);

      const allFeedback = allFeedbackArrays.flat();
      setFeedback(allFeedback);
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

  //FeedBack Form open
  const handleAddFeedbackClick = () => setShowAddFeedbackForm(true);
  const openFeedbackModal = (session) => {
    const currentFeedback = feedback.find(
      (feed) => String(feed.meet_id) === String(session?.meet_id),
    );
    setInitialFeedback(currentFeedback || null);
    setSelectedSession(session);
    handleAddFeedbackClick();
  };

  const handleAddFeedbackClose = () => {
    FetchData();
    setSelectedSession(null);
    setInitialFeedback(null);
    setShowAddFeedbackForm(false);
  };

    const handleDelete = async (id) => {
      try {
        const API = await ApiDeleteMeeting(id);
        if (API) {
          toast.success("Mentorship deleted successfully");
          const updateddata = mentorship.filter((meet) => meet.meet_id !== id);
          setMentorship(updateddata);
          setOpenDropdownId(null);
        } else {
          toast.error("Failed to delete Mentorship.");
        }
      } catch (err) {
        console.error(err);
      }
    };

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

  const formatTime = (timeString) => {
    if (!timeString) return "--";

    // If backend sends ISO datetime
    const date = new Date(timeString);
    if (!isNaN(date)) {
      return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    // If backend sends HH:mm:ss
    return timeString.slice(0, 5);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedMentorship = [...filteredmentorship].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Handle different data types
    if (sortConfig.key === "date" || sortConfig.key === "time") {
      aValue = new Date(aValue || 0).getTime();
      bValue = new Date(bValue || 0).getTime();
    } else {
      aValue = (aValue || "").toString().toLowerCase();
      bValue = (bValue || "").toString().toLowerCase();
    }

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // sort icon component
  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg
          className="w-4 h-4 text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 5l-7 7h14z" />
          <path d="M12 19l7-7H5z" />
        </svg>
      );
    }

    if (sortConfig.direction === "asc") {
      return (
        <svg
          className="w-4 h-4 text-[#45C74D]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 5l-7 7h14z" />
        </svg>
      );
    }

    return (
      <svg
        className="w-4 h-4 text-[#45C74D]"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 19l7-7H5z" />
      </svg>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />

      <div className="ms-[221px] flex flex-col flex-grow overflow-hidden">
        <NavBar />

        {/* Scrollable area */}
        <div className="bg-gray-100 flex-grow overflow-y-auto">
          <div className={`mx-10 py-5 ${showw ? "visible" : "invisible"}`}>
            <div className="bg-white rounded-lg shadow-sm">
              <div className="flex gap-2 text-sm p-3 text-[#808080]">
                <div>Dashboard</div>
                <div>{">"}</div>
                <div>Mentorship</div>
              </div>
              <div className="w-full py-3">
                <h2 className="text-xl px-3 font-semibold  mb-6 ">
                  Mentorship
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                  {stats.map((item) => (
                    <div
                      key={item.id}
                      className="relative bg-white shadow-md rounded-2xl p-3 flex flex-col"
                    >
                      {/* Floating Icon Badge */}
                      <div
                        className={`absolute -top-4 left-4 w-7 h-7 rounded-full flex items-center justify-center ${item.badgeColor}`}
                      >
                        {item.icon}
                      </div>

                      {/* Number */}
                      <h3 className="text-2xl font-bold mt-1">{item.value}</h3>

                      {/* Label */}
                      <p className="text-sm text-gray-600 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-1 text-xl px-3 font-semibold">
                All Mentorship
              </div>

              <div className="flex flex-wrap items-center justify-between mb-3 mt-3 px-4">
                <div className="relative w-full md:w-1/2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-4 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-[#45C74D] focus:border-[#45C74D]"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"></div>
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

                  <div className="flex gap-2 border border-gray-300 rounded-lg p-1 bg-white">
                    <button
                      onClick={() => setViewMode("card")}
                      className={`p-2 rounded transition-all ${
                        viewMode === "card"
                          ? "bg-[#45C74D] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      title="Card View"
                    >
                      <MdViewModule />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded transition-all ${
                        viewMode === "list"
                          ? "bg-[#45C74D] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      title="List View"
                    >
                      <BsListUl />
                    </button>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <FaSpinner className="animate-spin text-4xl text-[#45C74D]" />
                  <span className="ml-3 text-lg">Loading Mentorships...</span>
                </div>
              ) : (
                <>
                  {/* Events Grid */}
                  {viewMode === "card" && (
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
                            {/* Menu Button and Dropdown */}
                            <div className="relative">
                              <button
                                onClick={() =>
                                  setOpenDropdownId(
                                    openDropdownId === meeting.meet_id
                                      ? null
                                      : meeting.meet_id,
                                  )
                                }
                                className="ellipsis-button text-gray-400 hover:text-gray-600 focus:outline-none"
                              >
                                <FaEllipsis/>
                              </button>

                              {openDropdownId === meeting.meet_id && (
                                <div className="dropdown-menu absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-10 text-sm">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenDropdownId(null);
                                      // setSelectedEvent(event);
                                      // handleEventPopupClick();
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                  >
                                    Re-Schedule
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedSession(meeting);
                                      setOpenEstablishPopUp(true);
                                      setOpenDropdownId(null);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
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
                  )}{" "}
                  {viewMode === "list" && (
                    <div className="bg-white rounded-lg shadow overflow-y-scroll h-80">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                              onClick={() => handleSort("mentor_name")}
                            >
                              <div className="flex items-center gap-1">
                                Mentor
                                <SortIcon columnKey="mentor_name" />
                              </div>
                            </th>
                            <th
                              className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                              onClick={() => handleSort("startup_name")}
                            >
                              <div className="flex items-center gap-1">
                                Startup
                                <SortIcon columnKey="startup_name" />
                              </div>
                            </th>
                            <th
                              className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                              onClick={() => handleSort("date")}
                            >
                              <div className="flex items-center gap-1">
                                Date
                                <SortIcon columnKey="date" />
                              </div>
                            </th>
                            <th
                              className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                              onClick={() => handleSort("time")}
                            >
                              <div className="flex items-center gap-1">
                                Time
                                <SortIcon columnKey="time" />
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider">
                              Mentor Hours
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                              Feedback
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {sortedMentorship.length > 0 ? (
                            sortedMentorship.map((mentorship) => (
                              <tr
                                key={mentorship.meet_id}
                                className="hover:bg-gray-50"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {mentorship.mentor_name || "N/A"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {mentorship.start_up_name || "N/A"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {formatDate(mentorship.date) || "DD/MM/YYYY"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {formatTime(mentorship.time) || "N/A"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {mentorship.meeting_duration || "N/A"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {mentorship.status || "N/A"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  <button
                                    className="bg-[#45C74D] text-white px-4 py-2 rounded-md text-sm "
                                    onClick={() =>
                                      openFeedbackModal(mentorship)
                                    }
                                  >
                                    {feedback.some(
                                      (feed) =>
                                        String(feed.meet_id) ===
                                        String(mentorship?.meet_id),
                                    )
                                      ? "View Notes"
                                      : "Add Notes"}
                                  </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm relative">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenDropdownId(
                                        openDropdownId === mentorship.meet_id
                                          ? null
                                          : mentorship.meet_id,
                                      );
                                    }}
                                    className="text-black hover:text-gray-600"
                                  >
                                    <FaEllipsis />
                                  </button>
                                  {openDropdownId === mentorship.meet_id && (
                                    <div
                                      className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <div className="py-1">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenDropdownId(null);
                                            // setSelectedEvent(event);
                                            // handleEventPopupClick();
                                          }}
                                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                          Re-Schedule
                                        </button>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedSession(mentorship);
                                            setOpenEstablishPopUp(true);
                                            setOpenDropdownId(null);
                                          }}
                                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="8"
                                className="px-6 py-12 text-center text-gray-500"
                              >
                                No data available for Mentorships
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
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

      {showAddFeedbackForm && selectedSession && (
        <FeedbackForm
          key={selectedSession.meet_id}
          isOpen={showAddFeedbackForm}
          mentor_id={selectedSession.mentor_id}
          meet_id={selectedSession.meet_id}
          startup_id={selectedSession.startup_id}
          onClose={handleAddFeedbackClose}
          initialFeedback={initialFeedback}
        />
      )}

      {/* Delete Confirmation */}
      <DeleteConfirmation
        isVisible={openEstablishPopUp}
        onClose={() => setOpenEstablishPopUp(false)}
      >
        <h1 className="text-center font-semibold text-2xl">Are you sure?</h1>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            className="text-gray-500 font-semibold p-2 rounded-xl shadow"
            onClick={() => {
              handleDelete(selectedSession.meet_id);
              setOpenEstablishPopUp(false);
            }}
          >
            Yes
          </button>
          <button
            className="text-gray-500 font-semibold p-2 rounded-xl shadow"
            onClick={() => setOpenEstablishPopUp(false)}
          >
            No
          </button>
        </div>
      </DeleteConfirmation>
    </div>
  );
}

export default MentorShip;

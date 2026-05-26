import React, { useState, useEffect } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEllipsis } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
import { GraduationCap, Briefcase, Users } from "lucide-react";
import RequestMentor from "./RequestMentor";
import {
  ApiDeleteMeeting,
  ApiFetchMeetingFeedback,
  ApiFetchMentor,
  ApiFetchScheduleMeetingsDetailsWithMentor,
} from "../../API/API";
import { FaEllipsisV, FaSpinner } from "react-icons/fa";
import { BsListUl } from "react-icons/bs";
import { MdViewModule } from "react-icons/md";
import FeedbackForm from "../Mentors/FeedbackForm";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

function MentorShip() {
  const [searchTerm, setSearchTerm] = useState("");
  const [mentorship, setMentorship] = useState([]);
  const [mentorCount,setMentorCount]=useState([])
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
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [rowsPerPage] = useState(6);
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
      const meetings = Array.isArray(response) ? response : [];
      setMentorship(meetings);

      const API = await ApiFetchMentor();
      const MentorData = API?.STATUS?.rows;
      setMentorCount(Array.isArray(MentorData) ? MentorData : []);

      const feedbackPromises = meetings.map((meet) =>
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
      value: mentorship?.length ?? 0,
      label: "No. of Abhyasa Sessions Conducted",
      badgeColor: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      icon: <Briefcase className="w-5 h-5" />,
      value: mentorCount?.length ?? 0,
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

        const updatedMentorship = updateddata.filter((meet) =>
          meet.mentor_name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        const updatedTotalPages = Math.ceil(
          updatedMentorship.length / rowsPerPage,
        );
        if (currentPage > updatedTotalPages && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        toast.error("Failed to delete Mentorship.");
      }
    } catch (err) {
      console.error(err);
    }
  };

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

  const clearDateFilter = () => {
    setDateFilter("");
    setShowDatePicker(false);
  };

  const filteredmentorship = (mentorship ?? []).filter((m) => {
    const matchesSearch =
      m.mentor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.start_up_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = dateFilter
      ? formatDate(m.date) === formatDate(dateFilter)
      : true;

    return matchesSearch && matchesDate;
  });

  const indexOfLastMentorship = currentPage * rowsPerPage;
  const indexOfFirstMentorship = indexOfLastMentorship - rowsPerPage;
  const currentMentorship = filteredmentorship.slice(
    indexOfFirstMentorship,
    indexOfLastMentorship,
  );
  const totalPages = Math.ceil(filteredmentorship.length / rowsPerPage);

  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    return <Navigate to="/" replace />;
  }

  if (decoded.role !== 2) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <NavBar />
        <div className="bg-[#f9f9f9] min-h-screen p-0">
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
                      <h3 className="text-2xl font-bold mt-1">
                        {item.value}
                      </h3>

                      {/* Label */}
                      <p className="text-sm text-gray-600 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-1 text-xl px-3 font-semibold">
                All Mentorship
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3 mt-3 px-4">
                {/*Search + Filter */}
                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                  {/* Search */}
                  <div className="relative w-96">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                      className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-[#45C74D] focus:border-[#45C74D]"
                    />
                  </div>

                  {/* Date Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                        dateFilter
                          ? "border-[#45C74D] bg-green-50 text-[#45C74D]"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {dateFilter ? formatDate(dateFilter) : "Filter by Date"}
                    </button>

                    {showDatePicker && (
                      <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-20 min-w-[250px]">
                        <input
                          type="date"
                          value={dateFilter}
                          onChange={(e) => {
                            setDateFilter(e.target.value);
                            setShowDatePicker(false);
                          }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        />
                        {dateFilter && (
                          <button
                            onClick={clearDateFilter}
                            className="mt-3 w-full px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-medium"
                          >
                            Clear Filter
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions + View Toggle */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                  {/* <button
                    className="border border-[#45C74D] rounded-lg px-4 py-2 text-sm"
                    onClick={handleRequestMentorClick}
                  >
                    Request Mentor
                  </button> */}

                  {/* <button
                    className="bg-[#45C74D] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    onClick={handleScheduleClick}
                  >
                    Schedule Meeting
                  </button> */}

                  <div className="flex gap-2 border border-gray-300 rounded-lg p-1 bg-white">
                    <button
                      onClick={() => setViewMode("card")}
                      className={`p-2 rounded ${
                        viewMode === "card"
                          ? "bg-[#45C74D] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <MdViewModule />
                    </button>

                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded ${
                        viewMode === "list"
                          ? "bg-[#45C74D] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
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
                    <div className="max-w-5xl mx-auto px-2 mt-4 pb-4">
                      <div className="grid grid-cols-3 gap-6">
                        {currentMentorship.map((meeting) => (
                          <div
                            key={meeting.meet_id}
                            className="border rounded-md shadow-md bg-white"
                          >
                            <div className="flex justify-between p-1">
                              <div className="text-xs px-2 pt-2 rounded-lg">
                                {dayjs(meeting.date, "D MMM YYYY").isAfter(
                                  dayjs(),
                                  "day",
                                ) ? (
                                  <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded-full text-xs font-medium">
                                    Upcoming
                                  </span>
                                ) : dayjs(meeting.date, "D MMM YYYY").isSame(
                                    dayjs(),
                                    "day",
                                  ) ? (
                                  <span className="text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">
                                    Today
                                  </span>
                                ) : (
                                  <span className="text-black bg-red-400 px-2 py-0.5 rounded-full text-xs font-medium">
                                    completed
                                  </span>
                                )}
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
                                  <FaEllipsis />
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
                                className="w-16 h-16"
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
                  )}{" "}
                  {viewMode === "list" && (
                    <div className="bg-white rounded-lg shadow">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                              <div className="flex items-center gap-1">
                                Mentor
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                              <div className="flex items-center gap-1">
                                Startup
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                              <div className="flex items-center gap-1">
                                Date
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                              <div className="flex items-center gap-1">
                                Time
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
                          {currentMentorship.length > 0 ? (
                            currentMentorship.map((mentorship) => (
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
                                  {dayjs(mentorship.date, "D MMM YYYY").isAfter(
                                    dayjs(),
                                    "day",
                                  ) ? (
                                    <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded-full text-xs font-medium">
                                      Upcoming
                                    </span>
                                  ) : dayjs(
                                      mentorship.date,
                                      "D MMM YYYY",
                                    ).isSame(dayjs(), "day") ? (
                                    <span className="text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">
                                      Today
                                    </span>
                                  ) : (
                                    <span className="text-black bg-red-400 px-2 py-0.5 rounded-full text-xs font-medium">
                                      completed
                                    </span>
                                  )}
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
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 py-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-500"
                        : "bg-[#45C74D] text-white hover:bg-[#3BAF43]"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages} (
                    {filteredmentorship.length} Mentorship)
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-500"
                        : "bg-[#45C74D] text-white hover:bg-[#3BAF43]"
                    }`}
                  >
                    Next
                  </button>
                </div>
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

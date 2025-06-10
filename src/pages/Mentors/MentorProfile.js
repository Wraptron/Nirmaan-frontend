import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mailsvg from "../../assets/images/Frame (6).svg";
import phonesvg from "../../assets/images/Frame (7).svg";
import whatsappsvg from "../../assets/images/Frame (8).svg";
import dummysvg from "../../assets/images/image (1).svg";
import linkedinsvg from "../../assets/images/Frame (9).svg";
import bgsvg from "../../assets/images/Rectangle 5.svg";
import Testimonials from "../../assets/images/testimonial.png";
import editsvg from "../../assets/images/Frame (12).svg";

import {
  ApiFetchMentor,
  ApiFetchScheduleMeetings,
  ApiFetchTestimonials,
  ApiDeleteTestimonial,
  ApiSaveFeedback,
  ApiFetchFeedback,
} from "../../API/API";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaEllipsisV } from "react-icons/fa";
import TestimonialForm from "./AddTestimonial";
import EditMentorForm from "./EditMentorPage";
import SideBar from '../../components/sidebar';
import NavBar from "../../components/NavBar";
import FeedbackModal from './FeedbackModal';

function MentorProfile() {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [meeting, setMeeting] = useState(null);
  const [testimonial, setTestimonial] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const navigate = useNavigate();
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [editTestimonial, setEditTestimonial] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionFeedbacks, setSessionFeedbacks] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [activityCurrentPage, setActivityCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Mock activity data - replace with actual API call
  const [activities] = useState([
    {
      id: 1,
      startup: "Start-up - Name",
      activity: "Activity",
      status: "Upcoming",
    },
    { id: 2, startup: "Start-up - Name", activity: "Activity" },
    { id: 3, startup: "Start-up - Name", activity: "Activity" },
    { id: 4, startup: "Start-up - Name", activity: "Activity" },
  ]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);

  const handleScheduleClick = () => {
    navigate(`/schedulemeeting/${mentor.mentor_id}`);
  };

  const handleLinkedInClick = (e) => {
    if (!mentor.linkedin_url) {
      e.preventDefault();
      alert("LinkedIn URL not available for this mentor");
    }
  };
  console.log(mentor);
  const fetchTestimonials = async (mentorId) => {
    try {
      const TestimonialAPI = await ApiFetchTestimonials(mentorId);
      const testimonialData = TestimonialAPI?.STATUS?.rows || [];
      setTestimonial(testimonialData);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    }
  };

  const fetchFeedback = async (meetingId) => {
    try {
      const response = await ApiFetchFeedback(meetingId);
      if (response?.STATUS?.rows?.[0]) {
        const feedbackData = response.STATUS.rows[0];
        setSessionFeedbacks((prev) => ({
          ...prev,
          [meetingId]: feedbackData.feedback || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const FetchData = async () => {
    try {
      const API = await ApiFetchMentor();
      const allMentors = API?.STATUS?.rows || [];
      const selectedMentor = allMentors.find(
        (m) => String(m.mentor_id) === String(id)
      );
      setMentor(selectedMentor || null);

      const MeetAPI = await ApiFetchScheduleMeetings(selectedMentor?.mentor_id);
      const meetings = MeetAPI?.STATUS?.rows || [];
      setMeeting(meetings);

      await fetchTestimonials(selectedMentor?.mentor_id);

      for (const session of meetings) {
        await fetchFeedback(session.meeting_id);
      }
    } catch (err) {
      console.error("Error fetching mentor data:", err);
    }
  };

  useEffect(() => {
    FetchData();
  }, [id]);

  const handleEditSubmit = (updatedData) => {
    setMentor((prev) => ({ ...prev, ...updatedData }));
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activeDropdown]);

  if (!mentor) {
    return <div className="p-10 text-gray-500">Loading mentor profile...</div>;
  }


  const getLinkedInUrl = (urlOrUsername) => {
    if (!urlOrUsername) return "#";
    if (urlOrUsername.startsWith("http")) return urlOrUsername;
    return `https://www.linkedin.com/in/${urlOrUsername}`;
  };

  const handleFeedbackSave = async (feedback) => {
    try {
      const response = await ApiSaveFeedback(
        selectedSession.meeting_id,
        feedback
      );
      if (response?.STATUS?.success) {
        setSessionFeedbacks((prev) => ({
          ...prev,
          [selectedSession.meeting_id]: feedback,
        }));
      } else {
        console.error("Failed to save feedback:", response?.STATUS?.message);
      }
    } catch (error) {
      console.error("Error saving feedback:", error);
    }
  };

  // Pagination logic for mentoring sessions
  const totalPages = Math.ceil((meeting?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMeetings = meeting?.slice(startIndex, endIndex) || [];

  // Pagination logic for activities
  const activityTotalPages = Math.ceil(activities.length / itemsPerPage);
  const activityStartIndex = (activityCurrentPage - 1) * itemsPerPage;
  const activityEndIndex = activityStartIndex + itemsPerPage;
  const currentActivities = activities.slice(
    activityStartIndex,
    activityEndIndex
  );

  const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    showingText,
  }) => (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded border border-gray-300 disabled:opacity-50"
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1 rounded ${
                currentPage === pageNum
                  ? "bg-green-500 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded border border-gray-300 disabled:opacity-50"
        >
          <FaChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="text-sm text-gray-600">{showingText}</div>
    </div>
  );

  const handleDeleteTestimonial = async (testimonialId) => {
    try {
      const response = await ApiDeleteTestimonial(testimonialId);
      if (response?.STATUS?.success) {
        await fetchTestimonials(id);
        setShowDeleteConfirm(false);
        setTestimonialToDelete(null);
      } else {
        console.error("Failed to delete testimonial:", response?.STATUS?.message);
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="ms-[220px] bg-gray-100 flex-grow">
        <NavBar />
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-4">
            <p className="text-sm text-gray-600">
              Dashboard &gt; Mentors &gt; Profile
            </p>
          </div>
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate("/mentors")}
              className="mr-2 p-2 rounded-full hover:bg-gray-200"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Mentor profile</h1>
          </div>

          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-300 to-grey-200 rounded-lg p-6 relative mb-6">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => {
                  setShowEditModal(true);
                }}
              >
                <img
                  src={editsvg}
                  alt="edit"
                  className="w-5 h-5 cursor-pointer hover:opacity-80"
                />
              </button>
            </div>
            <div className="flex items-start mt-12">
              <div className="mr-4">
                <img
                  src={mentor.mentor_logo?.replace("/uploads/", "") || dummysvg}
                  alt="Profile"
                  className="rounded-full w-28 h-28 object-cover aspect-square"
                />
              </div>

              <div>
                <div className="flex items-center">
                  <h2 className="text-xl font-bold">{mentor.mentor_name}</h2>
                  <a
                    href={getLinkedInUrl(mentor.linkedin_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkedInClick}
                    className="ml-2 bg-white p-1 rounded-full hover:opacity-80"
                  >
                    <img src={linkedinsvg} alt="linkedin" className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-sm text-gray-700">
                  {mentor.designation || "--"}
                </p>
                <div className="flex items-center mt-2">
                  <img src={mailsvg} alt="mail" className="w-4 h-4 mr-1" />
                  <span className="text-sm text-gray-700">
                    {mentor.email_address || "--"}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <img src={phonesvg} alt="phone" className="w-4 h-4 mr-1" />
                  <span className="text-sm text-gray-700">
                    {mentor.contact_num || "--"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={handleScheduleClick}
              >
                Schedule Session
              </button>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="bg-white p-6 rounded-lg mb-6">
            <div className="grid grid-cols-4 gap-6">
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Year Of Passing</h3>
                <p className="font-medium">
                  {mentor.year_of_passing_out || "--"}
                </p>
              </div>
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Qualification</h3>
                <p className="font-medium">{mentor.qualification || "--"}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Institution</h3>
                <p className="font-medium">{mentor.institution || "--"}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Expertise</h3>
                <p className="font-medium">
                  {mentor.area_of_expertise || "Not Associated"}
                </p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white p-6 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {mentor.mento_description || "No description provided."}
            </p>
          </div>

          {/* Current Mentees Section */}
          <div className="bg-white p-6 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-4">Current Mentees</h2>
            <div className="space-y-4">
              {mentor.mentees?.length > 0 ? (
                mentor.mentees.map((mentee, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center">
                      <img
                        src={dummysvg}
                        alt="Mentee"
                        className="rounded-lg w-12 h-12 object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-medium text-sm">{mentee.name}</h3>
                        <p className="text-sm text-gray-600">
                          {mentee.position}
                        </p>
                      </div>
                    </div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600">
                      Visit Profile
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-4 text-sm text-gray-500">
                  No mentees available.
                </div>
              )}
            </div>
          </div>

          {/* Mentoring Sessions Section */}
          <div className="bg-white p-6 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-4">Mentoring Sessions</h2>
            <div className="grid grid-cols-5 gap-3 py-3 border-b border-gray-200 font-medium text-sm text-gray-600">
              <div>Start-up</div>
              <div>Date</div>
              <div>Mentor Hours</div>
              <div>Meeting Mode</div>
              <div>Notes</div>
            </div>
            <div className="space-y-3">
              {currentMeetings.length > 0 ? (
                currentMeetings.map((session, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 gap-3 py-3 items-center"
                  >
                    <div className="text-sm font-medium">
                      {session.start_up_name}
                    </div>
                    <div className="text-sm text-gray-600">{session.date}</div>
                    <div className="text-sm text-gray-600">
                      {session.meeting_duration || "-"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {session.meeting_mode || "-"}
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setSelectedSession(session);
                          navigate(`/mentor/${session.meeting_id}`);
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600"
                      >
                        Meeting Notes
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-4 text-sm text-gray-500">
                  No sessions found.
                </div>
              )}
            </div>
            {meeting?.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                showingText={`Showing ${startIndex + 1} to ${Math.min(endIndex, meeting.length)} of ${meeting.length} results`}
              />
            )}
          </div>
          {/* Testimonials */}
          <div className="bg-white p-6 rounded-lg mb-6">
            <div className="border shadow-sm py-6 rounded-md w-full">
              <div className="flex justify-between ">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 px-5">
                  Testimonials
                </h2>
                <div onClick={() => setShowModal(true)}>
                  <img src={Testimonials} alt="" className="px-8 h-6" />
                </div>
              </div>

              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={3.25}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                breakpoints={{
                  1024: { slidesPerView: 3.25 },
                  768: { slidesPerView: 2.25 },
                  0: { slidesPerView: 1.25 },
                }}
              >
                {testimonial.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-[#F9F9F9] shadow-md rounded-xl p-6 h-full flex flex-col justify-between mx-2 relative">
                      <button
                        onClick={() => {
                          setTestimonialToDelete(item);
                          setShowDeleteConfirm(true);
                        }}
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                      >
                        <FaEllipsisV />
                      </button>
                      <FaQuoteLeft className="text-[#808080] text-2xl mb-4" />
                      <p className="text-gray-700 text-sm italic">
                        "{item.description}"
                      </p>
                      <div className="flex items-center gap-3 mt-6">
                        <div>
                          <h4 className="text-sm font-semibold">{item.name}</h4>
                          <p className="text-xs text-green-600">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Arrows */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  ref={navigationPrevRef}
                  className="w-8 h-8 flex items-center justify-center bg-[#45C74D] text-white rounded"
                >
                  <FaChevronLeft />
                </button>
                <button
                  ref={navigationNextRef}
                  className="w-8 h-8 flex items-center justify-center bg-[#45C74D] text-white rounded"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
        {showEditModal && (
          <EditMentorForm
            initialData={mentor}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleEditSubmit}
          />
        )}

        {showModal && (
          <TestimonialForm
            mentorRefId={id}
            onClose={() => setShowModal(false)}
            onTestimonialAdded={() => fetchTestimonials(id)}
          />
        )}

        {showFeedbackModal && selectedSession && (
          <FeedbackModal
            session={selectedSession}
            onClose={() => {
              setShowFeedbackModal(false);
              setSelectedSession(null);
            }}
            onSave={handleFeedbackSave}
            initialFeedback={sessionFeedbacks[selectedSession.meeting_id] || ""}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && testimonialToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Delete Testimonial</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this testimonial? This action
                cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setTestimonialToDelete(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    handleDeleteTestimonial(testimonialToDelete.testimonial_id)
                  }
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
         
    </div>
  );
}

export default MentorProfile;
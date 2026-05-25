import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mailsvg from "../../../assets/images/Frame (6).svg";
import phonesvg from "../../../assets/images/Frame (7).svg";
import ImageSvg from "../../../assets/images/296fe121-5dfa-43f4-98b5-db50019738a7.jpg";
import linkedinsvg from "../../../assets/images/Frame (9).svg";
import Testimonials from "../../../assets/images/testimonial.png";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

import {
  ApiFetchMentor,
  ApiFetchScheduleMeetings,
  ApiFetchTestimonials,
  ApiFetchFeedback,
  ApiUpdateTestimonial,
  ApiDeleteTestimonial,
  ApiFetchMeetingFeedback,
} from "../../../API/API";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import TestimonialForm from "../../../pages/Mentors/AddTestimonial";
import EditMentorForm from "../../../pages/Mentors/EditMentorPage";
import SideBar from "../../../components/sidebar";
import NavBar from "../../../components/NavBar";
import EditTestimonial from "../../../pages/Mentors/EditTestimonial";
import DeleteConfirmation from "../../../components/DeleteConfirmation";
import FeedbackForm from "../../../pages/Mentors/FeedbackForm";
import RequestMentor from "../../Mentorship/RequestMentor";

function StartupMentorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userRole = sessionStorage.getItem("role");
  const loggedInMentorId = sessionStorage.getItem("mentor_id");
  const isMentorView = userRole === "6"; // Mentor sees only own profile

  const [mentor, setMentor] = useState(null);
  const [meeting, setMeeting] = useState([]);

  //Feedback
  const [showAddFeedbackForm, setShowAddFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [initialFeedback, setInitialFeedback] = useState(null);

  //testimonial
  const [testimonial, setTestimonial] = useState([]);
  const [edittestimonial, setEditTestimonial] = useState(null);
  const [deletetestimonial, setdeletetestimonial] = useState(null);
  const [showEditTestimonialForm, setShowEditTestimonialForm] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showRequestMentor, setShowRequestMentor] = useState(false);

  const handleScheduleClick = () => {
    navigate(`/mentors/scheduleMeeting/${mentor.mentor_id}`);
  };

  const handleLinkedInClick = (e) => {
    if (!mentor.linkedin_id) {
      e.preventDefault();
      alert("LinkedIn URL not available for this mentor");
    }
  };

  // const fetchFeedback = async (meetingId) => {
  //   try {
  //     const response = await ApiFetchFeedback(meetingId);
  //     if (response?.STATUS?.rows?.[0]) {
  //       // const feedbackData = response.STATUS.rows[0];
  //       // setSessionFeedbacks((prev) => ({
  //       //   ...prev,
  //       //   [meetingId]: feedbackData.feedback || "",
  //       // }));
  //     }
  //   } catch (error) {
  //     console.error("Error fetching feedback:", error);
  //   }
  // };

  const FetchData = async () => {
    try {
      const API = await ApiFetchMentor();
      const allMentors = API?.STATUS?.rows || [];
      const selectedMentor = allMentors.find(
        (m) => String(m.mentor_id) === String(id)
      );
      setMentor(selectedMentor || null);

      const MeetAPI = await ApiFetchScheduleMeetings(selectedMentor?.mentor_id);
      const meetings = MeetAPI || [];
      setMeeting(meetings.reverse());

      const APITestimonial = await ApiFetchTestimonials();
      const Testimonial = APITestimonial?.STATUS?.rows || [];
      const filteredTestimonial = Testimonial.filter(
        (data) =>
          String(data.mentor_ref_id) === String(selectedMentor?.mentor_id)
      );
      setTestimonial(filteredTestimonial);

      const feedbackPromises = meetings.map((meet) =>
        ApiFetchMeetingFeedback(selectedMentor.mentor_id, meet.startup_id).then(
          (res) => res || []
        )
      );
      const allFeedbackArrays = await Promise.all(feedbackPromises);

      // Flatten into a single array
      const allFeedback = allFeedbackArrays.flat();
      setFeedback(allFeedback);
    } catch (err) {
      console.error("Error fetching mentor data:", err);
    }
  };

  // Mentor (role 6) can only view their own profile; redirect if URL id differs
  useEffect(() => {
    if (isMentorView && loggedInMentorId && String(id) !== String(loggedInMentorId)) {
      navigate(`/mentors/mentor_profile/${loggedInMentorId}`, { replace: true });
      return;
    }
  }, [id, isMentorView, loggedInMentorId, navigate]);

  useEffect(() => {
    FetchData();
  }, [id]);

  //FeedBack Form open
  const handleAddFeedbackClick = () => setShowAddFeedbackForm(true);
  const openFeedbackModal = (session) => {
    const currentFeedback = feedback.find(
      (feed) => String(feed.meet_id) === String(session?.meet_id)
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

  //Testimonial Form Open
  const handleEditTestimonialsClose = async () => {
    setShowEditTestimonialForm(false);
  };
  const handleEditTestimonialClick = (testimonial) => {
    setEditTestimonial(testimonial);
    setShowEditTestimonialForm(true);
  };
  const handleEditTestimonialSubmit = async (updatedData) => {
    try {
      await ApiUpdateTestimonial(updatedData);
      setTestimonial((prev) =>
        prev.map((t) =>
          t.testimonial_id === updatedData.testimonial_id
            ? { ...t, ...updatedData }
            : t
        )
      );
    } catch (error) {
      toast.error("Failed to update Testimonial section");
    }
  };

  const handledelete = async (id) => {
    try {
      const API = await ApiDeleteTestimonial(id);
      if (API) {
        toast.success("Testimonial Deleted Successfully");
        const updatestestimonial = testimonial.filter(
          (data) => data.testimonial_id !== id
        );
        setTestimonial(updatestestimonial);
        setOpenDropdownId(null);
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      console.log(err);
    }
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
    return (
      <div className="flex items-center gap-4 justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#45C74D]"></div>
        <p className="text-[#45C74D]">Loading Mentor Details ....</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <NavBar />
        <div className="bg-[#F8FAFB] min-h-screen">
          <div className="w-full px-6 py-6">
          {isMentorView ? (
            <div className="flex items-center mb-6">
              <h1 className="text-xl font-bold">My Profile</h1>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => navigate("/startup/mentor")}
                  className="p-2 rounded-full hover:bg-gray-200 shrink-0"
                  aria-label="Back to mentors list"
                >
                  <FaChevronLeft className="w-5 h-5" />
                </button>
                <p className="text-sm text-gray-600 flex flex-wrap items-center gap-1">
                  <span>Start-ups</span>
                  <span className="text-gray-400">&gt;</span>
                  <button
                    type="button"
                    className="text-gray-600 hover:text-[#45C74D] hover:underline"
                    onClick={() => navigate("/startup/mentor")}
                  >
                    Mentors
                  </button>
                  <span className="text-gray-400">&gt;</span>
                  <span className="text-gray-800 font-medium">Profile</span>
                </p>
              </div>
              <div className="flex items-center mb-6">
                <h1 className="text-xl font-bold">Mentor profile</h1>
              </div>
            </>
          )}

          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-300 to-grey-200 rounded-lg p-6 relative mb-6">
            <div className="flex items-start mt-12">
              <div className="mr-4">
                <img
                  src={
                    mentor.mentor_logo
                      ? typeof mentor.mentor_logo === "string"
                        ? mentor.mentor_logo.replace("/uploads/", "")
                        : URL.createObjectURL(mentor.mentor_logo)
                      : ImageSvg
                  }
                  alt="Profile"
                  className="rounded-full w-28 h-28 object-cover aspect-square"
                />
              </div>

              <div>
                <div className="flex items-center">
                  <h2 className="text-xl font-bold">{mentor.mentor_name}</h2>
                  <a
                    href={mentor.linkedin_id}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkedInClick}
                    className="ml-2 bg-white p-1 rounded-full hover:opacity-80"
                  >
                    <img src={linkedinsvg} alt="linkedin" className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-sm text-gray-700">
                  {mentor.designation || "N/A"}
                </p>
                <div className="flex items-center mt-2">
                  <img src={mailsvg} alt="mail" className="w-4 h-4 mr-1" />
                  <span className="text-sm text-gray-700">
                    {mentor.email_address || "N/A"}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <img src={phonesvg} alt="phone" className="w-4 h-4 mr-1" />
                  <span className="text-sm text-gray-700">
                    {mentor.contact_num || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="bg-white p-6 rounded-lg mb-6">
            <div className="grid grid-cols-4 gap-6">
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Year Of Passing</h3>
                <p className="font-medium">
                  {mentor.year_of_passing_out || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Qualification</h3>
                <p className="font-medium">{mentor.qualification || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-600 mb-1">Institution</h3>
                <p className="font-medium">{mentor.institution || "N/A"}</p>
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

          {/* Testimonials */}
          <div className="bg-white p-6 rounded-lg mb-6  overflow-x-hidden max-w-full ">
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
                slidesPerView={3} // 3 full, 1 partial
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                breakpoints={{
                  1024: { slidesPerView: 3 },
                  768: { slidesPerView: 2 },
                  0: { slidesPerView: 1 },
                }}
              >
                {testimonial.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-[#F9F9F9] shadow-md rounded-xl p-6 h-full flex flex-col justify-between mx-2">
                      <div className="flex items-center justify-between">
                        <FaQuoteLeft className="text-[#808080] text-2xl mb-4" />
                        <div className="flex items-center gap-2">
                          <button
                            className=" hover:bg-gray-100 rounded-full"
                            onClick={() => handleEditTestimonialClick(item)}
                          >
                            <FiEdit2 size={16} className="text-[#45C74D]" />
                          </button>
                          <button
                            className="text-red-600 p-1 hover:bg-gray-100 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              setdeletetestimonial(item.testimonial_id);
                              setOpenEstablishPopUp(true);
                              setOpenDropdownId(null);
                            }}
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </div>
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

          {!isMentorView && (
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
              <button
                type="button"
                className="border border-[#45C74D] text-[#45C74D] hover:bg-green-50 px-6 py-2.5 rounded-lg text-sm font-semibold"
                onClick={() => setShowRequestMentor(true)}
              >
                Request Mentor
              </button>
            </div>
          )}
          </div>
        </div>
        {showRequestMentor && (
          <RequestMentor
            mentorId={mentor.mentor_id}
            mentorName={mentor.mentor_name}
            onClose={() => setShowRequestMentor(false)}
          />
        )}
        {showAddFeedbackForm && selectedSession && (
          <FeedbackForm
            key={selectedSession.meet_id}
            isOpen={showAddFeedbackForm}
            mentor_id={mentor.mentor_id}
            meet_id={selectedSession.meet_id}
            startup_id={selectedSession.startup_id}
            onClose={handleAddFeedbackClose}
            initialFeedback={initialFeedback}
          />
        )}

        {showModal && (
          <TestimonialForm
            mentor_id={mentor.mentor_id}
            onClose={() => setShowModal(false)}
            onTestimonialAdded={() => FetchData(mentor.mentor_id)}
          />
        )}
        {showEditTestimonialForm && (
          <EditTestimonial
            initialData={edittestimonial}
            onClose={handleEditTestimonialsClose}
            onSubmit={handleEditTestimonialSubmit}
          />
        )}
        <DeleteConfirmation
          isVisible={openEstablishPopUp}
          onClose={() => setOpenEstablishPopUp(false)}
        >
          <h1 className="text-center font-semibold text-2xl">Are you sure?</h1>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              className="text-gray-500 font-semibold p-2 rounded-xl shadow"
              onClick={() => {
                handledelete(deletetestimonial);
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
    </div>
  );
}

export default StartupMentorDetail;

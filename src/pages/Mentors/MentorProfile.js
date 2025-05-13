import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/sidebar";
import mailsvg from "../../assets/images/Frame (6).svg";
import phonesvg from "../../assets/images/Frame (7).svg";
import whatsappsvg from "../../assets/images/Frame (8).svg";
import dummysvg from "../../assets/images/image (1).svg";
import linkedinsvg from "../../assets/images/Frame (9).svg";
import bgsvg from "../../assets/images/Rectangle 5.svg";
import mentorsvg from "../../assets/images/Frame (11).svg";
import testimonial from "../../assets/images/testimonial.png";
import editsvg from "../../assets/images/Frame (12).svg";
import { ApiFetchMentor, ApiFetchScheduleMeetings } from "../../API/API";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import { useRef } from "react";
import TestimonialForm from "./AddTestimonial";

import { useNavigate } from "react-router-dom";

function MentorProfile() {
  const { id } = useParams(); // get id from URL
  const [mentor, setMentor] = useState(null);
  const [meeting, setMeeting] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);


const navigate = useNavigate();

const handleScheduleClick = () => {
  navigate(`/schedulemeeting/${mentor.mentor_id}`);
};

  const FetchData = async () => {
    try {
      const API = await ApiFetchMentor();

      const allMentors = API?.STATUS?.rows || [];
  

      const selectedMentor = allMentors.find((m) => {
        return String(m.mentor_id) === String(id);
      });

      setMentor(selectedMentor || null);

      // if (selectedMentor) {
      //   // Fetch the schedule meetings for this mentor
      //   const scheduleAPIResponse = await ApiFetchScheduleMeetings(selectedMentor.mentor_id);
  
      //   // You can process the schedule data as needed
      //   console.log('Schedule API Response:', scheduleAPIResponse);
  
      //   // Set the schedule data to state
      //   setMeeting(scheduleAPIResponse || []);
      // }
    } catch(err) {
      console.error("Error fetching mentor data:", err);
    }
  };

  useEffect(() => {
    FetchData();
  }, [id]);

  if (!mentor) {
    return <div className="p-10 text-gray-500">Loading mentor profile...</div>;
  }

  const testimonials = [
    {
      text: "The team took time to understand our vision and delivered a sleek, professional site that not only looks great but also improved our conversion rates. Their design process was smooth.",
      name: "Maxin Will",
      title: "Product Manager",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      text: "The team took time to understand our vision and delivered a sleek, professional site that not only looks great but also improved our conversion rates. Their design process was smooth.",
      name: "Maxin Will",
      title: "Product Manager",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      text: "The team took time to understand our vision and delivered a sleek, professional site that not only looks great but also improved our conversion rates. Their design process was smooth.",
      name: "Maxin Will",
      title: "Product Manager",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      text: "The team took time to understand our vision and delivered a sleek, professional site that not only looks great but also improved our conversion rates. Their design process was smooth.",
      name: "Maxin Will",
      title: "Product Manager",
      img: "https://randomuser.me/api/portraits/women/20.jpg",
    },
  ];

  return (
    <div className="flex flex-col">
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <NavBar />
        <div className="bg-gray-100 min-h-screen">
          <div className="p-5 text-sm text-[#808080]">
            Dashboard {">"} Mentors {">"} Profile
          </div>

          {/* Heading */}
          <div className="flex gap-5 px-5">
            <div className="pt-1">
              <a href="/mentors">
                <img src={mentorsvg} alt="back" />
              </a>
            </div>
            <div className="text-lg font-semibold pt-1">Mentor Profile</div>
          </div>

          {/* Profile Card */}
          <div className="px-5 py-4">
            <div className="bg-white rounded-2xl shadow-lg border">
              <div className="relative flex">
                <img src={bgsvg} className="" alt="bg" />
                <button>
                  <img
                    src={editsvg}
                    className="absolute top-5 right-5"
                    alt="edit"
                  />
                </button>
              </div>

              <div className="shadow-sm px-5 py-2">
                <div className="grid grid-cols-4 py-2 shadow-md rounded-lg">
                  <div className="col-span-1">
                    <img src={bgsvg} alt="mentor" />
                  </div>
                  <div className="col-span-3 px-2">
                    <div className="flex gap-2 items-center">
                      <div className="text-lg font-semibold">
                        {mentor.mentor_name}
                      </div>
                      <img
                        src={linkedinsvg}
                        className="w-[20px] pt-1"
                        alt="linkedin"
                      />
                    </div>
                    <div className="text-xs text-[#808080]">
                      {mentor.designation || "--"}
                    </div>

                    <div className="flex gap-4 mt-3 items-center">
                      <img src={mailsvg} alt="mail" />
                      <div>{mentor.email_address || "--"}</div>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex gap-4 mt-3 items-center">
                        <img src={phonesvg} alt="phone" />
                        <div>{mentor.contact_num || "--"}</div>
                      </div>
                      <div className="flex gap-5">
                        <button className="bg-[#45C74D] p-1 rounded-md">
                          <img src={whatsappsvg} alt="whatsapp" />
                        </button>
                        
                          <button onClick={handleScheduleClick} className="bg-[#45C74D] p-1 rounded-md text-white">
                            Schedule Session
                          </button>
                        
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education Info */}
                <div className="flex justify-between gap-5 shadow-md border rounded-lg py-2 px-1 mt-4">
                  <div>
                    <div>Years Of Passing</div>
                    <div>{mentor.year_of_passing_out || "--"}</div>
                  </div>
                  <div>
                    <div>Qualification</div>
                    <div>{mentor.qualification || "--"}</div>
                  </div>
                  <div>
                    <div>Institution</div>
                    <div>{mentor.institution || "--"}</div>
                  </div>
                  <div>
                    <div>Expertise</div>
                    <div>{mentor.expertise || "--"}</div>
                  </div>
                </div>

                {/* About */}
                <div className="rounded-lg py-2 px-1 mt-4">
                  <div className="flex text-lg">About</div>
                  <div className="text-sm">
                    {mentor.about || "No description provided."}
                  </div>
                </div>
              </div>
            </div>

            {/* Current Mentees */}
            <div className="bg-white border shadow-sm px-5 py-2 mt-4 rounded-md">
              <div>Current Mentees</div>
              {mentor.mentees?.length > 0 ? (
                mentor.mentees.map((mentee, i) => (
                  <div key={i} className="bg-[#FAFAFA] rounded-md mt-2 px-6">
                    <div className="flex justify-between py-2">
                      <div className="flex gap-7">
                        <img src={dummysvg} className="w-12" alt="mentee" />
                        <div>
                          <div>{mentee.name}</div>
                          <div className="text-sm">{mentee.position}</div>
                        </div>
                      </div>
                      <button className="bg-[#45C74D] text-white p-1 mt-[3px] rounded-md text-sm">
                        Visit Profile
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-2 text-sm text-gray-500">
                  No mentees available.
                </div>
              )}
            </div>

            {/* Mentoring Sessions */}
            <div className="bg-white border shadow-sm px-5 py-2 mt-4 rounded-md">
              <div className="font-semibold">Mentoring Sessions</div>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase">
                    <tr>
                      <th className="px-6 py-3">start_up_name</th>
                      <th className="px-6 py-3">date</th>
                      <th className="px-6 py-3">meeting_duration</th>
                      <th className="px-6 py-3">Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mentor.sessions?.length > 0 ? (
                      mentor.sessions.map((session, i) => (
                        <tr
                          key={i}
                          className="bg-white border-b border-gray-200"
                        >
                          <td className="px-6 py-3">{session.startup}</td>
                          <td className="px-6 py-3">{session.date}</td>
                          <td className="px-6 py-3">{session.hours}</td>
                          <td className="px-6 py-3">
                            <button className="p-1 text-sm bg-[#45C74D] text-white rounded-md">
                              Visit Feedback
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center p-3 text-gray-500"
                        >
                          No sessions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-5 mt-4">
          <div className="border shadow-sm py-6 rounded-md w-full">
            <div className="flex justify-between ">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 px-5">
                Testimonails
              </h2>
              <div onClick={() => setShowModal(true)}>
                <img src={testimonial} alt="" className="px-8 h-6" />
              </div>
              {showModal && (
                <TestimonialForm onClose={() => setShowModal(false)} />
              )}
            </div>

            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={3.25} // 3 full, 1 partial
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
              {testimonials.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-[#F9F9F9] shadow-md rounded-xl p-6 h-full flex flex-col justify-between mx-2">
                    <FaQuoteLeft className="text-[#808080] text-2xl mb-4" />
                    <p className="text-gray-700 text-sm italic">
                      "{item.text}"
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-10 h-10 rounded-full border"
                      />
                      <div>
                        <h4 className="text-sm font-semibold">{item.name}</h4>
                        <p className="text-xs text-green-600">{item.title}</p>
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
    </div>
  );
}

export default MentorProfile;

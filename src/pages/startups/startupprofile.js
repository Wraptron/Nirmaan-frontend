import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import { FiEdit2, FiShare2, FiGlobe, FiX } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineAdd, MdCall, MdChevronLeft } from "react-icons/md";
import { FaSync } from "react-icons/fa";
import bgImg from "../../assets/images/Rectangle 5.svg";
import profileImg from "../../assets/images/296fe121-5dfa-43f4-98b5-db50019738a7.jpg";
import pinSvg from "../../assets/images/Frame (9).svg";
import pdfSvg from "../../assets/images/Frame (8).svg";
import { useParams } from "react-router-dom";
import EditStartupForm from "../startups/step/EditForm/EditStartupForm";
import EditAboutForm from "../startups/step/EditForm/EditAboutForm";
import AddAwardForm from "../startups/step/EditForm/AddAwardForm";
import FounderForm from "./step/EditForm/FounderForm"; // adjust the path if needed

import EditFundingForm from "../startups/step/EditForm/EditFundingForm";
import toast from "react-hot-toast";
import EditMentorForm from "../startups/step/EditForm/EditMentorForm";
import {
  ApiFetchAward,
  ApiFetchFundingAmount,
  ApiFetchStartup,
} from "../../API/API";
import { Route } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import AddFunding from "../Home/Funding/AddFunding";

function StartupProfile() {
  const { startup_id } = useParams();
  console.log("id:", startup_id);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAboutForm, setShowAboutForm] = useState(false);
  const [showAddAwardForm, setShowAddAwardForm] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showFoundersForm, setShowFoundersForm] = useState(false);
  const [showFounderEditForm, setShowFounderEditForm] = useState(false);
  const [showFundingForm, setShowFundingForm] = useState(false);
  const [showMentorForm, setShowMentorForm] = useState(false);
  // const [showFundingModal, setShowFundingModal] = useState(false);

  const [startupData, setStartupData] = useState(null);
  const [awards, setAwards] = useState([]);
  const [showReadMore, setShowReadMore] = useState(false);
  const [fundingAmount, setFundingAmount] = useState([]);
  const [selectedFounder, setSelectedFounder] = useState(null);

  const navigate = useNavigate();

  // Edit handlers
  const handleEditClick = () => setShowEditForm(true);
  const handleAboutClick = () => setShowAboutForm(true);
  const handleAddAwardClick = () => setShowAddAwardForm(true);
  const handleTeamMembersClick = () => setShowFoundersForm(true);
  const handleFundingClick = () => setShowFundingForm(true);
  const handleMentorEditClick = () => setShowMentorForm(true);
  // const handleFundingModalClick = () => setShowFundingForm(true);

  const handleEditClose = async () => {
    await FetchData();
    setShowEditForm(false);
  };
  const handleAboutClose = async () => {
    await FetchData();
    setShowAboutForm(false);
  };
  const handleAddAwardClose = async () => {
    await FetchData();
    setShowAddAwardForm(false);
  };
  const handleTeamMembersClose = async () => {
    await FetchData();
    setShowFoundersForm(false);
  };
  const handleFundingClose = async() =>{
    await FetchData();
     setShowFundingForm(false);}
  const handleMentorEditClose = async () => {
    await FetchData();
    setShowMentorForm(false);
  };
  // const handleFundingModalClose = () => setShowFundingForm(false);

  const handleFounderEditClose = async () => {
    await FetchData();
    setShowFounderEditForm(false);
  };

  // Sample funding data - replace with real data from your API
  // const [fundingData, setFundingData] = useState([]);

  // Funding Modal Component

  const handleEditSubmit = async (updatedData) => {
    try {
      // Here you would typically call your API to update the startup
      // await ApiUpdateStartup(id, updatedData);
      setStartupData(updatedData);
    } catch (error) {
      console.error("Error updating startup:", error);
      toast.error("Failed to update startup profile");
    }
  };

  const handleAboutSubmit = async (updatedData) => {
    try {
      setStartupData((prev) => ({
        ...prev,
        about: updatedData.about,
      }));
    } catch (error) {
      console.error("Error updating about section:", error);
      toast.error("Failed to update about section");
    }
  };

  const handleAddAwardSubmit = async (newAward) => {
    try {
      setStartupData((prev) => ({
        ...prev,
        awards: [...prev.awards, newAward],
      }));
    } catch (error) {
      console.error("Error adding award:", error);
      toast.error("Failed to add award");
    }
  };
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-[#D8F3D9] text-[#45C74D]";
      case "graduated":
        return "bg-[#E8F5E8] text-[#2E7D32]";
      case "dropped":
        return "bg-[#FFEBEE] text-[#D32F2F]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleTeamMembersSubmit = async (updatedData) => {
    try {
      setStartupData((prev) => ({
        ...prev,
        founders: updatedData.founders,
        team_members: updatedData.team_members,
      }));
      toast.success("Team members updated successfully");
    } catch (error) {
      console.error("Error updating team members:", error);
      toast.error("Failed to update team members");
    }
  };

  const handleFundingSubmit = async (updatedData) => {
    try {
      setStartupData((prev) => ({
        ...prev,
        funding_disbursed: updatedData.funding_disbursed,
        funding_utilized: updatedData.funding_utilized,
        external_funding: updatedData.external_funding,
        funding_details: updatedData.funding_details,
      }));
      toast.success("Funding information updated successfully");
    } catch (error) {
      console.error("Error updating funding:", error);
      toast.error("Failed to update funding information");
    }
  };

  const handleMentorEditSubmit = async (updatedData) => {
    try {
      setStartupData((prev) => ({
        ...prev,
        mentors: updatedData.mentors,
      }));
    } catch (error) {
      console.error("Error updating mentors:", error);
      toast.error("Failed to update mentors");
    }
  };

// Api FetchData
  const FetchData = async () => {
    try {

      // ---Startup Detail Fetch ---
      const API = await ApiFetchStartup();
        const allStartup = API?.rows || [];
          const selectedstartup = allStartup.find(
        (startup) =>
          String(startup.startup_id) === String(startup_id)
      );
      setStartupData(selectedstartup || null);
      // console.log(selectedstartup)

       // ---Award Details Fetch ---
      const APIAward = await ApiFetchAward();
       const award = APIAward?.rows || [];
         const filteredAwards = award.filter(
        (award) =>
          String(award.startup_id) ===
          String(startup_id)
      );
       setAwards(filteredAwards || []);

      // --- Funding Amount Details Fetch Fetch ---
      const ApiFundingAmount = await ApiFetchFundingAmount();
      const amount = ApiFundingAmount || {};
      const fundamount = selectedstartup?.startup_name ? amount[selectedstartup.startup_name] || null : null;
       setFundingAmount(fundamount || []);


      // console.log("Selected startup:", selectedstartup);
      // console.log("Awards data:", filteredAwards);
      // console.log("Awards length:", filteredAwards?.length);
      
     } catch (err) {
      console.error("Error fetching mentor data:", err);
    }
  };

  useEffect(() => {
    FetchData();
  }, [startup_id]);

  if (!startupData) {
    return <div>Loading startup details</div>;
  }

  // Read More Popup Component
  const ReadMorePopup = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#232323]">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX size={20} className="text-[#A1A1A1]" />
              </button>
            </div>
            <div className="text-[#232323] text-sm leading-relaxed">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Function to truncate text
  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Check if text needs truncation
  const needsTruncation = (text, maxLength = 150) => {
    return text && text.length > maxLength;
  };

  return (
    <div className="flex font-[\'DM Sans\',sans-serif]">
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <NavBar />
        <div className="bg-[#F8FAFB] min-h-screen">
          <div className="mx-auto max-w-6xl py-6">
            {/* Display the id for confirmation */}
            <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">
              Profile ID: {startupData?.startup_id }
            </div>
            {/* Breadcrumb */}
            <div className="text-xs text-[#A1A1A1] mb-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate("/startups")}
                className="hover:text-[#45C74D] focus:outline-none"
                title="Back to Startups"
              >
                <MdChevronLeft className="text-black text-3xl" />
              </button>
              Start-ups &gt; Profile
            </div>
            {/* Title */}
            <div className="font-semibold text-2xl mb-6 text-[#232323]">
              Start-up profile
            </div>
            {/* Top Profile Section */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Left: Profile Card */}
              <div className="relative bg-white rounded-2xl shadow p-0 flex flex-col min-h-[340px]">
                {/* Background image with edit icon */}
                <div className="relative h-[140px] rounded-t-2xl overflow-hidden">
                  <img
                    src={bgImg}
                    alt="bg"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleEditClick}
                    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
                  >
                    <FiEdit2 size={18} className="text-[#232323]" />
                  </button>
                </div>
                {/* Profile image with green border */}
                <div className="absolute left-1/2 top-[90px] -translate-x-1/2 z-10">
                  <div className="w-24 h-24 rounded-full border-4 border-[#45C74D] bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={profileImg}
                      alt="Profile"
                      className="w-22 h-22 rounded-full object-cover"
                    />
                  </div>
                </div>
                {/* Card content */}
                <div className="flex flex-col items-center pt-20 pb-6 px-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-xl text-[#232323]">
                      {startupData.startup_name}
                    </span>
                    {/* Only show status if program is "akshar" or "partham" */}
                    {(startupData.program?.toLowerCase() === "akshar" ||
                      startupData.program?.toLowerCase() === "pratham") && (
                      <span className="bg-[#E9F7F1] text-[#45C74D] text-xs font-semibold px-2 py-0.5 rounded ml-1">
                        <div
                          className={`px-2 py-1 rounded-xl text-xs ${getStatusColor(startupData.startup_status)}`}
                        >
                          {startupData.startup_status || ""}
                        </div>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#232323] mb-1">
                    <span className="flex items-center gap-1">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
                        alt="Gmail"
                        className="w-5 h-5"
                      />{" "}
                      {startupData.email_address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#232323] mb-2">
                    <span className="flex items-center gap-1">
                      <MdCall className="text-black w-5 h-5" />{" "}
                      {startupData.official_contact_number}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#232323] mb-2">
                    {startupData.linkedin && (
                      <a
                        href={startupData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:underline"
                      >
                        <FaLinkedin className="text-blue-600 w-5 h-5" />
                        {/* Optional: <span>{startupData.linkedin}</span> */}
                      </a>
                    )}

                    {startupData.website_link && (
                      <a
                        href={startupData.website_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:underline"
                      >
                        <FiGlobe className="text-green-600 w-5 h-5" />
                        {/* Optional: <span>{startupData.website_link}</span> */}
                      </a>
                    )}
                  </div>

                  {/* Project Timeline */}
                  {/* <div className="w-full mt-2">
                    <div className="font-semibold text-sm text-[#232323] mb-1">Project Timeline</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[#E9F7F1] rounded-full relative">
                        <div className="absolute left-0 top-0 h-2 bg-[#45C74D] rounded-full" style={{ width: '30%' }} />
                      </div>
                      <span className="text-xs text-[#45C74D] font-semibold ml-2">Step 01</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-[#A1A1A1]">Problem Validation</span>
                      <button className="bg-[#45C74D] text-white px-6 py-1 rounded-full text-sm font-semibold shadow hover:bg-[#36a03d] transition">View</button>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* Right: About Us & Awards (Figma accurate) */}
              <div className="flex flex-col gap-6">
                {/* About Us Card */}
                <div className="bg-white rounded-2xl shadow p-6 min-h-[180px] relative flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg text-[#232323]">
                      About Us
                    </span>
                    <button
                      className="p-1 hover:bg-gray-100 rounded-full"
                      onClick={handleAboutClick}
                    >
                      <FiEdit2 size={16} className="text-[#A1A1A1]" />
                    </button>
                  </div>
                  <div className="text-[#232323] text-sm mb-4">
                    {truncateText(startupData.startup_description)}
                    {needsTruncation(startupData.startup_description) && (
                      <button
                        onClick={() => setShowReadMore(true)}
                        className="text-[#45C74D] hover:text-[#36a03d] font-medium ml-2 underline"
                      >
                        Read More
                      </button>
                    )}
                  </div>
                  <div className="flex w-full gap-4 text-sm font-medium text-[#232323]">
                    <div className="flex-1">
                      <div className="text-[#A1A1A1] text-xs mb-1">
                        Start-up Domain
                      </div>
                      <div>{startupData.startup_domain}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-[#A1A1A1] text-xs mb-1">Sector</div>
                      <div>{startupData.startup_sector}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-[#A1A1A1] text-xs mb-1">Program</div>
                      <div>{startupData.program}</div>
                    </div>
                  </div>
                </div>
                {/* Awards & Recognitions Card */}
                <div className="bg-white rounded-2xl shadow p-6 min-h-[180px] relative flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg text-[#232323]">
                      Awards & Recognitions
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1 hover:bg-gray-100 rounded-full"
                        onClick={handleAddAwardClick}
                      >
                        <MdOutlineAdd size={16} className="text-[black]" />
                      </button>
                    </div>
                  </div>
                  {/* Only the awards list is a slider */}
                  <div className="mt-2">
                    {awards.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        No awards added yet.
                      </p>
                    ) : (
                      <Swiper
                        modules={[Navigation]}
                        spaceBetween={100}
                        slidesPerView={1}
                        navigation={true}
                        breakpoints={{
                          640: { slidesPerView: 1 },
                          768: { slidesPerView: 2 },
                          1024: { slidesPerView: 3 },
                        }}
                        className="awards-swiper"
                        style={{ position: "relative" }}
                      >
                        {awards.map((award, idx) => (
                          <SwiperSlide key={idx}>
                            <div className="flex items-start gap-2">
                              <span className="mt-1 w-2 h-2 bg-[#232323] rounded-full inline-block" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-sm text-[#232323]">
                                    {award.award_name}/ {award.award_org}
                                  </span>
                                  <button className="p-1 hover:bg-gray-100 rounded-full">
                                    <FiEdit2
                                      size={16}
                                      className="text-[#A1A1A1]"
                                    />
                                  </button>
                                </div>
                                <div className="text-xs text-[#232323]">
                                  {new Date(
                                    award.awarded_date
                                  ).toLocaleDateString("en-IN", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </div>
                                <div className="text-xs text-[#A1A1A1] mb-1">
                                  {award.description ? award.description : " -"}
                                </div>
                                <div className="inline-flex items-center gap-2 bg-[#F8FAFB] rounded-lg px-3 py-1 mt-1 border border-[#E6E6E6]">
                                  <img
                                    src="/src/assets/images/Frame (8).svg"
                                    alt="PDF"
                                    className="w-5 h-5"
                                  />
                                  <span className="text-xs text-[#232323] font-medium truncate max-w-[120px]">
                                    Document Name.pdf
                                  </span>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Details Grid Section */}
            <div className="bg-white rounded-2xl shadow p-6 mb-8 grid grid-cols-3 gap-8 text-sm font-medium text-[#232323] relative">
              {/* Edit button at top right */}
              <button
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded"
                onClick={handleMentorEditClick}
                title="Edit Mentor & Details"
              >
                <FiEdit2 size={20} className="text-[#45C74D]" />
              </button>
              <div>
                <div className="flex items-center gap-1 mb-1 font-semibold">
                  Mentors
                </div>
                <div className="text-[#A1A1A1]">
                  {startupData.mentor_associated || "N/A"}
                </div>
                <div className="mt-6 font-semibold">
                  CIN/ Registration Number
                </div>
                <div className="text-[#A1A1A1]">
                  {startupData.cin_registration_number || "N/A"}
                </div>
                <div className="mt-6 font-semibold">Year of Graduation</div>
                <div className="text-[#A1A1A1]">
                  {startupData.startup_yog || "N/A"}
                </div>
                <div className="mt-6 font-semibold">Current Funding State</div>
                <div className="text-[#A1A1A1]">
                  {startupData.funding_stage || "N/A"}
                </div>
                <div className="mt-6 font-semibold">Academic Background</div>
                <div className="text-[#A1A1A1]">
                  {startupData.academic_background || "N/A"}
                </div>
                {/* <div className="mt-6 font-semibold">Cohort( Name & Year )</div>
                <div className="text-[#A1A1A1]">
                  {startupData.startup_cohort || "N/A"}
                </div> */}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1 font-semibold">
                  Role of Faculty{" "}
                </div>
                <div className="text-[#A1A1A1]">
                  {startupData.role_of_faculty || "N/A"}
                </div>
                {/* <div className="mt-6 font-semibold">Industry</div>
                <div className="text-[#A1A1A1]">
                  {startupData.startup_industry || "N/A"}
                </div> */}
                <div className="mt-6 font-semibold">Graduated To </div>
                <div className="text-[#A1A1A1]">
                  {startupData.graduated_to === "Other"
                    ? startupData.graduated_to_other || "N/A"
                    : startupData.graduated_to || "N/A"}
                </div>
                <div className="mt-6 font-semibold">
                  Officially Registered as
                </div>
                <div className="text-[#A1A1A1]">
                  {startupData.register || "N/A"}
                </div>
                <div className="mt-6 font-semibold">Mode of Entry</div>
                <div className="text-[#A1A1A1]">
                  {startupData.startup_community || "N/A"}
                </div>
              </div>
              <div>
                <div className="font-semibold mb-1">Cohort( Name & Year )</div>
                <div className="text-[#A1A1A1]">
                  {startupData.startup_cohort || "N/A"}
                </div>
                <div className="mt-6 font-semibold">Technology</div>
                <div className="text-[#A1A1A1]">
                  {startupData.startup_technology || "N/A"}
                </div>
                <div className="mt-6 font-semibold">DPIIT Number</div>
                <div className="text-[#A1A1A1]">
                  {startupData.dpiit || "N/A"}
                </div>
                <div className="mt-6 font-semibold">PIA</div>
                <div className="text-[#A1A1A1]">
                  {startupData.pia_state || "N/A"}
                </div>
              </div>
            </div>

            {/* Founders Section */}
            <div className="bg-white rounded-2xl shadow p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg text-[#45C74D]">
                    Founders
                  </span>
                  {/* <span className="font-semibold text-lg text-[#A1A1A1]">Team Members</span> */}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      // Pass the startup data with the email address
                      const founderData = {
                        ...startupData,
                        email_address:
                          startupData.email_address ||
                          startupData.official_email_address,
                      };
                      setSelectedFounder(founderData);
                      setShowFounderEditForm(true);
                    }}
                  >
                    <FiEdit2 size={22} className="text-[#45C74D]" />
                  </button>
                  <button
                    onClick={() => {
                      // Pass the startup's email address for the API to identify which startup to update
                      const founderData = {
                        email_address:
                          startupData.email_address ||
                          startupData.official_email_address,
                      };
                      setSelectedFounder(founderData);
                      setShowAddForm(true);
                    }}
                  >
                    <MdOutlineAdd size={22} className="text-[#45C74D]" />
                  </button>
                  {/* <button className="p-1 hover:bg-gray-100 rounded-full"><BsThreeDotsVertical size={22} className="text-[#A1A1A1]" /></button> */}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {/* Founder 1 */}
                <div className="flex items-center gap-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Founder"
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-base">
                      {startupData.founder_name}
                    </div>
                    <div className="text-sm text-[#A1A1A1]">
                      {startupData.founder_email}
                    </div>
                    <div className="text-sm text-[#A1A1A1]">
                      {startupData.founder_number}
                    </div>
                  </div>
                </div>

                {/* Funding Section */}
                <div className=" mt-11">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-lg text-[#232323]">
                      Funding
                    </span>
                    <div className="flex items-center gap-2">
                      {/* <button
                        className="bg-[#45C74D] text-white px-8 py-2 rounded-lg text-base font-semibold shadow hover:bg-[#36a03d] transition"
                        onClick={handleFundingClick}
                      >
                        View
                      </button> */}
                      <button
                        className="p-1 hover:bg-gray-100 rounded-full"
                        onClick={handleFundingClick}
                      >
                        <MdOutlineAdd size={22} className="text-[#45C74D]" />
                      </button>
                    </div>
                  </div>
                    <div className="grid grid-cols-4 gap-6">
                      <div
                        className="bg-white rounded-2xl shadow p-6 flex flex-col items-start min-h-[120px] relative"
                        style={{
                          background:
                            "linear-gradient(0deg, #E9F7F1 60%, #fff 100%)",
                        }}
                      >
                        <span className="font-semibold text-sm text-[#232323] mb-1">
                          Funding Disbursed
                        </span>
                        <span className="font-bold text-2xl text-[#232323] mb-2">
                           Rs. {fundingAmount?.funding_disbursed || 0}
                        </span>
                        <img
                          src="/src/assets/images/Frame (9).svg"
                          alt="icon"
                          className="absolute top-4 right-4 w-6 h-6 opacity-30"
                        />
                        <svg
                          className="absolute bottom-2 left-2 w-20 h-8"
                          viewBox="0 0 80 32"
                        >
                          <polyline
                            points="0,32 20,20 40,28 60,10 80,16"
                            fill="none"
                            stroke="#45C74D"
                            strokeWidth="3"
                          />
                        </svg>
                      </div>

                      <div
                        className="bg-white rounded-2xl shadow p-6 flex flex-col items-start min-h-[120px] relative"
                        style={{
                          background:
                            "linear-gradient(0deg, #FFF7E6 60%, #fff 100%)",
                        }}
                      >
                        <span className="font-semibold text-sm text-[#232323] mb-1">
                          Funding Utilized
                        </span>
                        <span className="font-bold text-2xl text-[#232323] mb-2">
                           Rs. {fundingAmount?.funding_utilized || 0}
                        </span>
                        <img
                          src="/src/assets/images/Frame (9).svg"
                          alt="icon"
                          className="absolute top-4 right-4 w-6 h-6 opacity-30"
                        />
                        <svg
                          className="absolute bottom-2 left-2 w-20 h-8"
                          viewBox="0 0 80 32"
                        >
                          <polyline
                            points="0,32 20,20 40,28 60,10 80,16"
                            fill="none"
                            stroke="#FFA726"
                            strokeWidth="3"
                          />
                        </svg>
                      </div>

                      <div
                        className="bg-white rounded-2xl shadow p-6 flex flex-col items-start min-h-[120px] relative"
                        style={{
                          background:
                            "linear-gradient(0deg, #FFE6E6 60%, #fff 100%)",
                        }}
                      >
                        <span className="font-semibold text-sm text-[#232323] mb-1">
                          Balance
                        </span>
                        <span className="font-bold text-2xl text-[#232323] mb-2">
                          Rs. {fundingAmount?.balance || 0}
                        </span>
                        <img
                          src="/src/assets/images/Frame (9).svg"
                          alt="icon"
                          className="absolute top-4 right-4 w-6 h-6 opacity-30"
                        />
                        <svg
                          className="absolute bottom-2 left-2 w-20 h-8"
                          viewBox="0 0 80 32"
                        >
                          <polyline
                            points="0,32 20,20 40,28 60,10 80,16"
                            fill="none"
                            stroke="#FF5252"
                            strokeWidth="3"
                          />
                        </svg>
                      </div>

                      <div
                        className="bg-white rounded-2xl shadow p-6 flex flex-col items-start min-h-[120px] relative"
                        style={{
                          background:
                            "linear-gradient(0deg, #E6F0FF 60%, #fff 100%)",
                        }}
                      >
                        <span className="font-semibold text-sm text-[#232323] mb-1">
                          External Funding
                        </span>
                        <span className="font-bold text-2xl text-[#232323] mb-2">
                          Rs. {fundingAmount?.external_funding}
                        </span>
                        <img
                          src="/src/assets/images/Frame (9).svg"
                          alt="icon"
                          className="absolute top-4 right-4 w-6 h-6 opacity-30"
                        />
                        <svg
                          className="absolute bottom-2 left-2 w-20 h-8"
                          viewBox="0 0 80 32"
                        >
                          <polyline
                            points="0,32 20,20 40,28 60,10 80,16"
                            fill="none"
                            stroke="#42A5F5"
                            strokeWidth="3"
                          />
                        </svg>
                      </div>
                    </div>
                </div>

                {/* Gallery & Documents Section */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {/* <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-lg text-[#232323]">Gallery</span>
                  <button className="p-1 hover:bg-gray-100 rounded-full"><BsThreeDotsVertical size={22} className="text-[#A1A1A1]" /></button>
                </div>
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80" alt="Gallery 1" className="w-full h-full object-cover" />
                    <img src="/src/assets/images/Frame (9).svg" alt="Pin" className="absolute top-2 right-2 w-5 h-5" />
                  </div>
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80" alt="Gallery 2" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80" alt="Gallery 3" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80" alt="Gallery 4" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div> */}
                  {/* Documents */}
                  {/* <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-lg text-[#232323]">Documents</span>
                  <button className="p-1 hover:bg-gray-100 rounded-full"><BsThreeDotsVertical size={22} className="text-[#A1A1A1]" /></button>
                </div>
                <div className="flex gap-4">
                  <div className="inline-flex items-center gap-2 bg-[#F8FAFB] rounded-lg px-3 py-2 border border-[#E6E6E6]">
                    <img src="/src/assets/images/Frame (8).svg" alt="PDF" className="w-5 h-5" />
                    <span className="text-xs text-[#232323] font-medium truncate max-w-[80px]">Pre-incubation...</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-[#F8FAFB] rounded-lg px-3 py-2 border border-[#E6E6E6]">
                    <img src="/src/assets/images/Frame (8).svg" alt="PDF" className="w-5 h-5" />
                    <span className="text-xs text-[#232323] font-medium truncate max-w-[80px]">Letter of Recomm...</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-[#F8FAFB] rounded-lg px-3 py-2 border border-[#E6E6E6]">
                    <img src="/src/assets/images/Frame (8).svg" alt="PDF" className="w-5 h-5" />
                    <span className="text-xs text-[#232323] font-medium truncate max-w-[80px]">Document Name.pdf</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-[#F8FAFB] rounded-lg px-3 py-2 border border-[#E6E6E6]">
                    <img src="/src/assets/images/Frame (8).svg" alt="PDF" className="w-5 h-5" />
                    <span className="text-xs text-[#232323] font-medium truncate max-w-[80px]">Document Name.pdf</span>
                  </div>
                </div>
              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showEditForm && (
        <EditStartupForm
          initialData={startupData}
          onClose={handleEditClose}
          onSubmit={handleEditSubmit}
        />
      )}
      {showAboutForm && (
        <EditAboutForm
          initialData={startupData}
          onClose={handleAboutClose}
          onSubmit={handleAboutSubmit}
        />
      )}
      {showAddAwardForm && (
        <AddAwardForm
          officialEmail={startupData?.email_address}
          startup_id={startupData?.startup_id}
          onClose={handleAddAwardClose}
          onSubmit={handleAddAwardSubmit}
        />
      )}
      {showFounderEditForm && (
        <FounderForm
          initialData={selectedFounder}
          onClose={handleFounderEditClose}
          onSubmit={() => {
            handleFounderEditClose();
            // refresh founders if needed
          }}
        />
      )}

      {showAddForm && (
        <FounderForm
          initialData={null}
          onClose={() => setShowAddForm(false)}
          onSubmit={() => {
            setShowAddForm(false);
            // refresh founders if needed
          }}
        />
      )}
      {showFundingForm && (
        <AddFunding
          startup_name={startupData.startup_name}
          officialEmail={startupData?.email_address}
          onClose={handleFundingClose}
          onSubmit={() => {
            setShowFundingForm(false);
            // refresh founders if needed
          }}
        />
      )}

      {showMentorForm && (
        <EditMentorForm
          initialData={startupData}
          onClose={handleMentorEditClose}
          onSubmit={handleMentorEditSubmit}
        />
      )}

      <ReadMorePopup
        isOpen={showReadMore}
        onClose={() => setShowReadMore(false)}
        title="About Us"
        content={startupData.startup_description}
      />
    </div>
  );
}

export default StartupProfile;
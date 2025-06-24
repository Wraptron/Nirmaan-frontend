import React, { useState } from 'react';
import SideBar from '../../components/sidebar';
import NavBar from '../../components/NavBar';
import { FiEdit2, FiShare2 } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineAdd } from 'react-icons/md';
import bgImg from '../../assets/images/Rectangle 5.svg';
import profileImg from '../../assets/images/296fe121-5dfa-43f4-98b5-db50019738a7.jpg';
import pinSvg from '../../assets/images/Frame (9).svg';
import pdfSvg from '../../assets/images/Frame (8).svg';
import { useParams } from 'react-router-dom';
import EditStartupForm from '../startups/step/EditForm/EditStartupForm';
import EditAboutForm from '../startups/step/EditForm/EditAboutForm';
import AddAwardForm from '../startups/step/EditForm/AddAwardForm';
import EditTeamMembersForm from '../startups/step/EditForm/EditTeamMembersForm';
import EditFundingForm from '../startups/step/EditForm/EditFundingForm';
import toast from 'react-hot-toast';
import EditMentorForm from '../startups/step/EditForm/EditMentorForm';

function StartupProfile() {
  const { id } = useParams();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAboutForm, setShowAboutForm] = useState(false);
  const [showAddAwardForm, setShowAddAwardForm] = useState(false);
  const [showTeamMembersForm, setShowTeamMembersForm] = useState(false);
  const [showFundingForm, setShowFundingForm] = useState(false);
  const [showMentorForm, setShowMentorForm] = useState(false);

  const [startupData, setStartupData] = useState({
    startup_name: "Seat of Joy",
    email: "ed19b063@smail.iitm.ac.in",
    phone: "9840046978",
    linkedin: "linkedin.com/company/seat-of-joy",
    about: "Our Seat of Joy manufacturers a child safety seat for Motorcycles that protects a child during accidents. Our Seat along with protecting the child, also slidable foldable and convertible into a storage box.",
    startup_type: "Hardware",
    sector: "Automotive",
    program: "Nirmaan",
    status: "Active",
    profile_image: profileImg,
    background_image: bgImg,
    awards: []
  });

  // Edit handlers
  const handleEditClick = () => setShowEditForm(true);
  const handleAboutClick = () => setShowAboutForm(true);
  const handleAddAwardClick = () => setShowAddAwardForm(true);
  const handleTeamMembersClick = () => setShowTeamMembersForm(true);
  const handleFundingClick = () => setShowFundingForm(true);
  const handleMentorEditClick = () => setShowMentorForm(true);

  const handleEditClose = () => setShowEditForm(false);
  const handleAboutClose = () => setShowAboutForm(false);
  const handleAddAwardClose = () => setShowAddAwardForm(false);
  const handleTeamMembersClose = () => setShowTeamMembersForm(false);
  const handleFundingClose = () => setShowFundingForm(false);
  const handleMentorEditClose = () => setShowMentorForm(false);

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
      setStartupData(prev => ({
        ...prev,
        about: updatedData.about
      }));
      
    } catch (error) {
      console.error("Error updating about section:", error);
      toast.error("Failed to update about section");
    }
  };

  const handleAddAwardSubmit = async (newAward) => {
    try {
      setStartupData(prev => ({
        ...prev,
        awards: [...prev.awards, newAward]
      }));
      
    } catch (error) {
      console.error("Error adding award:", error);
      toast.error("Failed to add award");
    }
  };

  const handleTeamMembersSubmit = async (updatedData) => {
    try {
      setStartupData(prev => ({
        ...prev,
        founders: updatedData.founders,
        team_members: updatedData.team_members
      }));
      toast.success("Team members updated successfully");
    } catch (error) {
      console.error("Error updating team members:", error);
      toast.error("Failed to update team members");
    }
  };

  const handleFundingSubmit = async (updatedData) => {
    try {
      setStartupData(prev => ({
        ...prev,
        funding_disbursed: updatedData.funding_disbursed,
        funding_utilized: updatedData.funding_utilized,
        external_funding: updatedData.external_funding,
        funding_details: updatedData.funding_details
      }));
      toast.success("Funding information updated successfully");
    } catch (error) {
      console.error("Error updating funding:", error);
      toast.error("Failed to update funding information");
    }
  };

  const handleMentorEditSubmit = async (updatedData) => {
    try {
      setStartupData(prev => ({
        ...prev,
        mentors: updatedData.mentors
      }));
      
    } catch (error) {
      console.error("Error updating mentors:", error);
      toast.error("Failed to update mentors");
    }
  };

  return (
    <div className="flex font-[\'DM Sans\',sans-serif]">
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <NavBar />
        <div className="bg-[#F8FAFB] min-h-screen">
          <div className="mx-auto max-w-6xl py-6">
            {/* Display the id for confirmation */}
            <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">Profile ID: {id}</div>
            {/* Breadcrumb */}
            <div className="text-xs text-[#A1A1A1] mb-2 flex items-center gap-2">
              <span className="material-icons text-base">chevron_left</span>
              Dashboard &gt; Start-ups &gt; Profile
            </div>
            {/* Title */}
            <div className="font-semibold text-2xl mb-6 text-[#232323]">Start-up profile</div>
            {/* Top Profile Section */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Left: Profile Card */}
              <div className="relative bg-white rounded-2xl shadow p-0 flex flex-col min-h-[340px]">
                {/* Background image with edit icon */}
                <div className="relative h-[140px] rounded-t-2xl overflow-hidden">
                  <img src={bgImg} alt="bg" className="w-full h-full object-cover" />
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
                    <img src={profileImg} alt="Profile" className="w-22 h-22 rounded-full object-cover" />
                  </div>
                </div>
                {/* Card content */}
                <div className="flex flex-col items-center pt-20 pb-6 px-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-xl text-[#232323]">Seat of Joy</span>
                    <span className="bg-[#E9F7F1] text-[#45C74D] text-xs font-semibold px-2 py-0.5 rounded ml-1">Active</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#232323] mb-1">
                    <span className="flex items-center gap-1"><span className="material-icons text-base">mail</span> ed19b063@smail.iitm.ac.in</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full inline-block" />
                    <span className="flex items-center gap-1"><span className="material-icons text-base">call</span> +91 98400 46978</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#232323] mb-2">
                    <span className="flex items-center gap-1"><span className="material-icons text-base">link</span> Linked in</span>
                    <button className="ml-2 p-1 hover:bg-gray-100 rounded"><FiShare2 size={18} /></button>
                  </div>
                  {/* Project Timeline */}
                  <div className="w-full mt-2">
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
                  </div>
                </div>
              </div>
              {/* Right: About Us & Awards (Figma accurate) */}
              <div className="flex flex-col gap-6">
                {/* About Us Card */}
                <div className="bg-white rounded-2xl shadow p-6 min-h-[180px] relative flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg text-[#232323]">About Us</span>
                    <button className="p-1 hover:bg-gray-100 rounded-full" onClick={handleAboutClick}>
                      <FiEdit2 size={18} className="text-[#A1A1A1]" />
                    </button>
                  </div>
                  <div className="text-[#232323] text-sm mb-4">
                    Our Seat of Joy manufacturers a child safety seat for Motorcycles that protects a child during accidents. Our Seat along with protecting the child, also slidable foldable and convertible into a storage box.
                  </div>
                  <div className="flex w-full gap-4 text-sm font-medium text-[#232323]">
                    <div className="flex-1">
                      <div className="text-[#A1A1A1] text-xs mb-1">Start-up Type</div>
                      <div>Hardware</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-[#A1A1A1] text-xs mb-1">Sector</div>
                      <div>Automotive</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-[#A1A1A1] text-xs mb-1">Program</div>
                      <div>Nirmaan</div>
                    </div>
                  </div>
                </div>
                {/* Awards & Recognitions Card */}
                <div className="bg-white rounded-2xl shadow p-6 min-h-[180px] relative flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg text-[#232323]">Awards & Recognitions</span>
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded-full" onClick={handleAddAwardClick}>
                        <MdOutlineAdd size={22} className="text-[#45C74D]" />
                      </button>
                    </div>
                  </div>
                  {/* Award List */}
                  <div className="flex flex-col gap-3 mt-2">
                    <div className="flex items-start gap-2">
                      <span className="mt-1 w-2 h-2 bg-[#232323] rounded-full inline-block" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-[#232323]">Award/ Recognition Name</span>
                          <button className="p-1 hover:bg-gray-100 rounded-full"><FiEdit2 size={16} className="text-[#A1A1A1]" /></button>
                        </div>
                        <div className="text-xs text-[#232323]">Award/ Recognition Org - Awarded date</div>
                        <div className="text-xs text-[#A1A1A1] mb-1">Description</div>
                        <div className="inline-flex items-center gap-2 bg-[#F8FAFB] rounded-lg px-3 py-1 mt-1 border border-[#E6E6E6]">
                          <img src="/src/assets/images/Frame (8).svg" alt="PDF" className="w-5 h-5" />
                          <span className="text-xs text-[#232323] font-medium truncate max-w-[120px]">Document Name.pdf</span>
                        </div>
                      </div>
                    </div>
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
                <div className="flex items-center gap-1 mb-1 font-semibold">Mentors <span className="material-icons text-xs text-[#A1A1A1]">expand_more</span></div>
                <div className="text-[#A1A1A1]">Not Associated</div>
                <div className="mt-6 font-semibold">CIN/ Registration Number</div>
                <div className="text-[#A1A1A1]">-</div>
                <div className="mt-6 font-semibold">Year of Graduation</div>
                <div className="text-[#A1A1A1]">-</div>
                <div className="mt-6 font-semibold">Current Funding State</div>
                <div className="text-[#A1A1A1]">-</div>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1 font-semibold">Role of Faculty <span className="material-icons text-xs text-[#A1A1A1]">expand_more</span></div>
                <div className="text-[#A1A1A1]">Name</div>
                <div className="mt-6 font-semibold">Industry</div>
                <div className="text-[#A1A1A1]">Automobiles & Self-Driving Assistances</div>
                <div className="mt-6 font-semibold">Graduated To <span className='material-icons text-xs text-[#A1A1A1]'>expand_more</span></div>
                <div className="text-[#A1A1A1]">-</div>
                <div className="mt-6 font-semibold">Officially Registered as</div>
                <div className="text-[#A1A1A1]">-</div>
              </div>
              <div>
                <div className="font-semibold mb-1">Cohort( Name & Year )</div>
                <div className="text-[#A1A1A1]">2023</div>
                <div className="mt-6 font-semibold">Technology</div>
                <div className="text-[#A1A1A1]">-</div>
                <div className="mt-6 font-semibold">DPIIT Number</div>
                <div className="text-[#A1A1A1]">-</div>
                <div className="mt-6 font-semibold">PIA</div>
                <div className="text-[#A1A1A1]">-</div>
              </div>
            </div>

            {/* Founders Section */}
            <div className="bg-white rounded-2xl shadow p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg text-[#45C74D]">Founders</span>
                  <span className="font-semibold text-lg text-[#A1A1A1]">Team Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded-full" onClick={handleTeamMembersClick}>
                    <FiEdit2 size={22} className="text-[#45C74D]" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded-full"><BsThreeDotsVertical size={22} className="text-[#A1A1A1]" /></button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {/* Founder 1 */}
                <div className="flex items-center gap-4">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Founder" className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="font-semibold text-base">Name (Role)</div>
                    <div className="text-sm text-[#A1A1A1]">ed19b063@smail.iitm.ac.in  |  +91 98400 46978</div>
                    <div className="text-sm text-[#A1A1A1]">Linked in</div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded-full"><BsThreeDotsVertical size={20} className="text-[#A1A1A1]" /></button>
                </div>
                {/* Founder 2 */}
                <div className="flex items-center gap-4">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Founder" className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="font-semibold text-base">Name (Role)</div>
                    <div className="text-sm text-[#A1A1A1]">ed19b063@smail.iitm.ac.in  |  +91 98400 46978</div>
                    <div className="text-sm text-[#A1A1A1]">Linked in</div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded-full"><BsThreeDotsVertical size={20} className="text-[#A1A1A1]" /></button>
                </div>
              </div>
            </div>

            {/* Funding Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-lg text-[#232323]">Funding</span>
                <div className="flex items-center gap-2">
                  <button className="bg-[#45C74D] text-white px-8 py-2 rounded-lg text-base font-semibold shadow hover:bg-[#36a03d] transition" onClick={handleFundingClick}>
                    View
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded-full"><MdOutlineAdd size={22} className="text-[#45C74D]" /></button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-6">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start min-h-[120px] relative" style={{background: 'linear-gradient(0deg, #E9F7F1 60%, #fff 100%)'}}>
                  <span className="font-semibold text-sm text-[#232323] mb-1">Funding Disbursed</span>
                  <span className="font-bold text-2xl text-[#232323] mb-2">Rs. 0</span>
                  <img src="/src/assets/images/Frame (9).svg" alt="icon" className="absolute top-4 right-4 w-6 h-6 opacity-30" />
                  <svg className="absolute bottom-2 left-2 w-20 h-8" viewBox="0 0 80 32"><polyline points="0,32 20,20 40,28 60,10 80,16" fill="none" stroke="#45C74D" strokeWidth="3" /></svg>
                </div>
                {/* Card 2 */}
                <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start min-h-[120px] relative" style={{background: 'linear-gradient(0deg, #FFF7E6 60%, #fff 100%)'}}>
                  <span className="font-semibold text-sm text-[#232323] mb-1">Funding Utilized</span>
                  <span className="font-bold text-2xl text-[#232323] mb-2">Rs. 0</span>
                  <img src="/src/assets/images/Frame (9).svg" alt="icon" className="absolute top-4 right-4 w-6 h-6 opacity-30" />
                  <svg className="absolute bottom-2 left-2 w-20 h-8" viewBox="0 0 80 32"><polyline points="0,32 20,20 40,28 60,10 80,16" fill="none" stroke="#FFA726" strokeWidth="3" /></svg>
                </div>
                {/* Card 3 */}
                <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start min-h-[120px] relative" style={{background: 'linear-gradient(0deg, #FFE6E6 60%, #fff 100%)'}}>
                  <span className="font-semibold text-sm text-[#232323] mb-1">Balance</span>
                  <span className="font-bold text-2xl text-[#232323] mb-2">Rs. 0</span>
                  <img src="/src/assets/images/Frame (9).svg" alt="icon" className="absolute top-4 right-4 w-6 h-6 opacity-30" />
                  <svg className="absolute bottom-2 left-2 w-20 h-8" viewBox="0 0 80 32"><polyline points="0,32 20,20 40,28 60,10 80,16" fill="none" stroke="#FF5252" strokeWidth="3" /></svg>
                </div>
                {/* Card 4 */}
                <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start min-h-[120px] relative" style={{background: 'linear-gradient(0deg, #E6F0FF 60%, #fff 100%)'}}>
                  <span className="font-semibold text-sm text-[#232323] mb-1">External Funding</span>
                  <span className="font-bold text-2xl text-[#232323] mb-2">Rs. 0</span>
                  <img src="/src/assets/images/Frame (9).svg" alt="icon" className="absolute top-4 right-4 w-6 h-6 opacity-30" />
                  <svg className="absolute bottom-2 left-2 w-20 h-8" viewBox="0 0 80 32"><polyline points="0,32 20,20 40,28 60,10 80,16" fill="none" stroke="#42A5F5" strokeWidth="3" /></svg>
                </div>
              </div>
            </div>

            {/* Gallery & Documents Section */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {/* Gallery */}
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
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
              </div>
              {/* Documents */}
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
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
              </div>
            </div>

            {/* Activity Section */}
            <div className="bg-white rounded-2xl shadow p-6 mb-8">
              <div className="font-bold text-lg text-[#232323] mb-4">Activity</div>
              <div className="divide-y divide-[#E6E6E6]">
                <div className="py-3">Activity</div>
                <div className="py-3">Activity</div>
                <div className="py-3">Activity</div>
              </div>
              {/* Pagination */}
              <div className="flex items-center justify-between mt-4 text-xs text-[#A1A1A1]">
                <div className="flex items-center gap-1">
                  <button className="px-2 py-1 rounded hover:bg-gray-100">&laquo;</button>
                  <button className="px-2 py-1 rounded hover:bg-gray-100">&lt;</button>
                  <button className="px-2 py-1 rounded bg-[#45C74D] text-white">1</button>
                  <button className="px-2 py-1 rounded hover:bg-gray-100">2</button>
                  <button className="px-2 py-1 rounded hover:bg-gray-100">3</button>
                  <span>...</span>
                  <button className="px-2 py-1 rounded hover:bg-gray-100">10</button>
                  <button className="px-2 py-1 rounded hover:bg-gray-100">&gt;</button>
                  <button className="px-2 py-1 rounded hover:bg-gray-100">&raquo;</button>
                </div>
                <span>Showing 10 of 50 results</span>
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
          initialData={{}}
          onClose={handleAddAwardClose}
          onSubmit={handleAddAwardSubmit}
        />
      )}
      {showTeamMembersForm && (
        <EditTeamMembersForm
          initialData={startupData}
          onClose={handleTeamMembersClose}
          onSubmit={handleTeamMembersSubmit}
        />
      )}
      {showFundingForm && (
        <EditFundingForm
          initialData={startupData}
          onClose={handleFundingClose}
          onSubmit={handleFundingSubmit}
        />
      )}
      {showMentorForm && (
        <EditMentorForm
          initialData={startupData}
          onClose={handleMentorEditClose}
          onSubmit={handleMentorEditSubmit}
        />
      )}
    </div>
  );
}

export default StartupProfile;
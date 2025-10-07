import React, { useEffect, useRef, useState } from "react";
import { FiEdit2, FiGlobe, FiX } from "react-icons/fi";
import { MdOutlineAdd, MdCall, MdChevronLeft } from "react-icons/md";
import bgImg from "../../../assets/images/Rectangle 5.svg";
import profileImg from "../../../assets/images/296fe121-5dfa-43f4-98b5-db50019738a7.jpg";
import { useLocation, useParams } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import SideBar from "../../Components/Sidebar";
import {
  ApiFetchFunding,
  ApiFetchFundingAmount,
  ApiFetchStartup,
} from "../../../API/API";
import FundingDetail from "../../../pages/Home/Funding/FundingDetail";
import Navbar from "../../Components/Navbar";

function StartupFundingDetail() {
  const { startup_id } = useParams();
  const location = useLocation();

  // get ?page= from URL
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || 1;
  const status = queryParams.get("status") || "All";
  const cohort = queryParams.get("cohort") || "All";
  // console.log("id:", startup_id);
  const [showEditForm, setShowEditForm] = useState(false);

  const [showFundingForm, setShowFundingForm] = useState(false);

  const [showFundingModal, setShowFundingModal] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [fundingData, setFundingData] = useState([]);

  const [startupData, setStartupData] = useState(null);
  const [awards, setAwards] = useState([]);

  const [fundingAmount, setFundingAmount] = useState([]);

  const navigate = useNavigate();

  // Edit handlers
  const handleEditClick = () => setShowEditForm(true);

  const handleFundingClick = () => setShowFundingForm(true);

  const handleFundingModalClick = () => setShowFundingModal(true);

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
   const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 3;
  
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = fundingData.slice(indexOfFirstRow, indexOfLastRow);
  
    const totalPages = Math.ceil(fundingData.length / rowsPerPage);

  const FetchData = async (userId) => {
    try {
      // ---Startup Detail Fetch ---
      const API = await ApiFetchStartup();
      const allStartup = API?.rows || [];
      const selectedstartup = allStartup.find(
        (startup) => String(startup.startup_id) === String(startup_id)
      );
      setStartupData(selectedstartup || null);
      // console.log(selectedstartup)

      const APIFund = await ApiFetchFunding();
      const funding = APIFund?.rows || [];
      const filteredFunding = funding
        .filter((funding) => String(funding.startup_id) === String(startup_id))
        .sort((a, b) => a.id - b.id);
      setFundingData(filteredFunding || []);
      // --- Funding Amount Details Fetch Fetch ---
      const ApiFundingAmount = await ApiFetchFundingAmount();
      const amount = ApiFundingAmount || {};
      const fundamount = selectedstartup?.startup_id
        ? amount[selectedstartup.startup_id] || null
        : null;
      setFundingAmount(fundamount || {});
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

  return (
    <div className="flex font-[\'DM Sans\',sans-serif]">
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <Navbar/>
        <div className="bg-[#F8FAFB] min-h-screen">
          <div className="mx-auto max-w-6xl py-6">
            {/* Breadcrumb */}
            <div className="text-xs text-[#A1A1A1] mb-2 flex items-center gap-2">
              Funding &gt; Startup
            </div>
            {/* Title */}
            <div className="font-semibold text-2xl mb-6 text-[#232323]">
              Funding Profile
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
                      />
                      {startupData.email_address || "-"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#232323] mb-2">
                    <span className="flex items-center gap-1">
                      <MdCall className="text-black w-5 h-5" />{" "}
                      {startupData.official_contact_number || "-"}
                    </span>
                  </div>
                </div>
              </div>
              {/* Right: About Us & Awards (Figma accurate) */}
              <div className="flex flex-col gap-6">
                {/* About Us Card */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-lg text-[#232323]">
                    Funding
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 hover:bg-gray-100 rounded-full"
                      onClick={handleFundingClick}
                    >
                      <MdOutlineAdd size={22} className="text-[#45C74D]" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
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
                      Rs. {fundingAmount?.external_funding || 0}
                    </span>
                    {/* <img
                        src="/src/assets/images/Frame (9).svg"
                        alt="icon"
                        className="absolute top-4 right-4 w-6 h-6 opacity-30"
                      /> */}
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
            </div>
              <div className="items-center justify-between mb-4">
                  <span className="font-bold text-lg text-[#232323]">
                    Transaction History
                  </span>
            <div className="border border-dotted rounded-lg overflow-x-auto mt-5">
              <table className="min-w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-dotted">
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Purpose</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Ref No</th>
                    <th className="px-4 py-2">Document</th>
                    {/* <th className="px-4 py-2">Edit</th> */}
                  </tr>
                </thead>
                <tbody>
                  {currentRows.length === 0 ? (
                    <p className="text-lg text-gray-500">
                      No funding added yet.
                    </p>
                  ) : (
                    currentRows.map((fund) => (
                      <tr key={fund.id} className="border-b border-dotted">
                        <td className="px-4 py-2">
                          {fund.funding_type || "-"}
                        </td>
                        <td className="px-4 py-2">
                          {" "}
                          {Number(fund.amount).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) || "-"}
                        </td>
                        <td className="px-4 py-2">{fund.status || "-"}</td>
                        <td className="px-4 py-2">{fund.purpose || "-"}</td>
                        <td className="px-4 py-2">
                          {fund.funding_date || "-"}
                        </td>
                        <td className="px-4 py-2">
                          {fund.reference_number || "-"}
                        </td>
                        <td className="px-4 py-2">{fund.document || "-"}</td>
                        {/* <td className="px-4 py-2">
                          <FiEdit2
                            onClick={() => {
                              setEditFunding(fund);
                              setShowEditFundingForm(true);
                            }}
                            className="text-[#45C74D]"
                          />
                        </td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Balance + Pagination */}
              <div className="flex justify-between items-center px-4 py-2 border-t border-dotted">
                <span className="text-sm font-medium">
                  Balance: Rs. {fundingAmount?.balance || 0}
                </span>

                {totalPages > 1 && (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="px-2 py-1 border border-gray-400 rounded disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-2 py-1 border border-gray-400 rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartupFundingDetail;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../Finance/Components/Sidebar";
import { FaEllipsisV, FaUser } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import AddFunding from "../../../pages/Home/Funding/AddFunding";
import AddFundingWallet from "./AddFundingWallet";
import toast from "react-hot-toast";
import { ApiFetchFundingAmount, ApiFetchStartup } from "../../../API/API";
import { Navigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";

const Finstartup = () => {
  const [showw, setShoww] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);
  const [showFundingForm, setShowFundingForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [fundingAmount, setFundingAmount] = useState([]);
   const navigate = useNavigate();
const handleFundingClick = (startup) => {
  setSelectedStartup(startup);
  setShowFundingForm(true);
};
const handleFundingClose = () => {
  setShowFundingForm(false);
  setSelectedStartup(null);
};
  const [showFundingWalletForm, setShowFundingWalletForm] = useState(false);
  const handleFundingWalletClick = () => setShowFundingWalletForm(true);
  const handleFundingWalletClose = () => setShowFundingWalletForm(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch startups
      const ApiStartup = await ApiFetchStartup();
      const startupdata = Array.isArray(ApiStartup?.rows)
        ? ApiStartup.rows
        : [];
      const startup = startupdata.sort((a, b) => a.startup_id - b.startup_id);

      // Fetch funding amounts
      const ApiFundingAmount = await ApiFetchFundingAmount();
      const fundingData = ApiFundingAmount || {};

      // Merge both by startup_id
      const merged = startup.map((s) => ({
        ...s,
        funding: fundingData[s.startup_id] || {
          disbursed: 0,
          utilized: 0,
          balance: 0,
        },
      }));

      setData(merged);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch startup data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setShoww(true);
  }, []);

   const filteredStartup = data.filter((startup) =>
  (startup.startup_name || "").toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="flex">
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <div className="fixed top-0 left-[221px] right-0 z-50 bg-white shadow">
          <Navbar/>
        </div>
        <div className="bg-gray-100 pt-20 min-h-screen">
          <div className={`mx-10 py-5 ${showw ? "visible" : ""}`}>
            <div className="border bg-white">
              <div className="px-5 pt-6 text-sm text-[#808080]">
                Dashboard {">"} Start-ups
              </div>
              <div className="font-bold text-lg px-5 pt-3">Start-ups</div>
              {/* Search and Add */}
              <div className="flex flex-wrap items-center justify-between mb-6 px-5 pt-5">
                <div className="relative w-full md:w-1/2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <button
                    className="bg-[#45C74D] text-white px-5 py-2 rounded-lg text-base font-semibold shadow hover:bg-[#36a03d] transition"
                    onClick={handleFundingWalletClick}
                  >
                    Add Funding Wallet
                  </button>
                  <button
                    className="bg-[#45C74D] text-white px-8 py-2 rounded-lg text-base font-semibold shadow hover:bg-[#36a03d] transition"
                    onClick={handleFundingClick}
                  >
                    Add Funding
                  </button>
                </div>
              </div>
              <div className="border mt-5 border-dotted rounded-lg overflow-x-auto">
                <table className="min-w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-dotted">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Cohert</th>
                      <th className="px-4 py-2">Funding Disbursed</th>
                      <th className="px-4 py-2">Funding Utilized</th>
                      <th className="px-4 py-2">Balance</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStartup.map((item) => (
                      <tr
                        key={item.startup_id}
                        className="border-b border-dotted"
                      >
                        <td className="px-4 py-2">{item.startup_name}</td>
                        <td className="px-4 py-2">
                          {item.startup_cohort || "-"}
                        </td>
                        <td className="px-4 py-2">
                          {item.funding?.funding_disbursed || 0}
                        </td>
                        <td className="px-4 py-2">
                          {item.funding?.funding_utilized || 0}
                        </td>
                        <td className="px-4 py-2">
                          {item.funding?.balance || 0}
                        </td>
                        <td className="px-4 py-2">
                          {item.program}
                        </td>
                        <td className="px-4 py-2">
                          <div className="relative inline-block text-right">
                            {/* Ellipsis Button */}
                            <button
                              className="rounded-full p-2 hover:bg-gray-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdownId(
                                  openDropdownId === item.startup_id ? null : item.startup_id
                                );
                              }}
                            >
                              <FaEllipsisV className="text-gray-500" />
                            </button>

                            {/* Dropdown Menu */}
                            {openDropdownId === item.startup_id && (
                              <div
                                className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50"
                                style={{ minWidth: "150px" }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                      navigate(
                                            `/finance/startupdetail/${item.startup_id}`
                                          );
                                    setOpenDropdownId(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  View
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                   handleFundingClick(item);
                                    setOpenDropdownId(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Update
                                </button>
                                {/* <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenEstablishPopUp(true);
                                    setOpenDropdownId(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                  Delete
                                </button> */}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showFundingForm && <AddFunding onClose={handleFundingClose} startup_id={selectedStartup.startup_id} startup_name={selectedStartup.startup_name} />}
      {showFundingWalletForm && (
        <AddFundingWallet onClose={handleFundingWalletClose} />
      )}
    </div>
  );
};

export default Finstartup;

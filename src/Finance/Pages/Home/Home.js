import React, { useState, useEffect } from "react";
import SideBar from "../../Components/Sidebar";
import { SkeletonLoader } from "../../../components/SkeletonLoader";
import {
  ApiFetchFundingProject,
  ApiFetchFundingProjectData,
} from "../../../API/API";
import { FiEdit2 } from "react-icons/fi";
import ProjectFundingDetail from "../Startup/ProjectFundingDetails";
import Navbar from "../../Components/Navbar";
import AddFundingWallet from "../Startup/AddFundingWallet";

function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showw, setShoww] = useState(false);
  const [funding, setFunding] = useState({});
  const [fundingSummary, setFundingSummary] = useState({});
  const [selectedproject, setSelectedProject] = useState(null);
  const [showFundingModal, setShowFundingModal] = useState(false);
  const [showFundingWalletForm, setShowFundingWalletForm] = useState(false);
  const handleFundingWalletClick = () => setShowFundingWalletForm(true);
  const handleFundingWalletClose = () => setShowFundingWalletForm(false);
  const handleFundingModalClose = () => setShowFundingModal(false);

  const projectsDetail = [
    {
      name: "Nirmaan Seed Funding",
      id: "SB1920497ALUMCIEHOC",
    },
    { name: "Shankar Endownment Fund", id: "SB25260212CPALUMCIEHOC" },
    { name: "Nirmaan External", id: "CR23241466CPAAAACIEHOC" },
    { name: "AI for Healthcare", id: "SB21220983CPIITMCIEHOC" },
    { name: "UGFIR", id: "SB20210439CPIITMCIEHOC" },
    { name: "PGFIR", id: "SB1920720CPIITMCIEHOC" },
    { name: "Nirmaan the Pre-Incubator", id: "LM23242568MEIITMMEHOLX" },
    {
      name: "Amex Program for Innovation & Entrepreneurship",
      id: "CR/24-25/1670/ME/AMEX/008469",
    },
  ];

  useEffect(() => {
    setShoww(true);
  }, []);


  const FetchData = async () => {
    try {
      const fundingcount = await ApiFetchFundingProject();
      const totalfunding = fundingcount || {};
      setFunding(totalfunding);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const FundingSummary = (rows) => {
    const summary = {};

    rows.forEach((item) => {
      const name = item.project_name;

      if (!summary[name]) {
        summary[name] = { disbursed: 0, utilized: 0 };
      }

      if (item.funding_type === "Funding Disbursed") {
        summary[name].disbursed += Number(item.amount || 0);
      }

      if (item.funding_type === "Funding Utilized") {
        summary[name].utilized += Number(item.amount || 0);
      }
    });

    return summary;
  };

  const fetchFundingSummary = async () => {
    try {
      const res = await ApiFetchFundingProjectData();
      const rows = res?.rows || [];
      setFundingSummary(FundingSummary(rows));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      FetchData();
      fetchFundingSummary();
    }, 2000);
  }, []);

const formatINR = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

  const handleNavbarSelection = (index) => {
    setSelectedIndex(index);
  };

  const handleFundingModalClick = (project) => {
    FetchData();
    setShowFundingModal(true);
    setSelectedProject(project);
    setShowFundingModal(true);
  };
  return (
    <div className="flex ">
      <div className="">
        <SideBar />
      </div>
      <div className="ml-[221px] flex-grow">
        <div>
          <Navbar
            onSelectionChange={handleNavbarSelection}
            selectedIndex={selectedIndex}
          />
        </div>
        <div className="bg-gray-100 flex-grow overflow-y-auto">
          {selectedIndex === 0 && (
            <div className={`px-10 py-5 content ${showw ? "visible" : ""}`}>
              {/* Your existing dashboard section remains unchanged */}
              <div className="grid grid-cols-2 gap-5 mb-8 w-full ">
                <div className="border bg-white  rounded-xl col-span-2 ">
                  <div className="py-2 px-7 text-xl underline underline-offset-[13px] decoration-gray-200 ">
                    Funding Dashboard
                  </div>
                  {/* <div className="py-2 px-7 text-lg ">Overview</div> */}
                  <div className="flex items-center justify-between">
                    <div className="py-2 px-7 text-2xl text-[#45C74D]  ">
                      Nirmaan
                    </div>
                 
                      <button
                        className="bg-[#45C74D] text-white px-5 py-2 rounded-lg text-base font-semibold shadow hover:bg-[#36a03d] transition"
                        onClick={handleFundingWalletClick}
                      >
                        Add Funding Wallet
                      </button>
                  </div>
                    <div className="grid grid-cols-3 gap-10 px-7 py-2 ">
                    {projectsDetail.map((project, index) => {
                      const disbursed =
                        fundingSummary[project.name]?.disbursed || 0;
                      const utilized =
                        fundingSummary[project.name]?.utilized || 0;
                      const balance = disbursed - utilized;

                      return (
                        <div className="shadow-md border border-sm rounded-lg p-3 min-w-[220px]">
                          {/* <div className="pb-2 flex justify-between">
                            <button className="hover:bg-gray-100 rounded-full">
                              <FiEdit2
                                size={16}
                                className="text-[#45C74D]"
                                onClick={() =>
                                  handleFundingModalClick("Nirmaan Seed Funding")
                                }
                              />
                            </button>
                          </div> */}

                          {/* Total Amount */}
                          <div className="text-center">
                            <div className="text-xs text-gray-500">
                              Total Amount
                            </div>
                            <div className="text-2xl font-semibold">
                              {isLoaded ? (
                                <>
                                 {formatINR(disbursed)}
                                </>
                              ) : (
                                <SkeletonLoader />
                              )}
                            </div>
                          </div>

                          {/* Utilized & Balance */}
                          <div className="flex justify-between mt-3">
                            <div>
                              <div className="text-sm text-gray-500">
                                Fund Utilized
                              </div>
                              <div className="text-sm font-medium text-red-500">
                                {formatINR(utilized)}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm text-gray-500">Balance</div>
                              <div className="text-sm font-semibold text-green-600">
                                {formatINR(balance)}
                              </div>
                            </div>
                          </div>

                          {/* Project Name */}
                          <div className="mt-1 text-center font-medium">
                            <div className="text-lg">{project.name}</div>
                          </div>

                          {/* ID */}
                          <div className="flex gap-1 text-sm justify-center">
                            <div>ID -</div>
                            <div className="text-[#45C74D]">
                              {project.id}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showFundingModal && (
        <ProjectFundingDetail
          onClose={handleFundingModalClose}
          selectedProject={selectedproject}
        />
      )}
      {showFundingWalletForm && (
        <AddFundingWallet onClose={handleFundingWalletClose} />
      )}
    </div>
  );
}
export default Home;

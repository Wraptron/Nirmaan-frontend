import React, { useState, useEffect } from "react";
import SideBar from "../../Components/Sidebar";
import { SkeletonLoader } from "../../../components/SkeletonLoader";
import {
  ApiFetchFundingProject,
  ApiFetchFundingProjectData,
} from "../../../API/API";
import ProjectFundingDetail from "../Startup/ProjectFundingDetails";
import Navbar from "../../Components/Navbar";
import AddFundingWallet from "../Startup/AddFundingWallet";
import { MdViewModule } from "react-icons/md";
import { BsListUl } from "react-icons/bs";

function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showw, setShoww] = useState(false);
  const [funding, setFunding] = useState({});
  const [viewMode, setViewMode] = useState("card");
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
                  <div className="flex flex-wrap items-center justify-between gap-3 py-2 px-7">
                    <div className="text-2xl text-[#45C74D]">Nirmaan</div>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        className="bg-[#45C74D] text-white px-5 py-2 rounded-lg text-base font-semibold shadow hover:bg-[#36a03d] transition"
                        onClick={handleFundingWalletClick}
                      >
                        Add Funding Wallet
                      </button>
                      <div className="flex gap-2 border border-gray-300 rounded-lg p-1 bg-white">
                        <button
                          type="button"
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
                          type="button"
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

                  {viewMode === "card" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-7 py-2">
                      {projectsDetail.map((project, index) => {
                        const disbursed =
                          fundingSummary[project.name]?.disbursed || 0;
                        const utilized =
                          fundingSummary[project.name]?.utilized || 0;
                        const balance = disbursed - utilized;

                        return (
                          <div
                            key={project.id || index}
                            className="shadow-md border border-sm rounded-lg p-3 min-w-[220px]"
                          >
                            <div className="text-center">
                              <div className="text-xs text-gray-500">
                                Total Amount
                              </div>
                              <div className="text-2xl font-semibold">
                                {isLoaded ? (
                                  <>{formatINR(disbursed)}</>
                                ) : (
                                  <SkeletonLoader />
                                )}
                              </div>
                            </div>

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
                                <div className="text-sm text-gray-500">
                                  Balance
                                </div>
                                <div className="text-sm font-semibold text-green-600">
                                  {formatINR(balance)}
                                </div>
                              </div>
                            </div>

                            <div className="mt-1 text-center font-medium">
                              <div className="text-lg">{project.name}</div>
                            </div>

                            <div className="flex gap-1 text-sm justify-center">
                              <div>ID -</div>
                              <div className="text-[#45C74D]">{project.id}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="px-7 pb-6 overflow-x-auto">
                      <table className="min-w-full border-collapse text-left text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50 text-gray-600">
                            <th className="py-3 px-4 font-semibold">
                              Project name
                            </th>
                            <th className="py-3 px-4 font-semibold">Project ID</th>
                            <th className="py-3 px-4 font-semibold text-right">
                              Total disbursed
                            </th>
                            <th className="py-3 px-4 font-semibold text-right">
                              Fund utilized
                            </th>
                            <th className="py-3 px-4 font-semibold text-right">
                              Balance
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {projectsDetail.map((project, index) => {
                            const disbursed =
                              fundingSummary[project.name]?.disbursed || 0;
                            const utilized =
                              fundingSummary[project.name]?.utilized || 0;
                            const balance = disbursed - utilized;

                            return (
                              <tr
                                key={project.id || index}
                                className="border-b border-gray-100 hover:bg-gray-50/80"
                              >
                                <td className="py-3 px-4 font-medium text-gray-900 max-w-[280px]">
                                  {project.name}
                                </td>
                                <td className="py-3 px-4 text-[#45C74D] font-mono text-xs whitespace-nowrap">
                                  {project.id}
                                </td>
                                <td className="py-3 px-4 text-right font-medium tabular-nums">
                                  {isLoaded ? (
                                    formatINR(disbursed)
                                  ) : (
                                    <SkeletonLoader />
                                  )}
                                </td>
                                <td className="py-3 px-4 text-right font-medium text-red-600 tabular-nums">
                                  {isLoaded ? (
                                    formatINR(utilized)
                                  ) : (
                                    <SkeletonLoader />
                                  )}
                                </td>
                                <td className="py-3 px-4 text-right font-semibold text-green-600 tabular-nums">
                                  {isLoaded ? (
                                    formatINR(balance)
                                  ) : (
                                    <SkeletonLoader />
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
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

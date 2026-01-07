import React, { useState, useEffect } from "react";
import SideBar from "../../Components/Sidebar";
import {
  FaBusinessTime,
  FaGlobeAsia,
  FaHeartbeat,
  FaLightbulb,
  FaSeedling,
  FaUniversity,
  FaUserGraduate,
} from "react-icons/fa";
import { SkeletonLoader } from "../../../components/SkeletonLoader";
import { FaHandHoldingDollar } from "react-icons/fa6";
import {
  ApiFetchFundingProject,
  ApiFetchFundingProjectData,
} from "../../../API/API";
import { FiEdit2 } from "react-icons/fi";
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
  const [fundingSummary, setFundingSummary] = useState({});
  const [viewMode, setViewMode] = useState("card");
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
      maximumFractionDigits: 2,
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
                    <div className="flex gap-3">
                      <button
                        className="bg-[#45C74D] text-white px-5 py-2 rounded-lg text-base font-semibold shadow hover:bg-[#36a03d] transition"
                        onClick={handleFundingWalletClick}
                      >
                        Add Funding Wallet
                      </button>
                      <div className="flex gap-2 border border-gray-300 rounded-lg p-1 bg-white">
                        <button
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
                  {viewMode === "card" && (
                    <div className="grid grid-cols-3 gap-10 px-7 py-2 ">
                      <div className="shadow-md border border-sm rounded-lg p-2 min-w-[200px]">
                        <div className="pb-1 flex justify-between">
                          <FaSeedling size={20} className="text-[#45C74D]" />
                          <button className=" hover:bg-gray-100 rounded-full">
                            <FiEdit2
                              size={16}
                              className="text-[#45C74D]"
                              onClick={() =>
                                handleFundingModalClick("Nirmaan Seed Funding")
                              }
                            />
                          </button>
                        </div>

                        <div className="text-2xl font-semibold">
                          {isLoaded ? (
                            <>
                              Rs.{" "}
                              {(
                                funding?.NirmaanSeedFunding || 0
                              ).toLocaleString("en-IN")}
                            </>
                          ) : (
                            <SkeletonLoader />
                          )}
                        </div>
                        <div className="text-sm">Nirmaan Seed Funding</div>
                        <div className="flex gap-1">
                          <div>ID -</div>
                          <div className=" text-[#45C74D]">
                            SB1920497ALUMCIEHOC
                          </div>
                        </div>
                      </div>
                      <div className="shadow-md border border-sm rounded-lg p-2">
                        <div className="pb-1 flex justify-between">
                          <FaHandHoldingDollar
                            size={20}
                            className="text-[#FFB866]"
                          />
                          <button className=" hover:bg-gray-100 rounded-full">
                            <FiEdit2
                              size={16}
                              className="text-[#45C74D]"
                              onClick={() =>
                                handleFundingModalClick(
                                  "Shankar Endownment Fund"
                                )
                              }
                            />
                          </button>
                        </div>
                        <div className="text-2xl font-semibold ">
                          {isLoaded ? (
                            <>
                              Rs.{" "}
                              {(
                                funding?.ShankarEndownmentFund || 0
                              ).toLocaleString("en-IN")}
                            </>
                          ) : (
                            <SkeletonLoader />
                          )}
                        </div>
                        <div className="text-sm">Shankar Endownment Fund</div>
                        <div className="flex gap-1">
                          <div>ID -</div>
                          <div className="text-lg text-[#45C74D]">
                            SB25260212CPALUMCIEHOC
                          </div>
                        </div>
                      </div>
                      <div className="shadow-md border border-sm rounded-lg p-2">
                        <div className="pb-1 flex justify-between">
                          <FaGlobeAsia size={20} className="text-[#45C74D]" />
                          <button className=" hover:bg-gray-100 rounded-full">
                            <FiEdit2
                              size={16}
                              className="text-[#45C74D]"
                              onClick={() =>
                                handleFundingModalClick("Nirmaan External")
                              }
                            />
                          </button>
                        </div>
                        <div className="text-2xl font-semibold">
                          {isLoaded ? (
                            <>
                              Rs.{" "}
                              {(funding?.NirmaanExternal || 0).toLocaleString(
                                "en-IN"
                              )}
                            </>
                          ) : (
                            <SkeletonLoader />
                          )}
                        </div>
                        <div className="text-sm">Nirmaan External</div>
                        <div className="flex gap-1">
                          <div>ID -</div>
                          <div className="text-[#45C74D]">
                            CR23241466CPAAAACIEHOC{" "}
                          </div>
                        </div>
                      </div>
                      <div className="shadow-md border border-sm rounded-lg p-2">
                        <div className="pb-1 flex justify-between">
                          <FaHeartbeat size={20} className="text-[#45C74D]" />
                          <button className=" hover:bg-gray-100 rounded-full">
                            <FiEdit2
                              size={16}
                              className="text-[#45C74D]"
                              onClick={() =>
                                handleFundingModalClick("AI for Healthcare")
                              }
                            />
                          </button>
                        </div>
                        <div className="text-2xl font-semibold">
                          {isLoaded ? (
                            <>
                              Rs.{" "}
                              {(funding?.AIforHealthcare || 0).toLocaleString(
                                "en-IN"
                              )}
                            </>
                          ) : (
                            <SkeletonLoader />
                          )}
                        </div>
                        <div className="text-sm">AI for Healthcare</div>
                        <div className="flex gap-1">
                          <div>ID -</div>
                          <div className="text-[#45C74D]">
                            SB21220983CPIITMCIEHOC
                          </div>
                        </div>
                      </div>
                      <div className="shadow-md border border-sm rounded-lg p-2">
                        <div className="pb-1 flex justify-between">
                          <FaUserGraduate
                            size={20}
                            className="text-[#FFB866]"
                          />
                          <button className=" hover:bg-gray-100 rounded-full">
                            <FiEdit2
                              size={16}
                              className="text-[#45C74D]"
                              onClick={() => handleFundingModalClick("UGFIR")}
                            />
                          </button>
                        </div>
                        <div className="text-2xl font-semibold">
                          {isLoaded ? (
                            <>
                              Rs.{" "}
                              {(funding?.UGFIR || 0).toLocaleString("en-IN")}
                            </>
                          ) : (
                            <SkeletonLoader />
                          )}
                        </div>
                        <div className="text-sm">UGFIR</div>
                        <div className="flex gap-1">
                          <div>ID -</div>
                          <div className="text-[#45C74D]">
                            SB20210439CPIITMCIEHOC
                          </div>
                        </div>
                      </div>
                      <div className="shadow-md border border-sm rounded-lg p-2">
                        <div className="pb-1 flex justify-between">
                          <FaUniversity size={20} className="text-[#45C74D]" />
                          <button className=" hover:bg-gray-100 rounded-full">
                            <FiEdit2
                              size={16}
                              className="text-[#45C74D]"
                              onClick={() => handleFundingModalClick("PGFIR")}
                            />
                          </button>
                        </div>
                        <div className="text-2xl font-semibold">
                          {isLoaded ? (
                            <>
                              RS.{" "}
                              {(funding?.PGFIR || 0).toLocaleString("en-IN")}
                            </>
                          ) : (
                            <SkeletonLoader />
                          )}
                        </div>
                        <div className="text-sm">PGFIR</div>
                        <div className="flex gap-1">
                          <div>ID -</div>
                          <div className=" text-[#45C74D]">
                            SB1920720CPIITMCIEHOC
                          </div>
                        </div>
                      </div>
                      <div className="shadow-md border border-sm rounded-lg p-2">
                        <div className="pb-1 flex justify-between">
                          <FaLightbulb size={20} className="text-[#45C74D]" />
                          <button className=" hover:bg-gray-100 rounded-full">
                            <FiEdit2
                              size={16}
                              className="text-[#45C74D]"
                              onClick={() =>
                                handleFundingModalClick(
                                  "Nirmaan the Pre-Incubator"
                                )
                              }
                            />
                          </button>
                        </div>
                        <div className="text-2xl font-semibold">
                          {isLoaded ? (
                            <>
                              Rs.{" "}
                              {(
                                funding?.NirmaanthePre_Incubator || 0
                              ).toLocaleString("en-IN")}
                            </>
                          ) : (
                            <SkeletonLoader />
                          )}
                        </div>
                        <div className="text-sm">Nirmaan the Pre-Incubator</div>
                        <div className="flex gap-1">
                          <div>ID -</div>
                          <div className=" text-[#45C74D]">
                            LM23242568MEIITMMEHOLX
                          </div>
                        </div>
                      </div>
                      <div className="shadow-md border border-sm rounded-lg p-2">
                        <div className="pb-1 flex justify-between">
                          <FaBusinessTime
                            size={20}
                            className="text-[#FFB866]"
                          />
                          <button className=" hover:bg-gray-100 rounded-full">
                            <FiEdit2
                              size={16}
                              className="text-[#45C74D]"
                              onClick={() =>
                                handleFundingModalClick(
                                  "Amex Program for Innovation & Entrepreneurship"
                                )
                              }
                            />
                          </button>
                        </div>
                        <div className="text-2xl font-semibold">
                          {isLoaded ? (
                            <>
                              RS.{" "}
                              {(
                                funding?.AmexProgramforInnovationEntrepreneurship ||
                                0
                              ).toLocaleString("en-IN")}
                            </>
                          ) : (
                            <SkeletonLoader />
                          )}
                        </div>
                        <div className="text-sm">
                          Amex Program for Innovation & Entrepreneurship
                        </div>
                        <div className="flex gap-1">
                          <div>ID -</div>
                          <div className="text-[#45C74D]">
                            CR/24-25/1670/ME/AMEX/008469
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* List View */}
                  {viewMode === "list" && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-4">
                      <table>
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Project Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Project ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Fund Disbursed
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Fund Utilized
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Balance
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {projectsDetail.map((project, index) => {
                            const disbursed =
                              fundingSummary[project.name]?.disbursed || 0;
                            const utilized =
                              fundingSummary[project.name]?.utilized || 0;
                            const balance = disbursed - utilized;

                            return (
                              <tr
                                key={index}
                                className="hover:bg-gray-50 cursor-pointer transition-colors"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {project.name || "N/A"}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-700">
                                    {project.id || "N/A"}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-700">
                                    {formatINR(disbursed)}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-700">
                                    {formatINR(utilized)}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      balance > 0
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                                  >
                                    {formatINR(balance)}
                                  </span>
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

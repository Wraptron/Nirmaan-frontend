import React, { useState, useEffect } from "react";
import SideBar from "../../Components/Sidebar";
import NavBar from "../../../components/NavBar";
import { FaBusinessTime, FaGlobeAsia, FaGraduationCap, FaHeartbeat, FaLightbulb, FaRocket, FaSeedling, FaUniversity, FaUserGraduate } from "react-icons/fa";
import { SkeletonLoader } from "../../../components/SkeletonLoader";
import dayjs from "dayjs";
import { FaHandHoldingDollar } from "react-icons/fa6";

function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [analysedData, setAnalysedData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showw, setShoww] = useState(false);
  const [startupData, setStartupData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [funding, setFunding] = useState({});

  useEffect(() => {
    setShoww(true);
  }, []);
//   const FetchData = async () => {
//     try {
//       //Dashboard Data
//       const result = await ApiFetchStartupCount();
//       const startupcount = result || {};

//       const fundingcount = await ApiFetchFundingDetain();
//       const totalfunding = fundingcount || {};
//       const fundingWithChartData = {};
//       Object.entries(totalfunding).forEach(([key, value]) => {
//         // simple 5-point rising array
//         const points = [
//           { value: 0 },
//           { value: value * 0.25 },
//           { value: value * 0.5 },
//           { value: value * 0.75 },
//           { value: value },
//         ];
//         fundingWithChartData[key] = points;
//       });
//       setFunding(fundingWithChartData);
//       // FlowChart
//       const result2 = await ApiFetchStartup();
//       const startupdata = result2 || {};

//       const FullData = startupdata.rows || [];
//       const monthMap = {};

//       //Count startups per cohort month
//       FullData.forEach((item) => {
//         const cohortData = item.startup_cohort;
//         if (cohortData) {
//           const formattedMonth = dayjs(cohortData).format("MMM YY");
//           monthMap[formattedMonth] = (monthMap[formattedMonth] || 0) + 1;
//         }
//       });

//       // Convert monthMap to chart data
//       const formattedChartData = Object.entries(monthMap).map(
//         ([month, count]) => ({
//           month,
//           value: count,
//         })
//       );

//       setStartupData(formattedChartData);
//       setAnalysedData(startupcount);
//       setIsLoaded(true);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       FetchData();
//     }, 2000);
//   }, []);

  const fundingConfig = {
    funding_disbursed: {
      title: "Funding Disbursed",
      color: "#4CAF50",
      bgColor: "bg-green-50",
      icon: <div className="w-4 h-4 bg-green-500 rounded-full"></div>,
    },
    funding_utilized: {
      title: "Funding Utilized",
      color: "#FF9800",
      bgColor: "bg-orange-50",
      icon: <div className="w-4 h-4 bg-orange-500 rounded-full"></div>,
    },
    external_funding: {
      title: "External Funding",
      color: "#F44336",
      bgColor: "bg-red-50",
      icon: <div className="w-4 h-4 bg-red-500 rounded-full"></div>,
    },
  };

  // Extract years from startupData for dropdown
  const years = Array.from({ length: 2025 - 2017 + 1 }, (_, i) => 2017 + i);

  // Set default selected year to latest (2025) if not set
  // No need to set default selectedYear, already set to 'all'

  // Filter data for selected year and fill missing months with zero
  const monthsArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let fullYearData;
  if (selectedYear === "all") {
    // Aggregate all years: sum values for each month across all years
    fullYearData = monthsArr.map((month) => {
      // Sum all values for this month (regardless of year)
      const total = startupData
        .filter((d) => d.month.startsWith(month))
        .reduce((sum, d) => sum + (d.value || 0), 0);
      return {
        month, // just 'Jan', 'Feb', etc.
        value: total,
      };
    });
  } else {
    // Show only selected year
    fullYearData = monthsArr.map((month) => {
      const yearShort = String(selectedYear).slice(-2);
      const label = `${month} ${yearShort}`;
      const found = startupData.find((d) => d.month === label);
      return {
        month: label, // 'Jan 24', etc.
        value: found ? found.value : 0,
      };
    });
  }
 

  const handleNavbarSelection = (index) => {
    setSelectedIndex(index);
  };

  


  return (
    <div className="flex ">
      <div className="">
        <SideBar/>
      </div>
      <div className="ml-[221px] flex-grow">
        <div>
          <NavBar
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
                  <div className="py-2 px-7 text-2xl text-[#45C74D]  ">Nirmaan</div>
                  <div className="grid grid-cols-4 gap-10 px-7 py-2 ">
                    <div className="shadow-md border border-sm rounded-lg p-2">
                      <div className="pb-1">
                        <FaSeedling size={20} className="text-[#45C74D]" />
                      </div>
                      <div className="text-2xl font-semibold">
                        {isLoaded ? (
                          analysedData?.startup_total || 0
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                      <div className="text-sm">Nirmaan Seed Funding</div>
                    </div>
                    <div className="shadow-md border border-sm rounded-lg p-2">
                      <div className="pb-1">
                        <FaHandHoldingDollar size={20} className="text-[#FFB866]" />
                      </div>
                      <div className="text-2xl font-semibold">
                        {isLoaded ? (
                          analysedData?.active_startups || 0
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                      <div className="text-sm">Shankar Endownment Fund</div>
                    </div>
                    <div className="shadow-md border border-sm rounded-lg p-2">
                      <div className="pb-1">
                        <FaGlobeAsia size={20} className="text-[#45C74D]" />
                      </div>
                      <div className="text-2xl font-semibold">
                        {isLoaded ? (
                          analysedData?.pratham || 0
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                      <div className="text-sm">Nirmaan External</div>
                    </div>
                    <div className="shadow-md border border-sm rounded-lg p-2">
                      <div className="pb-1">
                        <FaHeartbeat size={20} className="text-[#45C74D]" />
                      </div>
                      <div className="text-2xl font-semibold">
                        {isLoaded ? (
                          analysedData?.akshar || 0
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                      <div className="text-sm">AI for Healthcare</div>
                    </div>
                    <div className="shadow-md border border-sm rounded-lg p-2">
                      <div className="pb-1">
                        <FaUserGraduate size={20} className="text-[#45C74D]" />
                      </div>
                      <div className="text-2xl font-semibold">
                        {isLoaded ? (
                          analysedData?.graduated_startups || 0
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                      <div className="text-sm">UGFIR</div>
                    </div>
                    <div className="shadow-md border border-sm rounded-lg p-2">
                      <div className="pb-1">
                        <FaUniversity size={20} className="text-[#C8DFFF]" />
                      </div>
                      <div className="text-2xl font-semibold">
                        {isLoaded ? (
                          analysedData?.dropped_startups || 0
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                      <div className="text-sm">PGFIR</div>
                    </div>
                    <div className="shadow-md border border-sm rounded-lg p-2">
                      <div className="pb-1">
                        <FaLightbulb size={20} className="text-[#FFD154]" />
                      </div>
                      <div className="text-2xl font-semibold">
                        {isLoaded ? (
                          analysedData?.dropped_startups || 0
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                      <div className="text-sm">Nirmaan the Pre-Incubator</div>
                    </div>
                    <div className="shadow-md border border-sm rounded-lg p-2">
                      <div className="pb-1">
                        <FaBusinessTime size={20} className="text-[#45C74D]" />
                      </div>
                      <div className="text-2xl font-semibold">
                        {isLoaded ? (
                          analysedData?.dropped_startups || 0
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                      <div className="text-sm">Amex Program for Innovation & Entrepreneurship</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Home;

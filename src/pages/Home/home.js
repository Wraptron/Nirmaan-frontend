import React, { useState, useEffect } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import { FaGraduationCap, FaRocket } from "react-icons/fa";
import { SkeletonLoader } from "../../components/SkeletonLoader";
import Teams from "./Teams/Teams";
import Mentor from "./Mentors/Mentor";
import dayjs from "dayjs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  ApiFetchFundingDetain,
  ApiFetchStartup,
  ApiFetchStartupCount,
} from "../../API/API";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { use } from "react";

function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [analysedData, setAnalysedData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showw, setShoww] = useState(false);
  const [startupData, setStartupData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [funding, setFunding] = useState({});
  const navigate = useNavigate()

  const handleopenipdetails = () => {
    navigate("/home/ipcreated");
  }
  const handleopenpiadetails = () => {
    navigate("/home/pia");
  }
  const handleopeniitmicdetails = () => {
    navigate("/home/iitmic");
  }

  useEffect(() => {
    setShoww(true);
  }, []);
  const FetchData = async () => {
    try {
      //Dashboard Data
      const result = await ApiFetchStartupCount();
      const startupcount = result || {};

      const fundingcount = await ApiFetchFundingDetain();
      const totalfunding = fundingcount || {};
      const fundingWithChartData = {};
      Object.entries(totalfunding).forEach(([key, value]) => {
        // simple 5-point rising array
        const points = [
          { value: 0 },
          { value: value * 0.25 },
          { value: value * 0.5 },
          { value: value * 0.75 },
          { value: value },
        ];
        fundingWithChartData[key] = points;
      });
      setFunding(fundingWithChartData);
      // FlowChart
      const result2 = await ApiFetchStartup();
      const startupdata = result2 || {};

      const FullData = startupdata.rows || [];
      const monthMap = {};

      //Count startups per cohort month
      FullData.forEach((item) => {
        const cohortData = item.startup_cohort;
        if (cohortData) {
          const formattedMonth = dayjs(cohortData).format("MMM YY");
          monthMap[formattedMonth] = (monthMap[formattedMonth] || 0) + 1;
        }
      });

      // Convert monthMap to chart data
      const formattedChartData = Object.entries(monthMap).map(
        ([month, count]) => ({
          month,
          value: count,
        })
      );

      setStartupData(formattedChartData);
      setAnalysedData(startupcount);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      FetchData();
    }, 2000);
  }, []);

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
  const filteredStartupData = fullYearData;
  // Calculate total for the selected year or all years
  const totalForYear = filteredStartupData.reduce(
    (sum, d) => sum + (d.value || 0),
    0
  );
  // Calculate grand total (sum of all data in startupData)
  const grandTotal = startupData.reduce((sum, d) => sum + (d.value || 0), 0);

  const handleNavbarSelection = (index) => {
    setSelectedIndex(index);
  };

  const mentoringData = [
    {
      name: "STINGA",
      date: "Feb 25",
      time: "2 hr",
      color: "#FFB866",
      avatars: ["👤", "👤", "👤"],
    },
    {
      name: "FITQUEST",
      date: "May 25",
      time: "5 hr",
      color: "#4CAF50",
      avatars: ["👤", "👤", "👤"],
    },
    {
      name: "AIKHART",
      date: "Apr 25",
      time: "4 hr",
      color: "#FF6B6B",
      avatars: ["👤", "👤", "👤"],
    },
    {
      name: "NEXGEN",
      date: "Jun 25",
      time: "6 hr",
      color: "#2196F3",
      avatars: ["👤", "👤", "👤"],
    },
  ];

  const FundingCard = ({ title, amount, color, bgColor, icon, data }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`p-2 rounded-lg ${bgColor}`}>{icon}</div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-4">{amount}</div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id={`gradient-${title}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#gradient-${title})`}
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const token = sessionStorage.getItem("token");
 
  if (!token) {
    sessionStorage.clear();
    localStorage.clear();
    return <Navigate to="/" replace />;
  }
 
  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (e) {
    sessionStorage.clear();
    localStorage.clear();
    return <Navigate to="/" replace />;
  }
 
  if (decoded.role !== 2) {
    sessionStorage.clear();
    localStorage.clear();
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="flex">
      <div className="">
        <SideBar />
      </div>
      <div className="ms-[221px] flex-grow">
        <div>
          <NavBar
            onSelectionChange={handleNavbarSelection}
            selectedIndex={selectedIndex}
          />
        </div>
        <div className="bg-gray-100">
          {selectedIndex === 0 && (
            <div className={`mx-10 py-5 content ${showw ? "visible" : ""}`}>
              {/* Your existing dashboard section remains unchanged */}
              <div className="grid grid-cols-3 gap-5 mb-8">
                <div className="border bg-white rounded-xl col-span-2">
                  <div className="py-2 px-7 text-xl underline underline-offset-[13px] decoration-gray-200 ">
                    General Dashboard
                  </div>
                  <div className="py-2 px-7 text-lg ">Overview</div>
                  <div className="grid grid-cols-4 gap-10 px-7 py-2">
                    <div className="shadow-md border border-sm rounded-lg p-2">
                      <div className="pb-1">
                        <FaRocket size={20} className="text-[#45C74D]" />
                      </div>
                      <div className="text-2xl font-semibold">
                        {isLoaded ? (
                          analysedData?.startup_total || 0
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                      <div className="text-sm">Total Start-ups</div>
                    </div>
                    <div className="shadow-md border border-sm rounded-lg p-2">
                      <div className="pb-1">
                        <FaRocket size={20} className="text-[#FFB866]" />
                      </div>
                      <div className="text-2xl font-semibold">
                        {isLoaded ? (
                          analysedData?.active_startups || 0
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                      <div className="text-sm">Active Start-ups</div>
                    </div>
                    <div className="shadow-md border border-sm rounded-lg p-2">
                      <div className="pb-1">
                        <FaRocket size={20} className="text-[#45C74D]" />
                      </div>
                      <div className="text-2xl font-semibold">
                        {isLoaded ? (
                          analysedData?.pratham || 0
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                      <div className="text-sm">Pratham</div>
                    </div>
                    <div className="shadow-md border border-sm rounded-lg p-2">
                      <div className="pb-1">
                        <FaRocket size={20} className="text-[#45C74D]" />
                      </div>
                      <div className="text-2xl font-semibold">
                        {isLoaded ? (
                          analysedData?.akshar || 0
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                      <div className="text-sm">Akshar</div>
                    </div>
                    <div className="shadow-md border border-sm rounded-lg p-2">
                      <div className="pb-1">
                        <FaGraduationCap size={20} className="text-[#45C74D]" />
                      </div>
                      <div className="text-2xl font-semibold">
                        {isLoaded ? (
                          analysedData?.graduated_startups || 0
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                      <div className="text-sm">Graduated</div>
                    </div>
                    <div className="shadow-md border border-sm rounded-lg p-2">
                      <div className="pb-1">
                        <FaGraduationCap size={20} className="text-[#C8DFFF]" />
                      </div>
                      <div className="text-2xl font-semibold">
                        {isLoaded ? (
                          analysedData?.dropped_startups || 0
                        ) : (
                          <SkeletonLoader />
                        )}
                      </div>
                      <div className="text-sm">Dropped out</div>
                    </div>
                  </div>
                </div>
                {/* Right side box */}
                <div className="bg-white rounded-xl shadow-md flex flex-col justify-between p-8">
                  <div
                    className="flex items-center mb-8 cursor-pointer"
                    onClick={handleopenipdetails}
                  >
                    <div className="bg-pink-100 rounded-full p-2 mr-4">
                      <FaGraduationCap className="text-pink-400" size={24} />
                    </div>
                    <div className="flex-1 poi">
                      <div className="text-sm font-medium text-gray-500">
                        IP's Created
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 ml-4">
                      {analysedData.IP}
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div className="flex items-center mb-8 cursor-pointer" onClick={handleopenpiadetails}>
                    <div className="bg-blue-100 rounded-full p-2 mr-4">
                      <FaRocket className="text-blue-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-500">
                        PIA
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 ml-4">
                      {analysedData.PIA}
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div className="flex items-center cursor-pointer" onClick={handleopeniitmicdetails}>
                    <div className="bg-green-100 rounded-full p-2 mr-4">
                      <FaGraduationCap className="text-green-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-500">
                        IITMIC
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 ml-4">
                      {analysedData.IITMIC}
                    </div>
                  </div>
                </div>
              </div>
              {/* New Funding Section */}
              {/* <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Funding
                  </h2>
                  <div className="p-2 border rounded-lg">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {Object.entries(funding).map(([key, data]) => {
                    const config = fundingConfig[key];
                    if (!config) return null;

                    const latestValue = data[data.length - 1].value || 0;

                    return (
                      <FundingCard
                        key={key}
                        title={config.title}
                        amount={`Rs. ${latestValue.toLocaleString()}`}
                        icon={config.icon}
                        color={config.color}
                        bgColor={config.bgColor}
                        data={data}
                      />
                    );
                  })}
                </div>
              </div> */}
              {/* New Start-ups Chart Section */}
              {/* <div className="mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Start-ups
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="text-base font-semibold text-green-700">
                        Total:{" "}
                        {selectedYear === "all" ? grandTotal : totalForYear}
                      </div>
                      <select
                        className="border rounded px-2 py-1 text-sm"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                      >
                        <option value="all">All</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={filteredStartupData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorStartup"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#4CAF50"
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="100%"
                              stopColor="#4CAF50"
                              stopOpacity={0.05}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#666" }}
                          interval={0}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis hide />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#4CAF50"
                          fill="url(#colorStartup)"
                          strokeWidth={3}
                          dot={{
                            r: 6,
                            fill: "#4CAF50",
                            strokeWidth: 2,
                            stroke: "#fff",
                          }}
                          activeDot={{ r: 8, fill: "#4CAF50" }}
                          label={{
                            position: "top",
                            fontSize: 12,
                            fill: "#666",
                            fontWeight: "bold",
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div> */}
            </div>
          )}
          {selectedIndex === 1 && <Teams props={analysedData} />}
          {selectedIndex === 2 && <Mentor />}
          {selectedIndex === 3 && <Mentor />}
        </div>
      </div>
    </div>
  );
}
export default Home;

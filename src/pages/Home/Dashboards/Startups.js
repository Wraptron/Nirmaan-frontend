import React, { useState, useEffect } from "react";

import { FaGraduationCap, FaRocket, FaRupeeSign } from "react-icons/fa";
import { SkeletonLoader } from "../../../components/SkeletonLoader";
import dayjs from "dayjs";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
  Tooltip,
} from "recharts";
import { ApiFetchDashboardOverviewSummary } from "../../../API/API";
import { Navigate, useNavigate } from "react-router-dom";
import { clearAuthSession, getSessionUser, isAuthenticated } from "../../../utils/authSession";

function Startups() {
  const [analysedData, setAnalysedData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showw, setShoww] = useState(false);
  const [startupData, setStartupData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const navigate = useNavigate();

  const handleopenipdetails = () => {
    navigate("/home/ipcreated");
  };
  const handleopenpiadetails = () => {
    navigate("/home/pia");
  };
  const handleopeniitmicdetails = () => {
    navigate("/home/iitmic");
  };

  useEffect(() => {
    setShoww(true);
  }, []);
  const FetchData = async () => {
    try {
      const summary = await ApiFetchDashboardOverviewSummary();
      const startupcount = summary.startupCounts || {};
      const startupdata = summary.startups || {};

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

  if (!isAuthenticated()) {
    clearAuthSession();
    return <Navigate to="/" replace />;
  }

  const decoded = getSessionUser();
  if (decoded.role !== 2) {
    clearAuthSession();
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-gray-100 ">
      <div className="grid grid-cols-3 gap-5 ">
        <div className="border bg-white rounded-xl col-span-3">
          <div className="py-2 px-7 text-xl underline underline-offset-[13px] decoration-gray-200 ">
            Startup Dashboard
          </div>
          <div className="py-2 px-7 text-lg ">Overview</div>
          <div className="flex w-full gap-6">
            {/* LEFT SIDE */}
            <div className="w-1/2">
              <div className="grid grid-cols-2 gap-10 px-7 py-2">
                <div className="shadow-md border border-sm rounded-lg p-2 ">
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
                    {isLoaded ? analysedData?.pratham || 0 : <SkeletonLoader />}
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
            <div className="bg-white w-1/2 rounded-xl shadow-md flex flex-col justify-between p-8">
              <div
                className="flex items-center mb-4 cursor-pointer"
                onClick={handleopenipdetails}
              >
                <div className="bg-pink-100 rounded-full p-2 mr-4">
                  <FaGraduationCap className="text-pink-400" size={24} />
                </div>
                <div className="flex-1 poi">
                  <div className="text-sm font-medium text-gray-500">
                    Under Graduate FIR
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 ml-4">-</div>
              </div>
              <hr className="my-4" />
              <div
                className="flex items-center mb-4 cursor-pointer"
                onClick={handleopenpiadetails}
              >
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <FaRocket className="text-blue-400" size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-500">
                    Post Graduate FIR
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 ml-4">-</div>
              </div>
              <hr className="my-4" />
              <div
                className="flex items-center mb-4 cursor-pointer"
                onClick={handleopeniitmicdetails}
              >
                <div className="bg-green-100 rounded-full p-2 mr-4">
                  <FaGraduationCap className="text-green-400" size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-500">
                    IP's Created
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 ml-4">
                  {analysedData.IP}
                </div>
              </div>
              <hr className="my-4" />
              <div
                className="flex items-center  cursor-pointer"
                onClick={handleopeniitmicdetails}
              >
                <div className="bg-green-100 rounded-full p-2 mr-4">
                  <FaGraduationCap className="text-green-400" size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-500">
                    MS(Entrepreneurship)
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 ml-4">-</div>
              </div>
            </div>
          </div>
          {/* Impact Section */}
          <div className=" mb-10 py-6">
            <div className="py-2 mb-5 px-7 text-lg">Impact</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-5 px-4">
              {/* Card 1 */}
              <div className="relative bg-white rounded-3xl shadow-lg px-4 pt-14 pb-4">
                {/* Floating Icon */}
                <div className="absolute -top-7 left-8">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center shadow-md">
                    <FaGraduationCap className="text-green-600" size={28} />
                  </div>
                </div>

                <div className="text-4xl font-bold text-gray-900">0</div>
                <div className="text-lg text-gray-600 mt-2">
                  Internships Offered
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative bg-white rounded-3xl shadow-lg px-4 pt-14 pb-4">
                <div className="absolute -top-7 left-8">
                  <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center shadow-md">
                    <FaRupeeSign className="text-pink-600" size={28} />
                  </div>
                </div>

                <div className="text-4xl font-bold text-gray-900">0</div>
                <div className="text-lg text-gray-600 mt-2">
                  Revenue Generated
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative bg-white rounded-3xl shadow-lg px-4 pt-14 pb-4">
                <div className="absolute -top-7 left-8">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center shadow-md">
                    <FaRocket className="text-blue-600" size={28} />
                  </div>
                </div>

                <div className="text-4xl font-bold text-gray-900">0</div>
                <div className="text-lg text-gray-600 mt-2">
                  Start-up Valuation
                </div>
              </div>
            </div>
          </div>
          {/* New Start-ups Chart Section */}
          <div className="mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="py-2 px-7 text-lg">Start-ups</div>
                <div className="flex items-center gap-4 bg-white">
                  <select
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="all">Start-ups by Cohort</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="h-80 border shadow-lg">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={filteredStartupData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
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
                          offset="5%"
                          stopColor="#4ade80"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="#4ade80"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 13, fill: "#6b7280" }}
                      interval={0}
                    />
                    <YAxis hide domain={[0, "dataMax + 5"]} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
                              <p className="text-xs text-gray-600 mb-1">
                                {payload[0].payload.month}
                              </p>
                              <p className="text-lg font-semibold text-gray-900">
                                {payload[0].value}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#4ade80"
                      fill="url(#colorStartup)"
                      strokeWidth={2.5}
                      dot={{
                        r: 5,
                        fill: "#4ade80",
                        strokeWidth: 3,
                        stroke: "#fff",
                      }}
                      activeDot={{
                        r: 6,
                        fill: "#4ade80",
                        strokeWidth: 3,
                        stroke: "#fff",
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Startups;

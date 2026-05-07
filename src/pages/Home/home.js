import React, { useState } from "react";
import Overview from "./Dashboards/Overview";
import { Briefcase, Users, DollarSign, HomeIcon } from "lucide-react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import Startups from "./Dashboards/Startups";
// import UpcomingEvents from "./Dashboards/UpcomingEvents";
import Mentor from "./Dashboards/Mentor";
import FundingDashboard from "./Dashboards/FundingDashboard";

function Home() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="">
        <SideBar />
      </div>
      <div className="ms-[221px] flex-grow">
        <div>
          <NavBar />
        </div>
        {/* Content */}
        <div className="mt-6 px-6">
          <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* LEFT — TAB CONTENT */}
            <div className="xl:col-span-3">
              <div className="flex justify-center mb-6">
                <div className="flex  w-full bg-white rounded-xl shadow-md overflow-hidden">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition
      ${
        activeTab === "overview"
          ? "bg-[#45C74D] text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
                  >
                    <HomeIcon size={18} />
                    Overview
                  </button>

                  <button
                    onClick={() => setActiveTab("startups")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition
      ${
        activeTab === "startups"
          ? "bg-[#45C74D] text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
                  >
                    <Briefcase size={18} />
                    Start-ups
                  </button>

                  <button
                    onClick={() => setActiveTab("mentor")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition
      ${
        activeTab === "mentor"
          ? "bg-[#45C74D] text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
                  >
                    <Users size={18} />
                    Mentor
                  </button>

                  {/* <button
                    onClick={() => setActiveTab("funding")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition
      ${
        activeTab === "funding"
          ? "bg-[#45C74D] text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
                  >
                    <DollarSign size={18} />
                    Funding
                  </button> */}
                </div>
              </div>
              <div>
                {activeTab === "overview" && <Overview />}
                {activeTab === "startups" && <Startups />}
                {activeTab === "mentor" && <Mentor />}
                {activeTab === "funding" && <FundingDashboard />}
              </div>
            </div>

            {/* <div className="xl:col-span-1">
              <UpcomingEvents />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React from 'react'
import { FaChartPie, FaRocket, FaChalkboardTeacher, FaBookOpen, FaRegCalendarCheck } from 'react-icons/fa';
import nirmaanlogo from '../assets/images/nirmaan-iitm.14fdf833.svg';
import { FaPeopleGroup } from 'react-icons/fa6';
import { jwtDecode } from 'jwt-decode';
function SideBar({ children }) {
  const currentPath = window.location.pathname;
    
    const getTokenDecodedData = () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          return jwtDecode(token);
        }
        return null;
      } catch (err) {
        console.log("Error decoding token:", err);
        return null;
      }
    };
  
  const tokenDecodedData = getTokenDecodedData();

 
  return (
    <div className="fixed top-0 left-0 h-screen md:w-[220px] sm:w-9 w-9 m-0 flex flex-col text-black border-r-0 border-gray-500 shadow-md bg-white">
      <div className="md:px-[50px] pt-4">
        <img src={nirmaanlogo} alt="Nirmaan logo" className="w-[120px;]" />
      </div>
      <div className="">
        {tokenDecodedData.role === 2 ? (
          <ul className="py-5 px-8">
            <li
              className={`flex gap-5 hover:bg-[#45C74D] hover:rounded-xl p-2 hover:text-white mb-2 mt-2 ${currentPath === "/home" && "bg-[#45C74D] text-white rounded-xl"}`}
            >
              <a href="/home" className="flex gap-5">
                <FaChartPie size={20} /> Dashboard
              </a>
            </li>
            <li
              className={`flex gap-5 hover:bg-[#45C74D] hover:rounded-xl p-2 hover:text-white mb-2 ${currentPath.startsWith("/startups") && "bg-[#45C74D] text-white rounded-xl"}`}
            >
              <a href="/startups" className="flex gap-5">
                <FaRocket size={20} />
                Start-ups
              </a>
            </li>
            <li
              className={`flex gap-5 hover:bg-[#45C74D] hover:rounded-xl p-2 hover:text-white mb-2 ${
                currentPath.startsWith("/mentors") &&
                currentPath !== "/mentorship"
                  ? "bg-[#45C74D] text-white rounded-xl"
                  : ""
              }`}
            >
              <a href="/mentors" className="flex gap-5">
                <FaChalkboardTeacher size={20} />
                Mentors
              </a>
            </li>
            <li
              className={`flex gap-5 hover:bg-[#45C74D] hover:rounded-xl p-2 hover:text-white mb-2 ${currentPath.startsWith("/mentorship") && "bg-[#45C74D] text-white rounded-xl"}`}
            >
              <a href="/mentorship" className="flex gap-5">
                <FaBookOpen size={20} />
                Mentorships
              </a>
            </li>
            <li
              className={`flex gap-5 hover:bg-[#45C74D] hover:rounded-xl p-2 hover:text-white mb-2 ${currentPath === "/events" && "bg-[#45C74D] text-white rounded-xl"}`}
            >
              <a href="/events" className="flex gap-5">
                <FaRegCalendarCheck size={20} />
                Events
              </a>
            </li>
            <li
              className={`flex gap-5 hover:bg-[#45C74D] hover:rounded-xl p-2 hover:text-white mb-2 ${currentPath === "/connections" && "bg-[#45C74D] text-white rounded-xl"}`}
            >
              <a href="/connections" className="flex gap-5">
                <FaPeopleGroup size={20} />
                Connections
              </a>
            </li>
            {/* <li className={`flex gap-5 hover:bg-[#45C74D] hover:rounded-xl p-2 hover:text-white mb-2 ${currentPath === "/reports" && "bg-[#45C74D] text-white rounded-xl"}`}><a href="/reports" className="flex gap-5"><FaRegFile size={20} />Reports</a></li> */}
          </ul>
        ) : (
          <ul className="py-5 px-8">
            <li
              className={`flex gap-5 hover:bg-[#45C74D] hover:rounded-xl p-2 hover:text-white mb-2 mt-2 ${
                currentPath ===
                  `/startups/startupprofile/${tokenDecodedData.startup_id}` &&
                "bg-[#45C74D] text-white rounded-xl"
              }`}
            >
              <a
                href={`/startups/startupprofile/${tokenDecodedData.startup_id}`}
                className="flex gap-5"
              >
                <FaChartPie size={20} /> Profile
              </a>
            </li>
            <li
              className={`flex gap-5 hover:bg-[#45C74D] hover:rounded-xl p-2 hover:text-white mb-2 ${currentPath === "/startup/startuplist" && "bg-[#45C74D] text-white rounded-xl"}`}
            >
              <a href="/startup/startuplist" className="flex gap-5">
                <FaRocket size={20} />
                Start-ups
              </a>
            </li>
            <li
              className={`flex gap-5 hover:bg-[#45C74D] hover:rounded-xl p-2 hover:text-white mb-2 ${currentPath === "/startup/mentor" && "bg-[#45C74D] text-white rounded-xl"}`}
            >
              <a href="/startup/mentor" className="flex gap-5">
                <FaChalkboardTeacher size={20} />
                Mentors
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
export default SideBar; 
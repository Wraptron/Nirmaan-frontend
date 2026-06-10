import React, { useEffect, useState } from "react";
import SideBar from "../../../components/sidebar";
import Navbar from "../../../components/NavBar";
import { ApiFetchStartup } from "../../../API/API";
import { FaEllipsisV } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { clearAuthSession, getSessionUser, isAuthenticated } from "../../../utils/authSession";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../../utils/getErrorMessage";

const StartupList = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showmentorabout, setShowMentorAbout] = useState(false);
  const handleaboutclose = () => {
    setShowMentorAbout(false);
    };
     const navigate = useNavigate();

  const decoded = isAuthenticated() ? getSessionUser() : null;
  const loggedInStartupId = decoded?.startup_id;

  useEffect(() => {
    if (!isAuthenticated() || decoded?.role !== 5) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const API = await ApiFetchStartup();
        const rows = Array.isArray(API?.rows) ? API.rows : [];
        const sortedData = rows
          .filter(
            (startup) =>
              String(startup.startup_id) !== String(loggedInStartupId)
          )
          .sort((a, b) => Number(a.startup_id) - Number(b.startup_id))
          .map((item, index) => ({
            ...item,
            siNo: index + 1,
          }));
        setData(sortedData);
      } catch (err) {
        toast.error(getErrorMessage(err, "Failed to load startups."));
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [decoded?.role, loggedInStartupId]);

  const filteredStartup = data.filter((startup) =>
    (startup.startup_name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );


  useEffect(() => {
    const handleClickOutside = () => {
      setSelectedStartup(null); // close dropdown
    };

    // Listen for clicks anywhere 
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //   const getTokenDecodedData = () => {
  //       try {
  //         const token = sessionStorage.getItem("token");
  //         if (token) {
  //           return jwtDecode(token);
  //         }
  //         return null;
  //       } catch (err) {
  //         console.log("Error decoding token:", err);
  //         return null;
  //       }
  //     };
    
  // const tokenDecodedData = getTokenDecodedData();
  // if (tokenDecodedData.role !== 5) {
  //   return <Navigate to="/" replace />
  // }

  if (!isAuthenticated()) {
    clearAuthSession();
    return <Navigate to="/" replace />;
  }

  if (decoded?.role !== 5) {
    clearAuthSession();
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <div className="fixed top-0 left-[221px] right-0 z-50 bg-white shadow">
          <Navbar />
        </div>
        <div className="bg-gray-100 pt-20 min-h-screen">
          <div className={`mx-10 py-5 `}>
            <div className="border bg-white">
              <div className="px-5 pt-6 text-sm text-[#808080]">
                Start-ups {">"} Startups
              </div>
              <div className="font-bold text-lg px-5 pt-3">Startup</div>
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
              </div>
              <div className="border mt-5 border-dotted rounded-lg overflow-x-auto">
                <div className="max-h-[calc(100vh-300px)] overflow-auto">
                  <table className="min-w-full text-sm text-left border-collapse">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="border-b border-dotted">
                        <th className="px-4 py-2">SI.No</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Cohort</th>
                        <th className="px-4 py-2">Sector</th>
                        <th className="px-4 py-2">Mentor</th>
                        <th className="px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                            Loading startups...
                          </td>
                        </tr>
                      ) : filteredStartup.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                            No startups found.
                          </td>
                        </tr>
                      ) : (
                      filteredStartup.map((startup) => (
                        <tr key={startup.startup_id} className="border-b border-dotted">
                          <td className="px-4 py-2">{startup.siNo}</td>
                          <td className="px-4 py-2">{startup.startup_name}</td>
                          <td className="px-4 py-2">
                            {startup.startup_cohort || "-"}
                          </td>
                          <td className="px-4 py-2">
                            {startup.startup_sector || "-"}
                          </td>
                          <td className="px-4 py-2">
                            {startup.mentor_associated || "-"}
                          </td>
                          <td className="px-4 py-2">
                            <div className="relative inline-block text-right">
                              {/* Ellipsis Button */}
                              <button
                                className="rounded-full p-2 hover:bg-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedStartup(
                                    selectedStartup?.startup_id ===
                                      startup.startup_id
                                      ? null
                                      : startup
                                  );
                                }}
                              >
                                <FaEllipsisV className="text-gray-500" />
                              </button>
                              {selectedStartup?.startup_id ===
                                startup.startup_id && (
                                <div
                                  className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 max-h-60 overflow-auto "
                                  style={{ minWidth: "150px" }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(
                                        `/startups/startupprofile/${startup.startup_id}`
                                      );
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#45C74D] hover:text-white"
                                  >
                                    View
                                  </button>
                                  {/* <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#45C74D] hover:text-white"
                                >
                                  Connect
                                </button> */}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupList;

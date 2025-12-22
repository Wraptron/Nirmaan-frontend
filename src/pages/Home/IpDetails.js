import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import Navbar from "../../components/NavBar";
import { FaEllipsisV } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { MdChevronLeft } from "react-icons/md";
import { ApiFetchStartup } from "../../API/API";

const IpDetails = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [showmentorabout, setShowMentorAbout] = useState(false);
  const handleaboutclose = () => {
    setShowMentorAbout(false);
  };
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const API = await ApiFetchStartup();
      // sort by mentor_id or any unique field
      const sortedData = API.rows
        .sort((a, b) => a.startup_id - b.startup_id)
        .map((item, index) => ({
          ...item,
          siNo: index + 1,
        }));
      setData(sortedData);
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <div className="fixed top-0 left-[221px] right-0 z-50 bg-white shadow">
          <Navbar />
        </div>
        <div className="bg-gray-100 pt-20 min-h-screen">
          <div className={`mx-10 py-5 `}>
            <div className="border bg-white">
              <div className="flex px-2 pt-6 items-center">
                <button
                  type="button"
                  onClick={() => navigate(`/home`)}
                  className="hover:text-[#45C74D] focus:outline-none"
                  title="Back to Startups"
                >
                  <MdChevronLeft className="text-black text-3xl" />
                </button>
                <div className=" text-sm text-[#808080]">
                  Dashboard {">"} IP Details
                </div>
              </div>
              <div className="font-bold text-lg px-5 pt-3">IP Filed</div>
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
              <div className="border mt-5 border-dotted rounded-lg">
                <div className="max-h-[calc(100vh-320px)] overflow-auto">
                  <table className="min-w-full text-sm text-left border-collapse">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="border-b border-dotted">
                        <th className="px-4 py-2">SI.No</th>
                        <th className="px-4 py-2">Startup Name</th>
                        <th className="px-4 py-2">Patent</th>
                        <th className="px-4 py-2">Design</th>
                        <th className="px-4 py-2">Trademark</th>
                        <th className="px-4 py-2">Copyright</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStartup.length > 0 ? (
                        filteredStartup.map((startup) => (
                          <tr className="border-b border-dotted">
                            <td className="px-4 py-2">{startup.siNo}</td>
                            <td className="px-4 py-2">
                              {startup.startup_name}
                            </td>
                            <td className="px-4 py-2">{startup.patent || '0'}</td>
                            <td className="px-4 py-2">{startup.design || '0'}</td>
                            <td className="px-4 py-2">{startup.trademark || '0'}</td>
                            <td className="px-4 py-2">{startup.copyright || '0'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-4 py-8 text-center text-gray-500"
                          >
                            No records found
                          </td>
                        </tr>
                      )}
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

export default IpDetails;

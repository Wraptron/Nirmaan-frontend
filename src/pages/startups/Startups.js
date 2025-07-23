// import React, { useEffect, useState } from "react";
// import SideBar from "../../components/sidebar";
// import NavBar from "../../components/NavBar";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { FaSpinner, FaEllipsisV } from "react-icons/fa";
// import { ApiDeletStartupData } from "../../API/API";
// import DeleteConfirmation from "../../components/DeleteConfirmation";
// import { useNavigate } from "react-router-dom";

// function Startups() {
//   const [data, setData] = useState([]);
//   const [startupdata, setStartupData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showw, setShoww] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage] = useState(6);
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [openDropdownId, setOpenDropdownId] = useState(null);
//   const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const statusTabs = [
//     { label: "All", value: "All" },
//     { label: "Pratham", value: "Pratham" },
//     { label: "Akshar", value: "Akshar" },
//     { label: "Graduated", value: "Graduated" },
//   ];

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "http://13.127.7.121/api/v1/fetch-startup"
//       );
//       setData(response.data.rows || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("Failed to fetch startup data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     setShoww(true);
//   }, []);

//   const filteredData = data.filter((startup) => {
//     const matchesFilter =
//       filterStatus === "All" ||
//       startup.program?.toLowerCase() === filterStatus.toLowerCase() ||
//       startup.startup_status?.toLowerCase() === filterStatus.toLowerCase();

//     const matchesSearch =
//       startup.startup_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       startup.founder_name?.toLowerCase().includes(searchTerm.toLowerCase());

//     return matchesFilter && matchesSearch;
//   });

//   const indexOfLastItem = currentPage * rowsPerPage;
//   const indexOfFirstItem = indexOfLastItem - rowsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "active":
//         return "bg-[#D8F3D9] text-[#45C74D]";
//       case "graduated":
//         return "bg-[#E8F5E8] text-[#2E7D32]";
//       case "dropped":
//         return "bg-[#FFEBEE] text-[#D32F2F]";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   const handleDelete = async (email) => {
//     try {
//       const API = await ApiDeletStartupData(email);
//       if (API) {
//         toast.success("Details deleted successfully!");
//         const updatedList = data.filter((startup) => startup.email_address !== email);
//         setData(updatedList);
//         setOpenDropdownId(null);
//       } else {
//         toast.error("Failed to delete startup.");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };


//   return (
//     <div className="flex">
//       <SideBar />
//       <div className="ms-[221px] flex-grow">
//         <NavBar />
//         <div className="bg-gray-100 min-h-screen">
//           <div className={`mx-10 py-5 ${showw ? "visible" : ""}`}>
//             <div className="border bg-white">
//               <div className="px-5 pt-6 text-sm text-[#808080]">
//                 Dashboard {">"} Start-ups
//               </div>
//               <div className="font-bold text-lg px-5 pt-3">Start-ups</div>

//               {/* Filter Tabs */}
//               <div className="flex gap-3 px-5 mt-4 overflow-x-auto pb-2">
//                 {statusTabs.map((tab) => (
//                   <button
//                     key={tab.value}
//                     onClick={() => {
//                       setFilterStatus(tab.value);
//                       setCurrentPage(1);
//                     }}
//                     className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm transition-all whitespace-nowrap
//                     ${
//                       filterStatus === tab.value
//                         ? "bg-[#45C74D] text-white"
//                         : "bg-white border text-gray-600 hover:bg-gray-100"
//                     }
//                   `}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>

//               {/* Search & Add */}
//               <div className="flex justify-between px-5 mt-3">
//                 <div className="relative w-72">
//                   <input
//                     type="text"
//                     placeholder="Search by name or founder..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full p-2 px-4 text-sm border border-gray-300 rounded-lg bg-gray-50"
//                   />
//                 </div>
//                 <a
//                   href="/addstartup"
//                   className="bg-[#45C74D] text-white px-4 py-2 rounded-lg text-sm font-semibold"
//                 >
//                   Add New Start-up
//                 </a>
//               </div>

//               {/* Content */}
//               {loading ? (
//                 <div className="flex justify-center items-center py-20">
//                   <FaSpinner className="animate-spin text-4xl text-[#45C74D]" />
//                   <span className="ml-3 text-lg">Loading startups...</span>
//                 </div>
//               ) : (
//                 <>
//                   <div className="pt-3">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-5 mb-2">
//                       {currentItems.length > 0 ? (
//                         currentItems.map((startup, index) => (
//                           <div
//                             key={startup.id || index}
//                             className="border shadow-md rounded-lg p-4 bg-white cursor-pointer hover:shadow-lg transition"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               navigate(
//                                 `/startupprofile/${startup.email_address}`
//                               );
//                             }}
//                           >
//                             <div className="flex justify-between items-center mb-3">
//                               <div
//                                 className={`px-2 py-1 rounded-xl text-xs ${getStatusColor(startup.startup_status)}`}
//                               >
//                                 {startup.startup_status || "Active"}
//                               </div>
//                               <div className="relative">
//                                 <button
//                                   className="p-2 rounded-full hover:bg-gray-100"
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     setOpenDropdownId(
//                                       openDropdownId === startup.email_address
//                                         ? null
//                                         : startup.email_address
//                                     );
//                                   }}
//                                 >
//                                   <FaEllipsisV className="text-gray-500" />
//                                 </button>
//                                 {openDropdownId ===
//                                   startup.email_address && (
//                                   <div
//                                     className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20"
//                                     onClick={(e) => e.stopPropagation()}
//                                   >
//                                     <div className="py-1">
//                                       <button
//                                         onClick={(e) => {
//                                           e.stopPropagation();
//                                           navigate(
//                                             `/startupprofile/${startup.email_address}`
//                                           );
//                                           setOpenDropdownId(null);
//                                         }}
//                                         className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                       >
//                                         View
//                                       </button>
//                                       <button
//                                         onClick={(e) => {
//                                           e.stopPropagation();
//                                           setStartupData(
//                                             startup.email_address
//                                           );
//                                           setOpenEstablishPopUp(true);
//                                           setOpenDropdownId(null);
//                                         }}
//                                         className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                                       >
//                                         Delete
//                                       </button>
//                                     </div>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                             <div className="text-center font-semibold text-lg mb-1">
//                               {startup.startup_name || "Start-up Name"}
//                             </div>
//                             <div className="text-center text-sm text-gray-500 mb-2">
//                               {startup.startup_cohort
//                                 ? new Date(
//                                     startup.startup_cohort
//                                   ).toLocaleDateString("en-US", {
//                                     month: "2-digit",
//                                     year: "2-digit",
//                                   })
//                                 : "MM-YY"}
//                             </div>
//                             <div className="flex justify-between text-sm mt-4 text-gray-600">
//                               <div>
//                                 <div className="font-semibold">Founder</div>
//                                 <div>
//                                   {startup.founder_name ||
//                                     "startup.founder_name"}
//                                 </div>
//                               </div>
//                               <div>
//                                 <div className="font-semibold">Sector</div>
//                                 <div>
//                                   {startup.startup_industry ||
//                                     "startup.startup_industry"}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="col-span-3 text-center py-20 text-gray-500">
//                           <div className="text-xl mb-2">No startups found</div>
//                           <div className="text-sm">
//                             Try changing your filters
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Pagination */}
//                   {totalPages > 1 && (
//                     <div className="flex justify-center items-center gap-4 py-6">
//                       <button
//                         onClick={() =>
//                           setCurrentPage((p) => Math.max(p - 1, 1))
//                         }
//                         disabled={currentPage === 1}
//                         className={`px-4 py-2 rounded-lg ${
//                           currentPage === 1
//                             ? "bg-gray-200 text-gray-500"
//                             : "bg-[#45C74D] text-white hover:bg-[#3BAF43]"
//                         }`}
//                       >
//                         Previous
//                       </button>
//                       <span className="text-sm text-gray-600">
//                         Page {currentPage} of {totalPages}
//                       </span>
//                       <button
//                         onClick={() =>
//                           setCurrentPage((p) => Math.min(p + 1, totalPages))
//                         }
//                         disabled={currentPage === totalPages}
//                         className={`px-4 py-2 rounded-lg ${
//                           currentPage === totalPages
//                             ? "bg-gray-200 text-gray-500"
//                             : "bg-[#45C74D] text-white hover:bg-[#3BAF43]"
//                         }`}
//                       >
//                         Next
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//         <DeleteConfirmation
//           isVisible={openEstablishPopUp}
//           onClose={() => setOpenEstablishPopUp(false)}
//         >
//           <h1 className="text-center font-semibold text-2xl">Are you sure?</h1>
//           <div className="grid grid-cols-2 gap-4 mt-8">
//             <button
//               className="text-gray-500 font-semibold p-2 rounded-xl shadow"
//               onClick={() => {
//                 handleDelete(startupdata);
//                 setOpenEstablishPopUp(false);
//               }}
//             >
//               Yes
//             </button>
//             <button
//               className="text-gray-500 font-semibold p-2 rounded-xl shadow"
//               onClick={() => setOpenEstablishPopUp(false)}
//             >
//               No
//             </button>
//           </div>
//         </DeleteConfirmation>
//       </div>
//     </div>
//   );
// }

// export default Startups;


import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import axios from "axios";
import ExportSvg from "../../assets/images/export excel.svg";
import FrameSvg from "../../assets/images/Frame.svg";
import toast from "react-hot-toast";
import { FaSpinner, FaEllipsisV } from "react-icons/fa";
import { ApiDeletStartupData } from "../../API/API";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import { useNavigate } from "react-router-dom";

function Startups() {
  const [data, setData] = useState([]);
  const [startupdata, setStartupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showw, setShoww] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [filterStatus, setFilterStatus] = useState("All");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const statusTabs = [
    { label: "All", value: "All" },
    { label: "Pratham", value: "Pratham" },
    { label: "Akshar", value: "Akshar" },
    { label: "Graduated", value: "Graduated" },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://13.127.7.121/api/v1/fetch-startup"
      );
      setData(response.data.rows || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch startup data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setShoww(true);
  }, []);

  const filteredData = data.filter((startup) => {
    const matchesFilter =
      filterStatus === "All" ||
      startup.program?.toLowerCase() === filterStatus.toLowerCase() ||
      startup.startup_status?.toLowerCase() === filterStatus.toLowerCase();

    const matchesSearch =
      startup.startup_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.founder_name?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleGraduate = async (email) => {
    try {
      await axios.put(
        `http://13.127.7.121/api/v1/update-status?startup_status=Graduated&official_email_address=${email}`
      );
      toast.success("Marked as Graduated");
      fetchData();
    } catch {
      toast.error("Error updating status");
    }
  };

  const handleDrop = async (email) => {
    try {
      await axios.put(
        `http://13.127.7.121/api/v1/update-status?startup_status=Dropped&official_email_address=${email}`
      );
      toast.success("Marked as Dropped");
      fetchData();
    } catch {
      toast.error("Error updating status");
    }
  };

  const handleActive = async (email) => {
    try {
      await axios.put(
        `http://13.127.7.121/api/v1/update-status?startup_status=Active&official_email_address=${email}`
      );
      toast.success("Marked as Active");
      fetchData();
    } catch {
      toast.error("Error updating status");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-[#D8F3D9] text-[#45C74D]";
      case "graduated":
        return "bg-[#E8F5E8] text-[#2E7D32]";
      case "dropped":
        return "bg-[#FFEBEE] text-[#D32F2F]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getProgressPercentage = (stage) => {
    const stages = ["idea", "mvp", "traction", "scaling", "graduated"];
    const index = stages.indexOf(stage?.toLowerCase());
    return index >= 0 ? ((index + 1) / stages.length) * 100 : 25;
  };

  const handleDelete = async (email) => {
    try {
      const API = await ApiDeletStartupData(email);
      if (API) {
        toast.success("Details deleted successfully!");
        const updatedList = data.filter(
          (startup) => startup.email_address !== email
        );
        setData(updatedList);
        setOpenDropdownId(null);
      } else {
        toast.error("Failed to delete startup.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <NavBar />
        <div className="bg-gray-100 min-h-screen">
          <div className={`mx-10 py-5 ${showw ? "visible" : ""}`}>
            <div className="border bg-white">
              <div className="px-5 pt-6 text-sm text-[#808080]">
                Dashboard {">"} Start-ups
              </div>
              <div className="font-bold text-lg px-5 pt-3">Start-ups</div>

              {/* Filter Tabs */}
              <div className="flex gap-3 px-5 mt-4 overflow-x-auto pb-2">
                {statusTabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => {
                      setFilterStatus(tab.value);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm transition-all whitespace-nowrap
                    ${
                      filterStatus === tab.value
                        ? "bg-[#45C74D] text-white"
                        : "bg-white border text-gray-600 hover:bg-gray-100"
                    }
                  `}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search & Add */}
              <div className="flex justify-between px-5 mt-3">
                <div className="relative w-72">
                  <input
                    type="text"
                    placeholder="Search by name or founder..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 px-4 text-sm border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <a
                  href="/addstartup"
                  className="bg-[#45C74D] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Add New Start-up
                </a>
              </div>

              {/* Content */}
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <FaSpinner className="animate-spin text-4xl text-[#45C74D]" />
                  <span className="ml-3 text-lg">Loading startups...</span>
                </div>
              ) : (
                <>
                  <div className="pt-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-5 mb-2">
                      {currentItems.length > 0 ? (
                        currentItems.map((startup, index) => (
                          <div
                            key={startup.id || index}
                            className="border shadow-md rounded-lg p-4 bg-white cursor-pointer hover:shadow-lg transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/startupprofile/${startup.email_address}`
                              );
                            }}
                          >
                            <div className="flex justify-between items-center mb-3">
                              <div
                                className={`px-2 py-1 rounded-xl text-xs ${getStatusColor(startup.startup_status)}`}
                              >
                                {startup.startup_status || "Active"}
                              </div>
                              <div className="relative">
                                <button
                                  className="p-2 rounded-full hover:bg-gray-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenDropdownId(
                                      openDropdownId === startup.email_address
                                        ? null
                                        : startup.email_address
                                    );
                                  }}
                                >
                                  <FaEllipsisV className="text-gray-500" />
                                </button>
                                {openDropdownId === startup.email_address && (
                                  <div
                                    className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="py-1">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          navigate(
                                            `/startupprofile/${startup.email_address}`
                                          );
                                          setOpenDropdownId(null);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      >
                                        View
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setStartupData(startup.email_address);
                                          setOpenEstablishPopUp(true);
                                          setOpenDropdownId(null);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-center font-semibold text-lg mb-1">
                              {startup.startup_name || "Start-up Name"}
                            </div>
                            <div className="text-center text-sm text-gray-500 mb-2">
                              {startup.startup_cohort
                                ? new Date(
                                    startup.startup_cohort
                                  ).toLocaleDateString("en-US", {
                                    month: "2-digit",
                                    year: "2-digit",
                                  })
                                : "MM-YY"}
                            </div>
                            <div className="flex justify-between text-sm mt-4 text-gray-600">
                              <div>
                                <div className="font-semibold">Founder</div>
                                <div>
                                  {startup.founder_name ||
                                    "N/A"}
                                </div>
                              </div>
                              <div>
                                <div className="font-semibold">Sector</div>
                                <div>
                                  {startup.startup_sector ||
                                    "N/A"}
                                </div>
                              </div>
                            </div>
                            
                            
                            {/* Optional Progress Bar */}
                            {/* <div className="w-full bg-gray-200 h-1 rounded mt-3">
                            <div className="bg-green-500 h-1 rounded" style={{ width: `${getProgressPercentage(startup.stage)}%` }} />
                          </div> */}
                          </div>
                        ))
                      ) : (
                        <div className="col-span-3 text-center py-20 text-gray-500">
                          <div className="text-xl mb-2">No startups found</div>
                          <div className="text-sm">
                            Try changing your filters
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 py-6">
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === 1
                            ? "bg-gray-200 text-gray-500"
                            : "bg-[#45C74D] text-white hover:bg-[#3BAF43]"
                        }`}
                      >
                        Previous
                      </button>
                      <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === totalPages
                            ? "bg-gray-200 text-gray-500"
                            : "bg-[#45C74D] text-white hover:bg-[#3BAF43]"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <DeleteConfirmation
          isVisible={openEstablishPopUp}
          onClose={() => setOpenEstablishPopUp(false)}
        >
          <h1 className="text-center font-semibold text-2xl">Are you sure?</h1>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              className="text-gray-500 font-semibold p-2 rounded-xl shadow"
              onClick={() => {
                handleDelete(startupdata);
                setOpenEstablishPopUp(false);
              }}
            >
              Yes
            </button>
            <button
              className="text-gray-500 font-semibold p-2 rounded-xl shadow"
              onClick={() => setOpenEstablishPopUp(false)}
            >
              No
            </button>
          </div>
        </DeleteConfirmation>
      </div>
    </div>
  );
}

export default Startups;

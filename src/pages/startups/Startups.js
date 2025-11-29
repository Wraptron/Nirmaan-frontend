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
import {
  FaSpinner,
  FaEllipsisV,
  FaFilter,
  FaChevronDown,
} from "react-icons/fa";
import { ApiDeletStartupData, ApiFetchStartup } from "../../API/API";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Startups() {
  const [data, setData] = useState([]);
  const [startupdata, setStartupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showw, setShoww] = useState(false);

  const [showCohortDropdown, setShowCohortDropdown] = useState(false); // Dropdown visibility
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const statusTabs = [
    { label: "All", value: "All" },
    { label: "Pratham", value: "Pratham" },
    { label: "Akshar", value: "Akshar" },
    { label: "Graduated", value: "Graduated" },
    { label: "Dropped out", value: "dropped out" },
  ];

  const cohortOptions = [
    "2017-18",
    "2018-19",
    "January 2019",
    "July 2019",
    "January 2020",
    "August 2020",
    "January 2021",
    "July 2021",
    "January 2022",
    "August 2022",
    "January 2023",
    "August 2023",
    "November-24",
    "April-2025",
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const ApiStartup = await ApiFetchStartup();
      const startupdata = Array.isArray(ApiStartup?.rows)
        ? ApiStartup.rows
        : [];
      const startup = startupdata.sort((a, b) => a.startup_id - b.startup_id);
      setData(startup);
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

  // pagination and cohert filter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageFromQuery = parseInt(queryParams.get("page")) || 1;
  const initialStatus = queryParams.get("status") || "All";
  const initialCohort = queryParams.get("cohort") || "All";
  const [currentPage, setCurrentPage] = useState(pageFromQuery);
  const [filterStatus, setFilterStatus] = useState(initialStatus);
  const [filterCohort, setFilterCohort] = useState(initialCohort);
  const [rowsPerPage] = useState(6);
  const filteredData = data.filter((startup) => {
    const matchesFilter =
      filterStatus === "All" ||
      startup.program?.toLowerCase() === filterStatus.toLowerCase() ||
      startup.startup_status?.toLowerCase() === filterStatus.toLowerCase();

    const matchesCohort =
      filterCohort === "All" ||
      startup.startup_cohort?.toLowerCase() === filterCohort.toLowerCase();

    const matchesSearch =
      startup.startup_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.founder_name?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesCohort && matchesSearch;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // page redirect to same page when back button click
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", currentPage);
    params.set("status", filterStatus);
    params.set("cohort", filterCohort);
    navigate({ search: params.toString() }, { replace: true });
  }, [currentPage, filterStatus, filterCohort, location.search, navigate]);

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    setCurrentPage(pageFromQuery);
  };

  const handleCohortFilter = (cohort) => {
    setFilterCohort(cohort);
    setCurrentPage(1);
    setShowCohortDropdown(false);
  };

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

  const handleDelete = async (id) => {
    try {
      const API = await ApiDeletStartupData(id);
      if (API) {
        toast.success("Details deleted successfully!");
        const updatedList = data.filter((startup) => startup.startup_id !== id);
        setData(updatedList);
        setOpenDropdownId(null);

          // Check if current page is now empty
          const updatedFilteredData = updatedList.filter((startup) => {
        const matchesFilter =
          filterStatus === "All" ||
          startup.program?.toLowerCase() === filterStatus.toLowerCase() ||
          startup.startup_status?.toLowerCase() === filterStatus.toLowerCase();

        const matchesCohort =
          filterCohort === "All" ||
          startup.startup_cohort?.toLowerCase() === filterCohort.toLowerCase();

          const matchesSearch =
          startup.startup_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          startup.founder_name?.toLowerCase().includes(searchTerm.toLowerCase());
            console.log(searchTerm)
            console.log(matchesSearch)
        return matchesFilter && matchesCohort && matchesSearch;
      });

      const totalPagesAfterDelete = Math.ceil(updatedFilteredData.length / 6);
      // If current page > total pages, move back
      if (currentPage > totalPagesAfterDelete && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      } else {
        toast.error("Failed to delete startup.");
      }
    } catch (err) {
      console.error(err);
    }
  };
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
                    onClick={() => handleStatusFilter(tab.value)}
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

              {/* Search, Cohort Filter & Add */}
              <div className="flex justify-between items-center gap-4 px-5 mt-3">
                <div className="flex items-center gap-4">
                  {/* Search Input */}
                  <div className="relative w-72">
                    <input
                      type="text"
                      placeholder="Search by name or founder..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-2 px-4 text-sm border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  {/* Cohort Filter Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowCohortDropdown(!showCohortDropdown)}
                      className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-all ${
                        filterCohort !== "All"
                          ? "bg-[#45C74D] text-white border-[#45C74D]"
                          : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <FaFilter className="text-xs" />
                      <span>
                        {filterCohort === "All" ? "All Cohorts" : filterCohort}
                      </span>
                      <FaChevronDown
                        className={`text-xs transition-transform ${
                          showCohortDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {showCohortDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-30 max-h-60 overflow-y-auto">
                        {cohortOptions.map((cohort) => (
                          <button
                            key={cohort}
                            onClick={() => handleCohortFilter(cohort)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                              filterCohort === cohort
                                ? "bg-[#45C74D] text-white hover:bg-[#3BAF43]"
                                : "text-gray-700"
                            }`}
                          >
                            {cohort === "All" ? "All Cohorts" : cohort}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Click outside to close dropdown */}
                    {showCohortDropdown && (
                      <div
                        className="fixed inset-0 z-20"
                        onClick={() => setShowCohortDropdown(false)}
                      />
                    )}
                  </div>
                </div>

                <a
                  href="/addstartup"
                  className="bg-[#45C74D] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Add New Start-up
                </a>
              </div>

              {/* Active Filters Display */}
              {(filterStatus !== "All" || filterCohort !== "All") && (
                <div className="flex items-center gap-2 px-5 mt-3">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {filterStatus !== "All" && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#45C74D] text-white text-xs rounded-full">
                      Status: {filterStatus}
                      <button
                        onClick={() => handleStatusFilter("All")}
                        className="ml-1 text-white hover:text-gray-200"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filterCohort !== "All" && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                      Cohort: {filterCohort}
                      <button
                        onClick={() => handleCohortFilter("All")}
                        className="ml-1 text-white hover:text-gray-200"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}

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
                                `/startups/startupprofile/${startup.startup_id}?page=${currentPage}&status=${filterStatus}&cohort=${filterCohort}`
                              );
                            }}
                          >
                            <div className="flex justify-between items-center mb-3">
                              <div
                                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all duration-200 ${
                                  startup.program === "Graduated" ||
                                  startup.program === "Dropped out"
                                    ? "invisible"
                                    : getStatusColor(startup.startup_status)
                                }`}
                              >
                                {startup.startup_status || "Status"}
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
                                            `/startups/startupprofile/${startup.startup_id}`
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
                                          setStartupData(startup.startup_id);
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
                              {startup.startup_cohort || "Cohort"}
                            </div>
                            <div className="flex justify-between text-sm mt-4 text-gray-600">
                              <div>
                                <div className="font-semibold">Founder</div>
                                <div>{startup.founder_name || "N/A"}</div>
                              </div>
                              <div>
                                <div className="font-semibold">Sector</div>
                                <div>{startup.startup_sector || "N/A"}</div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-3 text-center py-20 text-gray-500">
                          <div className="text-xl mb-2">No startups found</div>
                          <div className="text-sm">
                            Try changing your filters or search term
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pagination */}
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
                        Page {currentPage} of {totalPages} (
                        {filteredData.length} startups)
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

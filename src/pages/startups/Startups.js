import React, { useEffect, useMemo, useState } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import toast from "react-hot-toast";
import { FaSpinner, FaEllipsisV, FaFilter } from "react-icons/fa";
import { ApiDeletStartupData, ApiFetchStartup } from "../../API/API";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { MdViewModule } from "react-icons/md";
import { BsListUl } from "react-icons/bs";

function Startups() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();


  const [data, setData] = useState([]);
  const [startupdata, setStartupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showw, setShoww] = useState(false);
  const [viewMode, setViewMode] = useState("card");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [filters, setFilters] = useState({
    program: "",
    cohort: "",
    sector: "",
    status: "",
    domain: "",
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  //fetch startup data
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

  const filteredData = useMemo(() => {
    return data.filter((s) => {
      const matchesSearch =
        !searchTerm ||
        s.startup_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.founder_name?.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        matchesSearch &&
        (!filters.program ||
          s.program?.toLowerCase() === filters.program.toLowerCase()) &&
        (!filters.cohort ||
          s.startup_cohort
            ?.toLowerCase()
            .includes(filters.cohort.toLowerCase())) &&
        (!filters.status ||
          s.startup_status?.toLowerCase() === filters.status.toLowerCase()) &&
        (!filters.sector ||
          s.startup_sector?.toLowerCase() === filters.sector.toLowerCase()) &&
        (!filters.domain ||
          s.startup_domain?.toLowerCase() === filters.domain.toLowerCase())
      );
    });
  }, [data, filters, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* ---------------- TABS ---------------- */
  const statusTabs = ["All", "Pratham", "Akshar", "Graduated", "Dropped Out"];

  const handleStatusFilter = (tab) => {
    if (tab === "All") {
      setFilters({
        program: "",
        cohort: "",
        status: "",
        sector: "",
        domain: "",
      });
      return;
    }

    if (tab === "Pratham" || tab === "Akshar") {
      updateFilter("program", tab);
      updateFilter("status", "");
      return;
    }

    updateFilter("status", tab);
    updateFilter("program", "");
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-[#D8F3D9] text-[#45C74D]";
      case "graduated":
        return "bg-[#E8F5E8] text-[#2E7D32]";
      case "dropped out":
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
      } else {
        toast.error("Failed to delete startup.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // cohort filter logic
  const cohortOptions = useMemo(() => {
    const cohorts = data.map((s) => s.startup_cohort).filter(Boolean);

    const unique = [...new Set(cohorts)];
    unique.sort((a, b) => a.localeCompare(b));

    return ["All", ...unique];
  }, [data]);
  const sectorOptions = useMemo(() => {
    const sectors = data.map((s) => s.startup_sector).filter(Boolean);

    const unique = [...new Set(sectors)];
    unique.sort((a, b) => a.localeCompare(b));

    return ["All", ...unique];
  }, [data]);

  const domainOptions = useMemo(() => {
    const domains = data.map((s) => s.startup_domain).filter(Boolean);

    const unique = [...new Set(domains)];
    unique.sort((a, b) => a.localeCompare(b));

    return ["All", ...unique];
  }, [data]);

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
              {/* Filter Tabs */}
              <div className="flex gap-3 px-5 mt-4">
                {statusTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleStatusFilter(tab)}
                    className={`px-5 py-2 rounded-full text-sm ${
                      (tab === "All" && !filters.status && !filters.program) ||
                      tab === filters.status ||
                      tab === filters.program
                        ? "bg-[#45C74D] text-white"
                        : "border text-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search & Add */}
              <div className="flex justify-between items-center gap-4 px-5 mt-3">
                <div className="flex items-center gap-4">
                  {/* Search Input */}
                  <div className="relative w-72">
                    <input
                      type="text"
                      placeholder="Search by name or founder..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-2 px-4 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                    />
                  </div>
                  <div>
                    <button onClick={() => setShowFilterModal(true)}>
                      <FaFilter />
                    </button>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a
                    href="/startups/addstartup"
                    className="bg-[#45C74D] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Add New Start-up
                  </a>

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

              {/* Active Filters Display */}
              {Object.values(filters).some(Boolean) && (
                <div className="flex gap-2 px-5 mt-3 flex-wrap">
                  {Object.entries(filters).map(
                    ([k, v]) =>
                      v && (
                        <span
                          key={k}
                          className="bg-[#45C74D] text-white px-2 py-1 rounded-lg text-xs"
                        >
                          {k}: {v}
                          <button
                            onClick={() => updateFilter(k, "")}
                            className="ml-1"
                          >
                            {" "}
                            ×
                          </button>
                        </span>
                      ),
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
                  {viewMode === "card" && (
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
                                  `/startups/startupprofile/${startup.startup_id}?page=${currentPage}`,
                                );
                              }}
                            >
                              <div className="flex justify-between items-center mb-3">
                                <div
                                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all duration-200 ${getStatusColor(
                                    startup.startup_status,
                                  )}`}
                                >
                                  {startup.startup_status || "Status"}
                                </div>
                                <div className="relative">
                                  <button
                                    className="p-2 rounded-full hover:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenDropdownId(
                                        openDropdownId === startup.startup_id
                                          ? null
                                          : startup.startup_id,
                                      );
                                    }}
                                  >
                                    <FaEllipsisV className="text-gray-500" />
                                  </button>
                                  {openDropdownId === startup.startup_id && (
                                    <div
                                      className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <div className="py-1">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(
                                              `/startups/startupprofile/${startup.startup_id}`,
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
                            <div className="text-xl mb-2">
                              No startups found
                            </div>
                            <div className="text-sm">
                              Try changing your filters or search term
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* List View */}
                  {viewMode === "list" && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6 pt-5">
                      {currentItems.length > 0 ? (
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Startup Name
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Founder
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cohort
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sector
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.map((startup, index) => (
                              <tr
                                key={index}
                                className="hover:bg-gray-50 cursor-pointer transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(
                                    `/startups/startupprofile/${startup.startup_id}?page=${currentPage}`,
                                  );
                                }}
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {startup.startup_name || "Start-up Name"}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-700">
                                    {startup.founder_name || "N/A"}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-700">
                                    {startup.startup_cohort || "Cohort"}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-700">
                                    {startup.startup_sector || "N/A"}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                      startup.startup_status,
                                    )}`}
                                  >
                                    {startup.startup_status || "Status"}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                  <div className="relative inline-block">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenDropdownId(
                                          openDropdownId === startup.startup_id
                                            ? null
                                            : startup.startup_id,
                                        );
                                      }}
                                      className="text-gray-400 hover:text-gray-600"
                                    >
                                      <FaEllipsisV />
                                    </button>
                                    {openDropdownId === startup.startup_id && (
                                      <div
                                        className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <div className="py-1">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              navigate(
                                                `/startups/startupprofile/${startup.startup_id}`,
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
                                              setStartupData(
                                                startup.startup_id,
                                              );
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
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-20">
                          <p className="text-gray-500 text-lg mb-2">
                            No startups found
                          </p>
                          <p className="text-gray-400 text-sm">
                            Try changing your filters or search term
                          </p>
                        </div>
                      )}
                    </div>
                  )}

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
        {/* FILTER MODAL */}
        {showFilterModal && (
          <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-4xl mx-6 rounded-xl p-6">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold mb-4">Filter By</h2>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="right-4 mb-4 text-gray-500 hover:text-gray-700"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 1L13 13M1 13L13 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1.5">Program</label>
                  <select
                    value={filters.program}
                    onChange={(e) => updateFilter("program", e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  >
                    <option value="">Select Program</option>
                    <option value="Pratham">Pratham</option>
                    <option value="Akshar">Akshar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1.5">Cohort</label>
                  <select
                    value={filters.cohort}
                    onChange={(e) => updateFilter("cohort", e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  >
                    <option value="">Select Cohort</option>
                    {cohortOptions.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                {/* 
                <select
                  onChange={(e) => updateFilter("sector", e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="">Sector</option>
                  {sectorOptions.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select> */}
                <div>
                  <label className="block text-sm mb-1.5">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => updateFilter("status", e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Dropped Out">Dropped Out</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Sector</label>
                  <select
                    value={filters.sector}
                    onChange={(e) => updateFilter("sector", e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  >
                    <option value="">Select Sector</option>
                    {sectorOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1.5">Domain</label>
                  <select
                    value={filters.domain}
                    onChange={(e) => updateFilter("domain", e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  >
                    <option value="">Select Domain</option>
                    {domainOptions.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() =>
                    setFilters({
                      program: "",
                      cohort: "",
                      sector: "",
                      status: "",
                      domain: "",
                    })
                  }
                  className="border px-6 py-2 rounded"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="bg-[#45C74D] text-white px-6 py-2 rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

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

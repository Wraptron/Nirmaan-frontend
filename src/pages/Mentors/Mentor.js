import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/sidebar";
import { FaEllipsisV, FaSpinner } from "react-icons/fa";
import { ApiFetchMentor, ApiDeletMentorData } from "../../API/API";
import toast from "react-hot-toast";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import ImageSvg from "../../assets/images/296fe121-5dfa-43f4-98b5-db50019738a7.jpg"; // Placeholder image
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { MdViewModule } from "react-icons/md";
import { BsListUl } from "react-icons/bs";
function Mentor() {
  const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [mentordata, setMentorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [viewMode, setViewMode] = useState("card");
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const API = await ApiFetchMentor();
        // sort by mentor_id or any unique field
        const sortedData = API.STATUS.rows.sort(
          (a, b) => a.mentor_id - b.mentor_id
        );
        setData(sortedData);
      } catch (err) {
        console.error(err);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-menu") &&
        !event.target.closest(".ellipsis-button")
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDelete = async (id) => {
    try {
      const API = await ApiDeletMentorData(id);
      if (API) {
        toast.success("Mentor deleted successfully!");
        const updatedList = data.filter((mentor) => mentor.mentor_id !== id);
        setData(updatedList);
        setOpenDropdownId(null);
        // Reset to page 1 if current page is now empty
        const updatedFilteredMentors = updatedList.filter((mentor) =>
          mentor.mentor_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const updatedTotalPages = Math.ceil(updatedFilteredMentors.length / rowsPerPage);
        if (currentPage > updatedTotalPages && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        toast.error("Failed to delete mentor.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMentors = data.filter((mentor) =>
    mentor.mentor_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastMentor = currentPage * rowsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - rowsPerPage;
  const currentMentors = filteredMentors.slice(
    indexOfFirstMentor,
    indexOfLastMentor
  );
  const totalPages = Math.ceil(filteredMentors.length / rowsPerPage);
   

const token = sessionStorage.getItem("token");

if (!token) {
  return <Navigate to="/" replace />;
}

let decoded;
try {
  decoded = jwtDecode(token);
} catch (err) {
  return <Navigate to="/" replace />;
}

if (decoded.role !== 2) {
  return <Navigate to="/" replace />;
}


  return (
    <div className="flex">
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <NavBar />
        <div className="bg-[#f9f9f9] min-h-screen p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="text-sm text-gray-500">Dashboard &gt; Mentors</div>
            <h1 className="text-2xl font-bold mt-1">Mentors</h1>
          </div>

          {/* Search and Add */}
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-[#45C74D] focus:border-[#45C74D]"
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
            <div className="flex gap-3">
              <a
                href="/mentors/new"
                className="mt-3 md:mt-0 bg-[#45C74D]  text-white px-5 py-2 rounded-lg font-semibold text-sm"
              >
                Add New Mentor
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

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <FaSpinner className="animate-spin text-4xl text-[#45C74D]" />
              <span className="ml-3 text-lg">Loading Mentors...</span>
            </div>
          ) : (
            <>
              {/* Mentor Grid */}
              {viewMode === "card" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentMentors.length > 0 ? (
                    currentMentors.map((mentor) => (
                      <div
                        key={mentor.mentor_id}
                        className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between relative"
                      >
                        <img
                          //src={mentor.mentor_logo || ImageSvg}
                          // src={
                          //   mentor.mentor_logo?.startsWith("http")
                          //   ? mentor.mentor_logo
                          //   : mentor.mentor_logo
                          //   ? `http://13.126.152.135/${mentor.mentor_logo}`
                          //   : ImageSvg
                          // }
                          src={(() => {
                            let logo = mentor.mentor_logo || "";

                            // Fix wrong DB format
                            if (logo.startsWith("/uploads/https")) {
                              logo = logo.replace("/uploads/", "");
                            }

                            // Only allow your S3 bucket link
                            if (
                              logo.startsWith(
                                "https://trktorrr.s3.ap-south-1.amazonaws.com/",
                              )
                            ) {
                              return logo;
                            }

                            // Otherwise show placeholder
                            return ImageSvg;
                          })()}
                          alt="Mentor"
                          className="rounded-full w-20 h-20 object-cover aspect-square"
                        />
                        <div className="flex-1 ml-4">
                          <div className="text-md font-semibold">
                            <a
                              href={`/mentors/mentor_profile/${mentor.mentor_id}`}
                            >
                              {mentor.mentor_name}
                            </a>
                          </div>
                          <div className="text-sm text-gray-500">
                            {mentor.email_address || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {mentor.contact_num || "N/A"}
                          </div>
                        </div>

                        {/* Menu Button and Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenDropdownId(
                                openDropdownId === mentor.mentor_id
                                  ? null
                                  : mentor.mentor_id,
                              )
                            }
                            className="ellipsis-button text-gray-400 hover:text-gray-600 focus:outline-none"
                          >
                            <FaEllipsisV />
                          </button>

                          {openDropdownId === mentor.mentor_id && (
                            <div className="dropdown-menu absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-10 text-sm">
                              <button
                                onClick={() =>
                                  navigate(
                                    `/mentors/mentor_profile/${mentor.mentor_id}`,
                                  )
                                }
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                View
                              </button>
                              <button
                                onClick={() => toast("Message clicked")}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                Message
                              </button>
                              <button
                                onClick={() => {
                                  setMentorData(mentor.mentor_id);
                                  setOpenEstablishPopUp(true);
                                  setOpenDropdownId(null);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center text-center">
                      <p className="text-gray-500 text-lg">
                        No data available for mentor
                      </p>
                    </div>
                  )}
                </div>
              )}

              {viewMode === "list" && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6 pt-5">
                  {currentMentors.length > 0 ? (
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mentor Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Designation
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact Number
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email Address
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentMentors.map((Mentor) => (
                          <tr
                            key={Mentor.mentor_id}
                            className="hover:bg-gray-50 cursor-pointer transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {Mentor.mentor_name || "mentor_name"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700">
                                {Mentor.designation || "N/A"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700">
                                {Mentor.contact_num || "N/A"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-700">
                                {Mentor.email_address || "N/A"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="relative inline-block">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenDropdownId(
                                      openDropdownId === Mentor.mentor_id
                                        ? null
                                        : Mentor.mentor_id,
                                    );
                                  }}
                                  className="ellipsis-button text-gray-400 hover:text-gray-600"
                                >
                                  <FaEllipsisV />
                                </button>
                                {openDropdownId === Mentor.mentor_id && (
                                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    <div className="py-1">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          navigate(
                                            `/mentors/mentor_profile/${Mentor.mentor_id}`,
                                          );
                                          console.log("View clicked");
                                          setOpenDropdownId(null);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      >
                                        View
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setMentorData(Mentor.mentor_id);
                                          setOpenEstablishPopUp(true);
                                          setOpenDropdownId(null);
                                          console.log("Delete clicked");
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
                    <div className="flex justify-center items-center text-center">
                      <p className="text-gray-500 text-lg">
                        No data available for mentor
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
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
                        {filteredMentors.length} mentors)
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

          {/* Delete Confirmation */}
          <DeleteConfirmation
            isVisible={openEstablishPopUp}
            onClose={() => setOpenEstablishPopUp(false)}
          >
            <h1 className="text-center font-semibold text-2xl">
              Are you sure?
            </h1>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <button
                className="text-gray-500 font-semibold p-2 rounded-xl shadow"
                onClick={() => {
                  handleDelete(mentordata);
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
    </div>
  );
}

export default Mentor;

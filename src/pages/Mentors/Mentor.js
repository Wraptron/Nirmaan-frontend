import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/sidebar";
import { FaEllipsisV } from "react-icons/fa";
import { ApiFetchMentor, ApiDeletMentorData } from "../../API/API";
import toast from "react-hot-toast";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import ImageSvg from "../../assets/images/image.svg"; // Placeholder image
import { useNavigate } from "react-router-dom";

function Mentor() {
  const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [mentordata, setMentorData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API = await ApiFetchMentor();
        setData(API.STATUS.rows);
      } catch (err) {
        console.error(err);
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      const API = await ApiDeletMentorData(id);
      if (API) {
        toast.success("Mentor deleted successfully!");
        const updatedList = data.filter((mentor) => mentor.mentor_id !== id);
        setData(updatedList);
        setOpenDropdownId(null);
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

            <a
              href="/mentor/new"
              className="mt-3 md:mt-0 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-semibold text-sm"
            >
              Add New Mentor
            </a>
          </div>

          {/* Mentor Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMentors.map((mentor) => (
              <div
                key={mentor.mentor_id}
                className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between relative"
              >
                <img
                  src={mentor.mentor_logo.replace("/uploads/", "") || ImageSvg}
                  alt="Mentor"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 ml-4">
                  <div className="text-md font-semibold">
                    <a href={`/mentor/mentor_profile/${mentor.mentor_id}`}>
                      {mentor.mentor_name}
                    </a>
                  </div>
                  <div className="text-sm text-gray-500">
                    {mentor.institution}
                  </div>
                </div>

                {/* Menu Button and Dropdown */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdownId(
                        openDropdownId === mentor.mentor_id
                          ? null
                          : mentor.mentor_id
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
                          navigate(`/mentor/mentor_profile/${mentor.mentor_id}`)
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
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-8">
            <span className="text-sm text-gray-500">
              Showing {currentMentors.length} of {filteredMentors.length}{" "}
              results
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-3 py-1 text-sm rounded-md bg-gray-200 disabled:opacity-50"
              >
                «
              </button>
              {[...Array(totalPages).keys()].map((i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    currentPage === i + 1
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-3 py-1 text-sm rounded-md bg-gray-200 disabled:opacity-50"
              >
                »
              </button>
            </div>
          </div>

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

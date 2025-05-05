import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/sidebar";
import { FaEllipsisV } from "react-icons/fa";
import { ApiFetchMentor, ApiDeletMentorData } from "../../API/API";
import toast from "react-hot-toast";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import ImageSvg from "../../assets/images/image.svg";

function Mentor() {
  const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [buttontoggle, setButtonToggle] = useState(null);
  const [mentordata, setMentorData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(3);
  const [showw, setShoww] = useState(false);

  const handleClickButtonToggle = (index) => {
    setButtonToggle(buttontoggle === index ? null : index);
  };

  const FetchData = async () => {
    try {
      const API = await ApiFetchMentor();
      setData(API.STATUS.rows);
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteMentorData = async (id) => {
    try {
      const API = await ApiDeletMentorData(id);
      if (API) {
        toast.success("Mentor deleted successfully!");
        FetchData();
      } else {
        toast.error("Failed to delete mentor.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchData();
    setShoww(true);
  }, []);

  const indexOfLastMentor = currentPage * rowsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - rowsPerPage;
  const currentMentors = data.slice(indexOfFirstMentor, indexOfLastMentor);
  // 👉 To show all mentors without pagination, just use: const currentMentors = data;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <NavBar />
        <div className="bg-gray-100 min-h-screen">
          <div className={`mx-10 py-5 content ${showw ? "visible" : ""}`}>
            <div className="border bg-white">
              <div className="px-5 pt-6 text-sm text-[#808080]">
                Dashboard &gt; Mentors
              </div>
              <div className="font-bold text-lg px-5 pt-3">Mentors</div>
              <div className="flex justify-between px-5 mt-3">
                <div className="relative w-full max-w-sm">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10"
                    placeholder="Search..."
                  />
                </div>
                <a
                  href="/mentor/new"
                  className="bg-[#45C74D] text-white py-2 px-4 rounded-lg ms-3 text-sm font-semibold"
                >
                  Add New Mentor
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 py-5">
                {currentMentors.map((mentor, index) => (
                  <div key={index} className="border shadow-xl rounded-xl">
                    <div className="grid grid-cols-3 gap-5">
                      <div className="col-span-1">
                        <img
                          src={ImageSvg}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="col-span-2 pt-2">
                        <div className="flex justify-between">
                          <div>
                            <div className="font-semibold">
                              <a href={`/mentor/mentor_profile/${mentor.id}`}>
                                {mentor.mentor_name}
                              </a>
                            </div>
                            <div className="text-sm">{mentor.institution}</div>
                          </div>
                          <div className="text-sm pt-[4px] ms-auto">
                            <FaEllipsisV size={15} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center pb-6 gap-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isVisible={openEstablishPopUp}
        onClose={() => setOpenEstablishPopUp(false)}
      >
        <h1 className="text-center font-semibold text-2xl">Are you sure?</h1>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            className="text-gray-500 text-sm font-semibold mt-1 p-1 px-3 rounded-xl shadow-md"
            style={{ backgroundColor: "#afdade" }}
            onClick={() => {
              DeleteMentorData(mentordata);
              setOpenEstablishPopUp(false);
            }}
          >
            Yes
          </button>
          <button
            className="text-gray-500 text-sm font-semibold mt-1 p-1 px-3 rounded-xl shadow-md"
            style={{ backgroundColor: "#afdade" }}
            onClick={() => setOpenEstablishPopUp(false)}
          >
            No
          </button>
        </div>
      </DeleteConfirmation>
    </div>
  );
}

export default Mentor;

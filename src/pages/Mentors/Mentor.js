import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/sidebar";
import { FaEllipsisV, FaUserCircle } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { ApiFetchMentor, ApiDeletMentorData } from "../../API/API";
import toast from "react-hot-toast";
import { GiConsoleController } from "react-icons/gi";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import ImageSvg from '../../assets/images/image.svg';
function Mentor() {
  const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);
  const handleEstablish = () => setOpenEstablishPopUp(true);
  const [data, setData] = useState([]);
  const [buttontoggle, setButtonToggle] = useState(null);
  const [mentordata, setMentorData] = useState('');
  const [currentPage, setCurrentPage] = useState(1); 
  const [rowsPerPage, setRowsPerPage] = useState(3); 

  const handleClickButtonToggle = (index) => {
      setButtonToggle(buttontoggle === index ? null : index);
  }

  const FetchData = async () => {
    try {
      const API = await ApiFetchMentor();
      setData(API.STATUS.rows);
      console.log(API.STATUS.rows);
    } catch (err) {
      console.log(err);
    }
  }

  const DeleteMentorData = async (id) => {
    try {
      const API = await ApiDeletMentorData(id);
      if (API) {
        toast.success('Mentor deleted successfully!');
        FetchData(); // Refetch data after deletion
      } else {
        toast.error('Failed to delete mentor.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    FetchData();
  }, []);

  // Calculate the mentors to display based on pagination
  const indexOfLastMentor = currentPage * rowsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - rowsPerPage;
  const currentMentors = data.slice(indexOfFirstMentor, indexOfLastMentor);

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

  const [showw, setShoww] = useState(false);
    useEffect(() => {
        setShoww(true);
    }, [])
  return (
    <div className={`flex`}>
      <div>
            <SideBar />
      </div>
      <div className="ms-[221px] flex-grow">
            <NavBar />
            <div className="bg-gray-100">
                  <div className={`mx-10 py-5  content ${showw ? "visible": ""}`}> 
                       <div className="border bg-white">
                            <div className="px-5 pt-6 text-sm text-[#808080]">Dashboard<span> {'>'} </span>Mentors</div>
                            <div className="font-bold text-lg px-5 pt-3">Mentors</div>
                            <div className="flex justify-between px-5 mt-3">
                                  <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                      </svg>
                                    </div>
                                    <input type="text"  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ps-10" placeholder="Search..." />
                                  </div>
                                  <a href="/mentor/new" className="bg-[#45C74D] text-white block py-2 px-2 rounded-lg ms-3 text-sm font-semibold">Add New Mentor</a>
                            </div>
                            <div className="pt-3">
                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 px-5 mb-2">
                                              <div className="border shadow-xl rounded-xl">
                                                      <div className="grid grid-cols-3 gap-5">
                                                            <div className="col-span-1"><img src={ImageSvg} className="w-[100%]"/></div>
                                                            <div className="col-span-2  pt-2">
                                                                  <div className="grid grid-cols-2">
                                                                      <div>
                                                                          <div className="font-semibold"><a href="/mentor/mentor_profile">Mentor Name</a></div>
                                                                          <div className="text-sm">Institution</div>
                                                                          
                                                                      </div>
                                                                      <div className="text-sm pt-[4px] ms-auto"><FaEllipsisV size={15}/></div>
                                                                  </div>
                                                                  
                                                            </div>
                                                      </div>
                                              </div>
                                              <div className="border">
                                                      <div className="flex justify-between">
                                                            <div></div>
                                                      </div>
                                              </div>
                                              <div className="border">
                                                      <div></div>
                                              </div>
                                              <div className="border">
                                                      <div></div>
                                              </div>
                                      </div>  
                            </div>  
                       </div>
                  </div>  
            </div>
              
      </div>
      <DeleteConfirmation isVisible={openEstablishPopUp} onClose={() => setOpenEstablishPopUp(false)}>
        <h1 className="text-center font-semibold text-2xl">Are you sure</h1>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button className="text-gray-500 text-sm font-semibold mt-1 p-1 px-3 rounded-xl shadow-md" style={{ backgroundColor: '#afdade' }} onClick={() => { DeleteMentorData(mentordata); setOpenEstablishPopUp(false); }}>Yes</button>
          <button className="text-gray-500 text-sm font-semibold mt-1 p-1 px-3 rounded-xl shadow-md" style={{ backgroundColor: '#afdade' }} onClick={() => setOpenEstablishPopUp(false)}>No</button>
        </div>
      </DeleteConfirmation>
    </div>
  );
}

export default Mentor;

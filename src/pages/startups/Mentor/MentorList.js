import React, { useEffect, useState } from "react";
import SideBar from "../../../components/sidebar";
import Navbar from "../../../components/NavBar";
import { ApiFetchMentor } from "../../../API/API";
import MentorAbout from "./MentorAbout";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import MentorTag from "../../../components/MentorTag";

const Mentor = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showmentorabout, setShowMentorAbout] = useState(false);
  const navigate = useNavigate();
  const handleaboutclose = () => {
    setSelectedMentor(null);
    setShowMentorAbout(false);
  };

   const handleScheduleClick = () => {
     navigate(`/schedulemeeting`);
   };
  const fetchData = async () => {
    try {
      const API = await ApiFetchMentor();
      // sort by mentor_id or any unique field
      const sortedData = API.STATUS.rows
        .sort((a, b) => a.mentor_id - b.mentor_id)
        .map((item, index) => ({
          ...item,
          siNo: index + 1,
        }));;
      setData(sortedData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filteredMentor = data.filter((mentor) =>
    (mentor.mentor_name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  
   if (decoded.role !== 5) {
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
              <div className="px-5 pt-6 text-sm text-[#808080]">
                Start-ups {">"} Mentors
              </div>
              <div className="font-bold text-lg px-5 pt-3">Mentors</div>
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
                <div className="flex items-center gap-5">
                  {/* <button
                    className="bg-[#45C74D] text-white px-8 py-2 rounded-lg text-base font-semibold shadow hover:bg-[#36a03d] transition"
                   onClick={handleScheduleClick}
                  >
                    Add Mentor Hour
                  </button> */}
                </div>
              </div>
              <div className="border mt-5 border-dotted rounded-lg overflow-x-auto">
               <div className="max-h-[calc(100vh-300px)] overflow-auto">
                  <table className="min-w-full text-sm text-left border-collapse">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="border-b border-dotted">
                            <th className="px-4 py-2">SI.No</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Institution</th>
                      <th className="px-4 py-2">Startups </th>
                      <th className="px-4 py-2"></th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMentor.map((mentor) => (
                      <tr className="border-b border-dotted">
                         <td className="px-4 py-2">{mentor.siNo}</td>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span>{mentor.mentor_name}</span>
                            <MentorTag tag={mentor.tag} />
                          </div>
                        </td>
                        <td className="px-4 py-2">{mentor.institution}</td>
                        <td className="px-4 py-2">-</td>
                        <td className="px-4 py-2">
                          <button
                            className="bg-[#45C74D] text-white px-8 py-2 rounded-lg text-base font-semibold shadow hover:bg-[#36a03d] transition"
                            onClick={() => {
                              setSelectedMentor(mentor);
                              setShowMentorAbout(true);
                            }}
                          >
                            View
                          </button>
                        </td>
                        {/* <td className="px-4 py-2">
                          <button className="bg-[#45C74D] text-white px-8 py-2 rounded-lg text-base font-semibold shadow hover:bg-[#36a03d] transition">
                            Request
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      {showmentorabout && (
        <MentorAbout
          onClose={handleaboutclose}
          mentor_logo={selectedMentor.mentor_logo}
          mentor_name={selectedMentor.mentor_name}
          about={selectedMentor.mento_description}
          expertise={selectedMentor.area_of_expertise}
          tag={selectedMentor.tag}
        />
      )}
    </div>
  );
};

export default Mentor;

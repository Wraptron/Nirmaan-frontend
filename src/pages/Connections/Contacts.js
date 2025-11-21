import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import mentorsvg from "../../assets/images/Frame (11).svg";
import AddNewContact from "./AddNewContact";

function Contacts() {
  const [showw, setShow] = useState(false);
  const [showcontactform, setShowContactForm] = useState(false);
  const handlecontactclick = () => setShowContactForm(true);
  const handlecontactclose = () => setShowContactForm(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <div className="flex">
      <div className="">
        <SideBar />
      </div>
      <div className="ms-[221px] flex-grow">
        <NavBar />
        <div className="bg-gray-100">
          <div className={`mx-10 py-5  content ${showw ? "visible" : ""}`}>
            <div className="bg-white rounded-lg shadow-sm p-3">
              <div className="text-sm text-[#808080]">
                Dashboard {">"} Connections {">"} Contacts
              </div>
              <div className="text-lg font-semibold pt-2 flex gap-3 items-center">
                <a href="/connections">
                  <img src={mentorsvg} alt="Back" />
                </a>
                <div className="text-lg font-semibold">Contacts</div>
              </div>
              <div className="flex flex-wrap items-center justify-between mb-6 mt-6 px-4">
                <div className="relative w-full md:w-1/2">
                  <input
                    type="text"
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
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
                <div className="flex gap-5 justify-end">
                  <button
                    className="bg-[#45C74D] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    onClick={handlecontactclick}
                  >
                    Add New Contact
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <div className="mt-10">
                  <table className="table-auto w-full">
                    <thead className="text-sm">
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Organisation</th>
                        <th>Purpose</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="flex justify-center">Hello</td>
                        <td className="">Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showcontactform && <AddNewContact onClose={handlecontactclose} />}
    </div>
  );
}

export default Contacts;

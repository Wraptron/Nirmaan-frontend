import React, { useState } from "react";
import NavBar from "../../../components/NavBar";
import SideBar from "../../../Finance/Components/Sidebar";
import { FaPersonRifle } from "react-icons/fa6";
import { FaEllipsisV, FaUser } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import AddFunding from "../../../pages/Home/Funding/AddFunding";
import AddFundingWallet from "./AddFundingWallet";

const Finstartup = () => {
  const [showw, setShoww] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCohortDropdown, setShowCohortDropdown] = useState(false); // Dropdown visibility
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);
  const [showFundingForm, setShowFundingForm] = useState(false);
  const handleFundingClick = () => setShowFundingForm(true);
  const handleFundingClose = () => setShowFundingForm(false);
  const [showFundingWalletForm, setShowFundingWalletForm] = useState(false);
  const handleFundingWalletClick = () => setShowFundingWalletForm(true);
  const handleFundingWalletClose = () => setShowFundingWalletForm(false);
  return (
    // <div className="flex ">
    //   <div className="">
    //     <SideBar/>
    //   </div>
    //   <div className="ml-[221px] flex-grow">
    //     <div>
    //       <NavBar
    //       />
    //     </div>
    //                     <div className="p-[90px;] h-full">
    //                         <div className='shadow-lg px-6 py-6 '>
    //                             <div className='text-xl text-dmsans'>Startups</div>
    //                     <div className="grid grid-cols-2 gap-5 px-6 m-6">
    //                         <div>
    //                         <div className="px-3"><input type="text" placeholder="Search for Startups" className="w-full rounded-md focus:ring-green-400"/></div>

    //                     </div>
    //                         <div className="flex justify-end">
    //                                 <a href="/fin-startups/updatefunding">
    //                                     <button className="text-gray-500 text-sm font-semibold mt-1 p- px-3 rounded-2xl shadow-md" style={{ backgroundColor: '#afdade' }}>
    //                                             Update Funding
    //                                     </button>
    //                                 </a>
    //                         </div>
    //                     </div>
    //                     <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    //                                     <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    //                                         <thead class="text-xs text-gray-800 uppercase dark:text-gray-500" style={{backgroundColor: '#7da1ad'}}>
    //                                             <tr>
    //                                                 <th scope="col" class="px-6 py-3">

    //                                                 </th>
    //                                                 <th scope="col" class="px-6 py-3">
    //                                                     Name
    //                                                 </th>
    //                                                 <th scope="col" class="px-6 py-3">
    //                                                     Cohort
    //                                                 </th>
    //                                                 <th scope="col" class="px-6 py-3">
    //                                                      Funding Distributred
    //                                                 </th>
    //                                                 <th scope="col" class="px-6 py-3">
    //                                                     Funding Utilized
    //                                                 </th>
    //                                                 <th scope="col" class="px-6 py-3">
    //                                                      Balance
    //                                                 </th>
    //                                                 <th scope="col" class="px-6 py-3">
    //                                                      Actions
    //                                                 </th>
    //                                             </tr>
    //                                         </thead>
    //                                         <tbody>
    //                                             <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
    //                                                 <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    //                                                 <div className="flex items-center justify-center">
    //                                                             <FaUser className="w-6 h-6" />
    //                                                 </div>

    //                                                 </th>
    //                                                 <td class="px-6 py-4">
    //                                                     Silver
    //                                                 </td>
    //                                                 <td class="px-6 py-4">
    //                                                     Laptop
    //                                                 </td>
    //                                                 <td class="px-6 py-4">
    //                                                     $2999
    //                                                 </td>
    //                                                 <td class="px-6 py-4">
    //                                                     $1999
    //                                                 </td>
    //                                                 <td class="px-6 py-4">
    //                                                     $1999
    //                                                 </td>
    //                                                 <td class="px-6 py-4">
    //                                                     <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
    //                                                 </td>
    //                                             </tr>
    //                                         </tbody>
    //                                     </table>
    //                                 </div>
    //                                 {/* table ends */}
    //                                 </div>
    //                     </div>
    //                     </div>
    //                 </div>
    <div className="flex">
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <div className="fixed top-0 left-[221px] right-0 z-50 bg-white shadow">
          <NavBar />
        </div>
        <div className="bg-gray-100 pt-20 min-h-screen">
          <div className={`mx-10 py-5 ${showw ? "visible" : ""}`}>
            <div className="border bg-white">
              <div className="px-5 pt-6 text-sm text-[#808080]">
                Dashboard {">"} Start-ups
              </div>
              <div className="font-bold text-lg px-5 pt-3">Start-ups</div>
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
                  <button
                    className="bg-[#45C74D] text-white px-5 py-2 rounded-lg text-base font-semibold shadow hover:bg-[#36a03d] transition"
                    onClick={handleFundingWalletClick}
                  >
                    Add Funding Wallet
                  </button>
                  <button
                    className="bg-[#45C74D] text-white px-8 py-2 rounded-lg text-base font-semibold shadow hover:bg-[#36a03d] transition"
                    onClick={handleFundingClick}
                  >
                    Add Funding
                  </button>
                </div>
              </div>
              <div className="border mt-5 border-dotted rounded-lg overflow-x-auto">
                <table className="min-w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-dotted">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Cohert</th>
                      <th className="px-4 py-2">Funding Disbursed</th>
                      <th className="px-4 py-2">Funding Utilized</th>
                      <th className="px-4 py-2">Balance</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-dotted">
                      <td className="px-4 py-2">""</td>
                      <td className="px-4 py-2"> </td>
                      <td className="px-4 py-2">""</td>
                      <td className="px-4 py-2">""</td>
                      <td className="px-4 py-2">""</td>
                      <td className="px-4 py-2">
                        <div className="relative inline-block text-right">
                          {/* Ellipsis Button */}
                          <button
                            className="rounded-full p-2 hover:bg-gray-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(
                                openDropdownId === "" ? null : ""
                              );
                            }}
                          >
                            <FaEllipsisV className="text-gray-500" />
                          </button>

                          {/* Dropdown Menu */}
                          {openDropdownId === "" && (
                            <div
                              className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50"
                              style={{ minWidth: "150px" }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // navigate(`/startupprofile/${startup.startup_id}`);
                                  setOpenDropdownId(null);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                View
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenEstablishPopUp(true);
                                  setOpenDropdownId(null);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showFundingForm && <AddFunding onClose={handleFundingClose} />}
      {showFundingWalletForm && (
        <AddFundingWallet onClose={handleFundingWalletClose} />
      )}
    </div>
  );
};

export default Finstartup;

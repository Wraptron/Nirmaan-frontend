import React, { useState, useEffect } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import {
  ApiAddConnections,
  ApiViewConnections,
  ApiEstablishConnections,
} from "../../API/API";
import "../../components/styles/style.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Connection() {
  const navigate = useNavigate();
  const handleAddConnectionclick = () => {
    navigate("/addconnections");
  };
  const handleAddContactclick = () => {
    navigate("/contacts");
  };
  // const [AddConnection, setAddConnection] = useState({
  //     name: '',
  //     designation: '',
  //     organisation: '',
  //     connect_for: '',
  //     contact_number: '',
  //     email_address: ''
  // })

  //   const handleChange = (e) => {
  //     const {name, value} = e.target;
  //     setAddConnection((prevData)=>({
  //         ...prevData,
  //         [name]: value,
  //     }))
  //   }

  //   const handleClick = async (e) =>{
  //       e.preventDefault();
  //       try
  //       {
  //         const API = await ApiAddConnections(AddConnection);
  //         if(API)
  //         {
  //             toast.success('Connection Added');
  //             setOpenpopup(false);
  //         }
  //       }
  //       catch(err)
  //       {
  //         if(err.response)
  //         {
  //             if(err.response.status===400)
  //             {
  //                 toast.error("All Fields are required");
  //             }
  //             else if(err.response.status===422)
  //             {
  //                 toast.error('Please provide a valid email')
  //             }
  //             else if(err.response.status===403)
  //             {
  //                 toast.error('Please provide a valid contact number')
  //             }
  //         }
  //         else {
  //             console.log(err.message);
  //         }
  //       }
  //     }

  //     const ViewConnection = async() => {
  //             try {
  //                 const API = await ApiViewConnections();
  //                 setData(API.rows);
  //             }
  //             catch(err)
  //             {
  //                 console.log(err);
  //             }
  //     }
  // // console.log(data);
  const [showw, setShow] = useState(false);
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
        {/* <div className={`p-[90px;] h-full`}>
                            <h1 className="text-3xl font-semibold text-gray-500">Connections</h1>
                            <div className={`grid grid-cols-3 mt-7 gap-10 content ${show ? "visible": ""}` }>
                                <div className="shadow-md font-semibold rounded-lg w-[100%;]" style={{backgroundColor: '#afdade'}}> 
                                            <div className="flex justify-center items-center "><button className="px-3 py-4 active:scale-[.98] active:duration-75 hover:scale-[1.08] ease-in-out transition-all" style={{color: '#0b5f66'}} onClick={handleShow}><FaPlusCircle size={55  }/></button></div>
                                            <div className="text-center text-gray-500">ADD CONNECTION</div>
                                </div>
                                {data.map((dataObj, index) => {
                                        let email_address = dataObj.email_address;
                                        return <div className="shadow-md font-semibold rounded-lg w-[100%;]" style={{backgroundColor: '#afdade'}}> 
                                                        <div className="flex justify-between p-3 text-xs border-b">
                                                            <div className="text-sm">ID: {dataObj.email_address}</div>
                                                            <div className="pt-1"><button className="text-gray-500" onClick={() => deleteConnection(email_address)}><FaTrashCan size={14}/></button></div>
                                                            <div className="pt-1"><button className="text-gray-500" onClick={handleEstablish}><FaTag size={14}/></button></div>
                                                            <div className="pt-1"><button className="text-gray-500"><FaPencil size={14}/></button></div>
                                                        </div>
                                                        <div className="grid grid-cols-2 md:p-6 mb-1">
                                                                <div className="flex justify-start items-start scale-[1.08] text-md"><span className="" style={{color: '#0b5f66'}}>{dataObj.connect_for}</span></div>
                                                                <div className="active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all flex justify-end items-end" style={{color: '#0b5f66'}}><button><FaSearch size={28}/></button></div>
                                                        </div>
                                                </div>;
                                })} 
                            </div>
                    </div> */}
        <div className="bg-gray-100">
          <div className={`mx-10 py-5  content ${showw ? "visible" : ""}`}>
            <div className="bg-white rounded-lg shadow-sm p-3">
              <div className="text-sm text-[#808080]">
                Dashboard {">"} Connections
              </div>
              <div className="pt-3 font-semibold text-lg">All Connections</div>
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
                    className="border border-[#45C74D] rounded-lg p-2 text-sm"
                    onClick={handleAddContactclick}
                  >
                    Contacts
                  </button>
                  <button
                    className="bg-[#45C74D] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    onClick={handleAddConnectionclick}
                  >
                    Establish Connections
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <div className="mt-10">
                  <table className="table-auto w-full">
                    <thead className="text-sm">
                      <tr>
                        <th>Start-up/ Mentor</th>
                        <th>Contact</th>
                        <th>Organisation</th>
                        <th>Purpose</th>
                        <th>Contact</th>
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
      {/* <AddConnections isVisible={openPopUp} onClose={()=>setOpenpopup(false)}>
                    <h1 className="text-xl p-3 pb-3 text-gray-500">Register for new connection</h1>
                    <form onSubmit={handleClick}>
                    <div className="grid grid-cols-2 p-3 gap-4">
                            <div class="relative">
                                <input type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="name" onChange={handleChange}/>
                                <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Name</label>
                            </div>
                            <div class="relative">
                                <input type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="designation" onChange={handleChange}/>
                                <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Designation</label>
                            </div>
                            <div class="relative">
                                <input type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="organisation" onChange={handleChange}/>
                                <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Organisation</label>
                            </div>
                            <div class="relative">
                                <input type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="connect_for" onChange={handleChange}/>
                                <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Connect For?</label>
                            </div>
                            <div class="relative">
                                <input type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="contact_number" onChange={handleChange} />
                                <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Contact Number</label>
                            </div>
                            <div class="relative">
                                <input type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="email_address" onChange={handleChange}/>
                                <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email Address</label>
                            </div>
                    </div>
                    <div className="flex justify-center items-center"><button className="text-gray-500 text-sm font-semibold mt-1 p-1 px-3 rounded-xl shadow-md active:scale-[.98] active:duration-75 hover:scale-[1.08] ease-in-out transition-all" style={{backgroundColor : '#afdade'}}>Register</button></div>
                    </form>
            </AddConnections> */}
    </div>
  );
}
export default Connection;

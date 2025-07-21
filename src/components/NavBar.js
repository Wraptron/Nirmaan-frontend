import React, { useEffect, useState, useCallback } from "react";
import img from "../assets/images/nirmaan-iitm.14fdf833.svg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ProfileModal from "./ProfileModal";
import "alertifyjs/build/css/alertify.css";
import Notification from "./Notification";
import ActionsModel from "../components/ActionsModel";
import Startupsvg from "../assets/images/Startups.svg";
import Mentorsvg from "../assets/images/Mentor.svg";
import ChatMessage from "../assets/images/message.svg";
import Mentorshipsvg from "../assets/images/Mentorships.svg";
import Eventsvg from "../assets/images/Event.svg";
import Bellsvg from "../assets/images/Component 14.svg";
import Usersvg from "../assets/images/User profile.svg";
import moresvg from "../assets/images/more.svg";
import More from "./More";
import startupsvg from "../assets/images/Startups.svg";

function NavBar({ onSelectionChange, selectedIndex }) {
  const [messageNotify, setMessageNotification] = useState(false);
  const handleClose = () => setMessageNotification(false);

  const [showModal, setShowModal] = useState(false);

  const [tokenData, setTokenData] = useState("");

  const UpdatedFundingData = async () => {
    try {
      const result = await axios.get(
        "http://13.127.7.121/api/v1/notification"
      );
      setTokenData(result.data.rows[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const tokenDecodedData = jwtDecode(localStorage.getItem("token"));

  const GetProfilePhotoImage = useCallback(async () => {
    try {
      await axios.get(
        `http://13.127.7.121/api/v1/prof?mail=${tokenDecodedData.user_mail}`
      );
    } catch (err) {
      console.log(err);
    }
  }, [tokenDecodedData.user_mail]);

  useEffect(() => {
    GetProfilePhotoImage();
  }, [GetProfilePhotoImage]);

  useEffect(() => {
    setInterval(() => {
      UpdatedFundingData();
    }, 5000);
  }, []);

  const [color] = useState([
    "#afdade",
    "#afd5de",
    "#afcdde",
    "#99b6bf",
    "#6d858c",
  ]);
  const [actionpopup, setActionpop] = useState(false);
  const handleActionShow = () => setActionpop(true);
  const handleActionClose = () => setActionpop(false);

  const pathName = window.location.pathname;

  const [morepopup, setMorepop] = useState(false);
  const handleMoreShow = () => setMorepop(true);
  const handleMoreClose = () => setMorepop(false);

  return (
    <div className="navbar dm-sans">
      <nav className="bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between p-3">
          <div className="flex md:order-2">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
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
              <span className="sr-only">Search</span>
            </button>
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 2 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                placeholder="Search..."
              />
            </div>
            <div className="relative hidden md:block">
              <button
                onClick={handleActionShow}
                className="bg-[#45C74D] text-white block py-2 px-2 rounded-lg ms-3 text-sm font-semibold"
              >
                Action
              </button>
            </div>
            <div className="relative md:block">
              <div className="text-black px-2 py-2 ms-3">
                <button>
                  <img src={Bellsvg} alt="Bell" />
                </button>
              </div>
            </div>
            <div className="relative md:block">
              <div className="text-black px-2 py-2 ms-3">
                <button onClick={handleMoreShow}>
                  <img src={moresvg} alt="More" />
                </button>
              </div>
            </div>
            <div className="relative md:block">
              <div className="text-black px-2 py-2 ms-3">
                <button>
                  <img src={Usersvg} alt="User" />
                </button>
              </div>
            </div>
            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
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
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            {pathName === "/home" && (
              <div className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {color.map((colors, index) => (
                  <button
                    key={index}
                    className="block py-2 px-3 text-black md:p-0 text-[#45C74D] hover:underline hover:underline-offset-[22px] hover:decoration-4 hover:decoration-[#45C74D]"
                    onClick={() => {
                      onSelectionChange(index);
                    }}
                  >
                    {["Overview"][index]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
      <Notification isVisible={messageNotify} onClose={handleClose}>
        {Array.isArray(tokenData) && tokenData.length > 0 ? (
          tokenData.map((dataObj, key) => (
            <div className="max-h-[50px]" key={key}>
              <div className="flex justify-between gap-10 bg-white mt-1">
                <div className="text-xs">
                  startup Vision have requested for a new connection with
                  startup Vision.
                  <br></br>
                  <span className="text-gray-400">Hello</span>
                </div>
                <button className="p-3 bg-gray-100 rounded-sm">View</button>
                <div className="m-2 inline-block w-[15px] h-[11px] text-sm font-semibold text-white bg-green-500 rounded-full relative">
                  <button className="w-full h-full"></button>
                  <span className="absolute left-1/2 top-[-90px] transform -translate-x-1/2 -translate-y-full bg-gray-300 text-white text-xs font-medium px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-200">
                    Mark as Read
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </Notification>
      <ProfileModal isVisible={showModal} onClose={() => setShowModal(false)}>
        <center>
          <img src={img} className="h-[60px;]" alt="Logo" />
        </center>
        <div className="grid grid-cols-2 cols-2 gap-4">
          <input
            name="name"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="Name"
            value={tokenData.user_name}
            readOnly
          />
          <input
            name="insti-type"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="Institution type"
          />
          <input
            name="sector"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="Sector"
            value={tokenData.user_department}
            readOnly
          />
          <input
            name="Email"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="Email"
            value={tokenData.user_mail}
            readOnly
          />
          <input
            name="contact_number"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="Contact Number"
          />
          <input
            name="website"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="Website"
          />
          <input
            name="linkedin"
            className="w-full border-2 border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="Linked In"
          />
          <input
            name="ceo_name"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="CEO name"
            value={tokenData.user_name}
            readOnly
          />
          <input
            name="ceo_email"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="CEO email"
            value={tokenData.personal_email}
            readOnly
          />
          <input
            name="ceo_contact_number"
            className="w-full border-2 border-gray-200 rounded-md p-2 mt-3 bg-transparent hover:border-green-300"
            placeholder="CEO contact number"
            value={tokenData.user_contact}
            readOnly
          />
          <button className="text-red-400 font-bold active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all">
            Cancel
          </button>
          <button className="text-white bg-green-400 rounded-sm font-bold active p-1 active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all">
            Update
          </button>
        </div>
      </ProfileModal>
      <ActionsModel
        isVisible={actionpopup}
        onClose={() => handleActionClose(false)}
      >
        <div className="flex justfiy-between px-2 gap-4 mt-5 border p-3">
          <div className="">
            <img
              src={Startupsvg}
              className="w-[100px] bg-[#D8F3D9] p-3 rounded-lg"
              alt="Startup"
            />
          </div>
          <div className="">
            <span className="text-lg">Add New Start-up</span>
            <div className="text-xs">
              Search and connect with start-ups across sectors, industry &
              experience.
            </div>
          </div>
        </div>
        <div className="flex justfiy-between px-2 gap-4 mt-5 border p-3">
          <div className="">
            <img
              src={Mentorsvg}
              className="w-[100px] bg-[#D8F3D9] p-3 rounded-lg"
              alt="Mentor"
            />
          </div>
          <div className="">
            <span className="text-lg">Add New Mentor</span>
            <div className="text-xs">
              Search and connect with mentors across sectors, industry &
              experience.
            </div>
          </div>
        </div>
        <div className="flex justfiy-between px-2 gap-4 mt-5 border p-3">
          <div className="">
            <img
              src={ChatMessage}
              className="w-[100px] bg-[#D8F3D9] p-3 rounded-lg"
              alt="Chat"
            />
          </div>
          <div className="">
            <span className="text-lg">Create New Contact</span>
            <div className="text-xs">
              Create & publish job roles at your startups, and notify it to your
              network
            </div>
          </div>
        </div>
        <div className="flex justfiy-between px-2 gap-4 mt-5 border p-3">
          <div className="">
            <img
              src={Mentorshipsvg}
              className="w-[89px] bg-[#D8F3D9] p-3 rounded-lg"
              alt="Mentorship"
            />
          </div>
          <div className="">
            <span className="text-ลg">Mentoring Session</span>
            <div className="text-xs">
              Seamlessly Schedule a Mentoring Session with the Mentors.
            </div>
          </div>
        </div>
        <div className="flex justfiy-between px-2 gap-4 mt-5 border p-3">
          <div className="">
            <img
              src={Eventsvg}
              className="w-[89px] bg-[#D8F3D9] p-3 rounded-lg"
              alt="Event"
            />
          </div>
          <div className="">
            <span className="text-lg">Create New Event</span>
            <div className="text-xs">
              Effortlessly create and manage your next event with ease!
            </div>
          </div>
        </div>
      </ActionsModel>
      <More isVisible={morepopup} onClose={() => handleMoreClose(false)}>
        <div className="p-2">
          <div className="text-lg">Products</div>
          <div className="flex justify-between px-10 mt-5">
            <div className="bg-[#D8F3D9] p-3 rounded-lg min-w-[100px]">
              <div className="flex justify-center items-center">
                <img src={startupsvg} alt="Startup" />
              </div>
              <div className="flex justify-center items-center mt-3">
                Website
              </div>
            </div>
            <div className="bg-[#D8F3D9] p-3 rounded-lg min-w-[100px]">
              <div className="flex justify-center items-center">
                <img src={Mentorsvg} alt="Mentor" />
              </div>
              <div className="flex justify-center items-center mt-3">Notes</div>
            </div>
          </div>
          <div className="flex justify-between px-10 mt-5 gap-3">
            <div className="bg-[#D8F3D9] p-3 rounded-lg min-w-[100px]">
              <div className="flex justify-center items-center">
                <img src={ChatMessage} alt="Chat" />
              </div>
              <div className="flex justify-center items-center mt-3">DE</div>
            </div>
            <div className="bg-[#D8F3D9] p-3 rounded-lg min-w-[100px] max-w-[100px]">
              <div className="flex justify-center items-center">
                <img src={Mentorshipsvg} alt="Mentorship" />
              </div>
              <div className="flex justify-center items-center mt-3">
                Resources
              </div>
            </div>
          </div>
          <div className="flex justify-between px-10 mt-5">
            <div className="bg-[#D8F3D9] p-3 rounded-lg min-w-[100px]">
              <div className="flex justify-center items-center">
                <img src={Eventsvg} alt="Event" />
              </div>
              <div className="flex justify-center items-center mt-3">Drive</div>
            </div>
          </div>
        </div>
      </More>
    </div>
  );
}
export default NavBar;
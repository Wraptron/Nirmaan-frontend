import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import toast from "react-hot-toast";
import { ApiFetchEvents } from "../../API/API";
import { FaEllipsis } from "react-icons/fa6";
import calendersvg from "../../assets/images/Calendar.svg";
import Clocksvg from "../../assets/images/Clock.svg";
import { useNavigate } from "react-router-dom";
import RequestSpeaker from "./RequestSpeaker";
function Events() {
  const [showw, setShoww] = useState(false);
  const [showrequestspeaker, setshowrequestSpeaker] = useState(false);
  const navigate = useNavigate();
  const handladdeventclick = () => {
    navigate("/events/new");
  };

  const handlerequestspeakerclick = () => setshowrequestSpeaker(true);
  const handlerequestspeakerclose = () => {
    setshowrequestSpeaker(false);
  };

  const Events = async () => {
    try {
      await ApiFetchEvents();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    Events();
  }, []);

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="ms-[221px] flex-grow">
        <NavBar />
        <div className="bg-gray-100 min-h-screen">
          <div className={`mx-10 py-5  content ${showw ? "visible" : ""}`}>
            <div className="bg-white rounded-lg shadow-sm">
              <div className="flex gap-2 text-sm p-3 text-[#808080]">
                <div>Dashboard</div>
                <div>{">"}</div>
                <div>Events</div>
              </div>
              <div className="px-3 text-lg font-semibold pt-2">All Events</div>
              <div>
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
                      onClick={handlerequestspeakerclick}
                    >
                      Request Speaker
                    </button>
                    <button
                      className="bg-[#45C74D] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                      onClick={handladdeventclick}
                    >
                      Create Event
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-2 px-3 pb-3">
                <div className="grid grid-cols-3 gap-5">
                  <div className="shadow-lg rounded-lg border">
                    <div className="grid grid-cols-2 gap-4 px-3">
                      <div className="flex py-2 gap-2">
                        <div className="bg-[#FFE7CC] p-1  px-2 py-1 text-sm rounded-lg text-[#FF8800]">
                          Webinar
                        </div>
                        <div className="bg-[#C8DFFF] px-2 py-1 text-sm rounded-lg text-[#005FE4]">
                          Public
                        </div>
                      </div>
                      <div id="3dots">
                        <div className="flex justify-end items-end py-3">
                          <FaEllipsis />
                        </div>
                      </div>
                    </div>
                    <div className="px-3 pb-2 pt-2">
                      <div className="font-semibold text-lg">
                        Nirmaan-DemoDay
                      </div>
                      <div className="flex gap-4 pt-2">
                        <div className="flex gap-1">
                          <div>
                            <img
                              src={calendersvg}
                              width={"15px"}
                              alt="Calendar icon"
                            />
                          </div>
                          <div className="text-sm">MM/DD/YY</div>
                        </div>
                        <div className="flex gap-1">
                          <div>
                            <img
                              src={Clocksvg}
                              width={"15px"}
                              alt="Clock icon"
                            />
                          </div>
                          <div className="text-sm">HH:MM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <AddPastEvents isVisible={openPopUp} onClose={() => setOpenpopup(false)}>
        <h1 className="font-semibold">Add Past Events</h1>
        <form onSubmit={SubmitAddPastEvent}>
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div class="relative">
              <select
                id="countries"
                name="event_type"
                className="peer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChangePastEvent}
              >
                <option value="Webinar">Webinar</option>
                <option value="Conference">Conference</option>
                <option value="Seminar">Seminar</option>
                <option value="Workshop">Workshop</option>
                <option value="Masterclass">Masterclass</option>
              </select>
              <label
                for="countries"
                id="floatig_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-focus:dark:bg-gray-700 peer-focus:bg-white peer-focus:scale-75 peer-focus:-translate-y-6 left-2.5"
              >
                Event type
              </label>
            </div>
            <div className="relative">
              <input
                onChange={handleChangePastEvent}
                type="text"
                id="floating_outlined"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                name="event_title"
              />
              <label
                for="floating_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Event title
              </label>
            </div>
            <div className="relative">
              <input
                onChange={handleChangePastEvent}
                type="date"
                id="floating_outlined"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                name="event_date"
              />
              <label
                for="floating_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Event date
              </label>
            </div>
            <div className="relative">
              <input
                onChange={handleChangePastEvent}
                type="time"
                id="floating_outlined"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                name="event_time"
              />
              <label
                for="floating_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Event time
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-2">
            <textarea
              onChange={handleChangePastEvent}
              className="border rounded-md resize-none"
              name="event_description"
            ></textarea>
            <div class="relative">
              <select
                id="countries"
                className="peer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="select_speaker"
                onChange={handleChangePastEvent}
              >
                <option disabled selected>
                  Select Speaker
                </option>
                {Array.isArray(fetchedMentorData) &&
                fetchedMentorData.length > 0
                  ? fetchedMentorData.map((dataObj, key) => (
                      <option key={key} value={dataObj.mentor_name}>
                        {dataObj.mentor_name}
                      </option>
                    ))
                  : null}
              </select>
              <label
                for="countries"
                id="floatig_outlined"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-focus:dark:bg-gray-700 peer-focus:bg-white peer-focus:scale-75 peer-focus:-translate-y-6 left-2.5"
              >
                Select Speaker
              </label>
            </div>
          </div>
          <button
            className="text-gray-500 text-sm font-semibold mt-1 p-1 px-3 rounded-xl shadow-md flex items-center justify-center"
            style={{ backgroundColor: "#afcdde" }}
          >
            Submit
          </button>
        </form>
      </AddPastEvents> */}
      {showrequestspeaker && (
        <RequestSpeaker onClose={handlerequestspeakerclose} />
      )}
    </div>
  );
}

export default Events;

import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import toast from "react-hot-toast";
import { ApiDeleteEvent, ApiFetchEvents } from "../../API/API";
import { FaEllipsis } from "react-icons/fa6";
import calendersvg from "../../assets/images/Calendar.svg";
import Clocksvg from "../../assets/images/Clock.svg";
import { useNavigate } from "react-router-dom";
import RequestSpeaker from "./RequestSpeaker";
import EventDetails from "./EventDetails";
import DeleteConfirmation from "../../components/DeleteConfirmation";
function Events() {
  const [showw, setShoww] = useState(false);
  const [events, setEvents] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showrequestspeaker, setshowrequestSpeaker] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleEventPopupClick = () => setShowEventPopup(true);
  const handleEventPopupClose = async () => {
    setShowEventPopup(false);
  };
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
      const response = await ApiFetchEvents();
      setEvents(response?.rows);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    Events();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "--";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "--";

    // If backend sends ISO datetime
    const date = new Date(timeString);
    if (!isNaN(date)) {
      return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    // If backend sends HH:mm:ss
    return timeString.slice(0, 5);
  };

  const handleDelete = async (id) => {
    try {
      const API = await ApiDeleteEvent(id);
      if (API) {
        toast.success("Event deleted successfully");
        const updateddata = events.filter((event) => event.event_id !== id);
        setEvents(updateddata);
        setOpenDropdownId(null);
      } else {
        toast.error("Failed to delete event.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.event_title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );


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
                  {/* Search Input */}
                  <div className="relative w-96">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-[#45C74D] focus:border-[#45C74D]"
                    />
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
                {filteredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredEvents.map((event, index) => (
                      <div
                        key={index}
                        className="shadow-lg rounded-lg border bg-white"
                      >
                        <div className="grid grid-cols-2 gap-4 px-3">
                          <div className="flex py-2 gap-2">
                            <div className="bg-[#FFE7CC] px-2 py-1 text-sm rounded-lg text-[#FF8800]">
                              {event.event_type}
                            </div>
                            <div className="bg-[#C8DFFF] px-2 py-1 text-sm rounded-lg text-[#005FE4]">
                              {event.event_privacy}
                            </div>
                          </div>

                          <div className="flex justify-end items-center">
                            <div className="relative inline-block">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenDropdownId(
                                    openDropdownId === event.event_id
                                      ? null
                                      : event.event_id,
                                  );
                                }}
                                className="text-black hover:text-gray-600"
                              >
                                <FaEllipsis />
                              </button>
                              {openDropdownId === event.event_id && (
                                <div
                                  className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="py-1">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenDropdownId(null);
                                        setSelectedEvent(event);
                                        handleEventPopupClick();
                                      }}
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      View
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenDropdownId(null);
                                      }}
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      Share
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenDropdownId(null);
                                      }}
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedEvent(event);
                                        setOpenEstablishPopUp(true);
                                        setOpenDropdownId(null);
                                      }}
                                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="px-5">
                          <div className="relative rounded-xl overflow-hidden">
                            <img
                              src={event.event_thumbnail}
                              alt="Event"
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        </div>

                        <div className="px-3 pb-2 pt-2">
                          <div className="font-semibold text-lg">
                            {event.event_title}
                          </div>

                          <div className="flex gap-4 pt-2">
                            <div className="flex gap-1 items-center">
                              <img
                                src={calendersvg}
                                width="15"
                                alt="Calendar"
                              />
                              <span className="text-sm">
                                {formatDate(event.event_date)}
                              </span>
                            </div>

                            <div className="flex gap-1 items-center">
                              <img src={Clocksvg} width="15" alt="Clock" />
                              <span className="text-sm">
                                {formatTime(event.event_time)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-32">
                    <p className="text-gray-500">No events found.</p>
                  </div>
                )}
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
      {showEventPopup && (
        <EventDetails
          eventdata={selectedEvent}
          onClose={handleEventPopupClose}
        />
      )}

      {showrequestspeaker && (
        <RequestSpeaker onClose={handlerequestspeakerclose} />
      )}

      <DeleteConfirmation
        isVisible={openEstablishPopUp}
        onClose={() => setOpenEstablishPopUp(false)}
      >
        <h1 className="text-center font-semibold text-2xl">Are you sure?</h1>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            className="text-gray-500 font-semibold p-2 rounded-xl shadow"
            onClick={() => {
              handleDelete(selectedEvent.event_id);
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
  );
}

export default Events;

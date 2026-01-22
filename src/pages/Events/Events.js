import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import toast from "react-hot-toast";
import { ApiDeleteEvent, ApiFetchEvents } from "../../API/API";
import { FaEllipsis } from "react-icons/fa6";
import calendersvg from "../../assets/images/Calendar.svg";
import Clocksvg from "../../assets/images/Clock.svg";
import { Navigate, useNavigate } from "react-router-dom";
import RequestSpeaker from "./RequestSpeaker";
import EventDetails from "./EventDetails";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import { FaEllipsisV, FaSpinner } from "react-icons/fa";
import { BsListUl } from "react-icons/bs";
import { MdViewModule } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
function Events() {
  const [showw, setShoww] = useState(false);
  const [events, setEvents] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [openEstablishPopUp, setOpenEstablishPopUp] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showrequestspeaker, setshowrequestSpeaker] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("card");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(6);

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    placement: "bottom", // or "top"
  });

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
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
      setLoading(true);
      const response = await ApiFetchEvents();
      setEvents(response?.rows);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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

        const updatedEvent = updateddata.filter((event) =>
          event.event_type.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        const updatedTotalPages = Math.ceil(updatedEvent.length / rowsPerPage);
        if (currentPage > updatedTotalPages && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        toast.error("Failed to delete event.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.event_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.event_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.speaker?.toLowerCase().includes(searchTerm.toLowerCase())
    
  );

  const indexOfLastEvent = currentPage * rowsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - rowsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent,
  );
  const totalPages = Math.ceil(filteredEvents.length / rowsPerPage);

  const token = sessionStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    return <Navigate to="/" replace />;
  }
  
  if (decoded.role !== 2) {
    return <Navigate to="/" replace />;
  }
  

  return (
    <div className="flex">
      <SideBar />
      <div className="ms-[221px] flex-grow">
        <NavBar />
        <div className="bg-[#f9f9f9] min-h-screen p-0">
          <div className={`mx-10 content ${showw ? "visible" : ""}`}>
            <div className="bg-white rounded-lg shadow-sm">
              <div className="flex gap-2 text-sm p-3 text-[#808080]">
                <div>Dashboard</div>
                <div>{">"}</div>
                <div>Events</div>
              </div>
              <div className="px-3 text-lg font-semibold ">All Events</div>
              <div>
                <div className="flex flex-wrap items-center justify-between px-4">
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

                    <div className="flex gap-2 border border-gray-300 rounded-lg p-1 bg-white">
                      <button
                        onClick={() => setViewMode("card")}
                        className={`p-2 rounded transition-all ${
                          viewMode === "card"
                            ? "bg-[#45C74D] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        title="Card View"
                      >
                        <MdViewModule />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded transition-all ${
                          viewMode === "list"
                            ? "bg-[#45C74D] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        title="List View"
                      >
                        <BsListUl />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <FaSpinner className="animate-spin text-4xl text-[#45C74D]" />
                  <span className="ml-3 text-lg">Loading Events...</span>
                </div>
              ) : (
                <>
                  {/* Events Grid */}
                  {viewMode === "card" && (
                    <div className="max-w-7xl mx-auto px-2 mt-4 pb-4">
                      {currentEvents.length > 0 ? (
                        <div className="grid grid-cols-3 gap-5">
                          {currentEvents.map((event, index) => (
                            <div
                              key={index}
                              className="shadow-lg rounded-lg border bg-white"
                            >
                              <div className="grid grid-cols-2 gap-4 px-3">
                                <div className="flex py-1 gap-2">
                                  <div className="bg-[#FFE7CC] px-2 py-1 text-sm rounded-lg text-[#FF8800]">
                                    {event.event_type}
                                  </div>
                                  <div className="bg-[#C8DFFF] px-1 py-1 text-sm rounded-lg text-[#005FE4]">
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
                                    className="w-full h-32 object-cover"
                                  />
                                </div>
                              </div>

                              <div className="px-3 pb-2 pt-2">
                                <div className="font-semibold text-lg">
                                  {event.event_title}
                                </div>

                                <div className="flex gap-4 ">
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
                                    <img
                                      src={Clocksvg}
                                      width="15"
                                      alt="Clock"
                                    />
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
                  )}

                  {viewMode === "list" && (
                    <div className="bg-white rounded-lg shadow pt-5">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                              <div className="flex items-center gap-1">
                                Event Type
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                              <div className="flex items-center gap-1">
                                Title
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                              <div className="flex items-center gap-1">
                                Speaker
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                              <div className="flex items-center gap-1">
                                Date
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                              <div className="flex items-center gap-1">
                                Time
                              </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {currentEvents.length > 0 ? (
                            currentEvents.map((event) => (
                              <tr
                                key={event.event_id}
                                className="hover:bg-gray-50"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {event.event_type || "Event Name"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {event.event_title || "Title"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {event.speaker || "Speaker Name"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {formatDate(event.event_date) || "DD/MM/YYYY"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {formatTime(event.event_time) || "HR:MM"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm relative">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();

                                      const rect =
                                        e.currentTarget.getBoundingClientRect();
                                      const dropdownHeight = 160; // approx height of menu
                                      const viewportHeight = window.innerHeight;

                                      const spaceBelow =
                                        viewportHeight - rect.bottom;
                                      const spaceAbove = rect.top;

                                      const placement =
                                        spaceBelow < dropdownHeight &&
                                        spaceAbove > dropdownHeight
                                          ? "top"
                                          : "bottom";

                                      setDropdownPosition({
                                        top:
                                          placement === "bottom"
                                            ? rect.bottom + 6
                                            : rect.top - dropdownHeight - 6,
                                        left: rect.right - 128, // dropdown width
                                        placement,
                                      });

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
                                      className="fixed w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]"
                                      style={{
                                        top: dropdownPosition.top,
                                        left: dropdownPosition.left,
                                      }}
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
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="8"
                                className="px-6 py-12 text-center text-gray-500"
                              >
                                No data available for Events
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 py-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-500"
                        : "bg-[#45C74D] text-white hover:bg-[#3BAF43]"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages} ({filteredEvents.length}{" "}
                    Events)
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-500"
                        : "bg-[#45C74D] text-white hover:bg-[#3BAF43]"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
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

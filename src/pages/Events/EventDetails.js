import React from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa"; 
import { FiExternalLink } from "react-icons/fi";

function EventDetails({ eventdata, onClose }) {
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


 if (!eventdata) {
   return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
       <div className="bg-white w-[450px] rounded-xl shadow-xl p-6 flex flex-col items-center justify-center">
         {/* Spinner */}
         <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

         <p className="mt-4 text-sm text-gray-600">Loading event details...</p>
       </div>
     </div>
   );
    }
    
    console.log("Event Data:", eventdata);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[450px] rounded-xl shadow-xl p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M1 13L13 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {/* Thumbnail */}
        <div className="w-full h-52 overflow-hidden rounded-lg mb-4">
          {eventdata.event_thumbnail ? (
            <img
              src={eventdata.event_thumbnail}
              alt="Thumbnail"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              No Thumbnail
            </div>
          )}
        </div>
        {/* Title + Privacy */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {eventdata.event_title || "Event Title"}
          </h2>
          <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
            {eventdata.event_privacy}
          </span>
        </div>
        <p className="text-gray-500 text-sm">{eventdata.event_type}</p>
        {/* Speaker */}
        <div className="mt-3 text-sm">
          <p className="font-semibold">Speaker:</p>
          <p>{eventdata.speaker || "--"}</p>
        </div>
        {/* Description */}
        <div className="mt-3 text-sm text-gray-700">
          {eventdata.description || "No description added"}
        </div>

        <div className="flex justify-between mt-4 text-sm">
          {/* Date */}
          <div className="flex items-center gap-2 text-gray-700">
            <MdOutlineCalendarMonth className="text-lg" />
            <span>{formatDate(eventdata.event_date || "--")}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 text-gray-700">
            <FaRegClock className="text-lg" />
            <span>{formatTime(eventdata.event_time || "--")}</span>
          </div>
        </div>

        {/* Event Link */}
        <div className="mt-4">
          <p className="font-medium">Event Link</p>
          <div className="relative mt-1">
            <input
              type="text"
              disabled
              value={eventdata.event_link}
              className="w-full p-2 pr-10 border rounded bg-gray-100"
            />

            <FiExternalLink
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              size={18}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;

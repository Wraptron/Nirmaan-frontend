import React from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa"; // FontAwesome
import { FiExternalLink } from "react-icons/fi";


function EventPreview({ eventdata, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[450px] rounded-xl shadow-xl p-5">
        {/* Thumbnail */}
        <div className="w-full h-52 overflow-hidden rounded-lg mb-4">
          {eventdata.thumbnail ? (
            <img
              src={URL.createObjectURL(eventdata.thumbnail)}
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
            <span>{eventdata.event_date || "--"}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 text-gray-700">
            <FaRegClock className="text-lg" />
            <span>{eventdata.event_time || "--"}</span>
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
        {/* Buttons */}
        <div className="flex justify-center mt-5 gap-5">
          <button
            className="px-4 py-2 rounded-lg text-[#45C74D] border border-[#45C74D]"
            onClick={onClose}
          >
            Back
          </button>

          <button className="px-4 py-2 bg-[#45C74D] text-white rounded-lg">
            Confirm Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventPreview;

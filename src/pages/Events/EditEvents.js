import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/sidebar";
import mentorsvg from "../../assets/images/Frame (11).svg";
import { FiUpload } from "react-icons/fi";
import EventPreview from "./EventPreview";
import toast from "react-hot-toast";
import { ApiUpdateEvent } from "../../API/API";

function EditEvents({ initialData, onClose,onUpdate }) {
  const [eventdata, setEventdata] = useState({
    event_type: "",
    event_title: "",
    event_privacy: "Private",
    speaker: "",
    event_date: "",
    event_time: "",
    event_link: "",
    thumbnail: "",
    description: "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "--";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const fixDateForInput = (dateStr) => {
    if (!dateStr) return "";

    // Extract just the date part (YYYY-MM-DD) without timezone conversion
    // This prevents timezone shifts
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (initialData) {
      setEventdata({
        event_type: initialData.event_type || "",
        event_title: initialData.event_title || "",
        event_privacy: initialData.event_privacy,
        speaker: initialData.speaker || "",
        event_date: fixDateForInput(initialData.event_date) || "",
        event_time: initialData.event_time || "",
        event_link: initialData.event_link || "",
        thumbnail: initialData.event_thumbnail,
        description: initialData.event_description || "",
        event_id: initialData.event_id,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (file) => {
    if (file) {
      setEventdata((prev) => ({
        ...prev,
        thumbnail: file,
      }));
    }
  };

  const clearForm = () => {
    setEventdata({
      event_type: "",
      event_title: "",
      event_privacy: "Private",
      speaker: "",
      event_date: "",
      event_time: "",
      event_link: "",
      thumbnail: "",
      description: "",
    });
  };

  const removeThumbnail = () => {
    setEventdata((prev) => ({
      ...prev,
      thumbnail: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(eventdata).forEach((key) => {
        if (key !== "thumbnail") {
          formData.append(key, eventdata[key]);
        }
      });

      // 👇 Only append file if it's a File
      if (eventdata.thumbnail instanceof File) {
        formData.append("thumbnail", eventdata.thumbnail);
      } else {
        // send existing thumbnail url
        formData.append("thumbnail", eventdata.thumbnail);
      }

        const res = await ApiUpdateEvent(formData);
         onUpdate({ ...res, event_id: eventdata.event_id });
        toast.success("Event updated successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Event Details");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[700px] h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M1 13L13 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-[#232323] mb-6">
            Edit Event Details
          </h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block font-medium mb-1">
                  Event Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="event_type"
                  value={eventdata.event_type}
                  onChange={handleChange}
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                >
                  <option>Select event type</option>
                  <option value="webinar">Webinar</option>
                  <option value="conference">Conference</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="event_title"
                  value={eventdata.event_title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Event Privacy <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="event_privacy"
                      value="Private"
                      onChange={handleChange}
                      checked={eventdata.event_privacy === "Private"}
                      className="mr-2 text-[#45C74D]"
                    />
                    Private
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="event_privacy"
                      value="Public"
                      onChange={handleChange}
                      checked={eventdata.event_privacy === "Public"}
                      className="mr-2 text-[#45C74D]"
                    />
                    Public
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Speaker <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="speaker"
                  value={eventdata.speaker}
                  onChange={handleChange}
                  placeholder="Enter speaker name"
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block font-medium mb-1">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="event_date"
                  value={eventdata.event_date}
                  onChange={handleChange}
                  className=" w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block font-medium mb-1">
                  Event Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="event_time"
                  value={eventdata.event_time}
                  onChange={handleChange}
                  className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Event Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="event_link"
                  value={eventdata.event_link}
                  onChange={handleChange}
                  placeholder="Enter virtual meeting link"
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                />
              </div>

              <div>
                <label className="block text-sm mb-1.5">Thumbnail</label>

                {eventdata.thumbnail &&
                  typeof eventdata.thumbnail === "string" && (
                    <div className="mb-2 text-sm text-gray-600">
                      {eventdata.thumbnail.split("/").pop()}
                    </div>
                  )}

                <div className="flex items-center gap-3">
                  <label className="h-10 px-4 text-sm font-medium flex items-center gap-2 text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors cursor-pointer">
                    <FiUpload size={16} />
                    Upload New
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                    />
                  </label>

                  {eventdata.thumbnail && (
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="text-sm text-red-500 underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="pt-5">
              <label className="block font-medium mb-1">
                Event Description
              </label>
              <textarea
                rows="4"
                name="description"
                value={eventdata.description}
                onChange={handleChange}
                placeholder="Type here..."
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-between pt-4 items-center">
              <button
                type="button"
                onClick={clearForm}
                className="px-4 py-2 text-[#45C74D] underline"
              >
                Clear Form
              </button>

              <div className="flex-1 flex justify-center">
                <button
                  type="button"
                  className="px-4 py-2 bg-[#45C74D] text-white rounded-lg"
                  onClick={handleSubmit}
                >
                  Edit Event
                </button>
              </div>

              {/* Empty right side to balance layout */}
              <div className="w-16"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEvents;

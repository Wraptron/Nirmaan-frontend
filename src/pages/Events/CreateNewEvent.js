import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/sidebar";
import mentorsvg from "../../assets/images/Frame (11).svg";
import { FiUpload } from "react-icons/fi";

function CreateNewEvent() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDocumentUpload = (file) => {
    if (file) {
      setEventdata((prev) => ({
        ...prev,
        thumbnail: file,
      }));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="ml-[221px] flex-1 flex flex-col">
        <NavBar />
        <div className="mx-10 py-5 ">
          <div className="bg-white rounded-sm px-10 py-10">
            {/* Breadcrumb */}
            <div className="text-sm text-[#808080]">
              Dashboard {">"} Events {">"} Create Event
            </div>

            {/* Heading */}
            <div className="text-lg font-semibold pt-2 flex gap-3 items-center">
              <a href="/events">
                <img src={mentorsvg} alt="Back" />
              </a>
              <div className="text-lg font-semibold">Event Details</div>
            </div>

            {/* Form */}
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
                        className="mr-2"
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
                        className="mr-2"
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
                  <div className="flex items-center gap-2">
                    <label className="h-10 px-4 text-sm font-medium flex items-center gap-2 text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] transition-colors cursor-pointer">
                      <FiUpload size={16} />
                      Upload
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpeg"
                        onChange={(e) =>
                          handleDocumentUpload(e.target.files[0])
                        }
                      />
                    </label>
                    <span className="text-sm text-gray-500">
                      {eventdata.thumbnail
                        ? eventdata.thumbnail.name
                        : "No file chosen"}
                    </span>
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
              <div className="flex justify-between pt-4">
                <button
                  type="reset"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded"
                  // onClick={handleReset}
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#45C74D] text-white rounded"
                >
                  Preview
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewEvent;

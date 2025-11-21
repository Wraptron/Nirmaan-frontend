import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/sidebar";
import mentorsvg from "../../assets/images/Frame (11).svg";

function AddConnections() {
  const [connectiondata, setConnectiondata] = useState({
    startup: "",
    contact: "",
    email_content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConnectiondata((prev) => ({
      ...prev,
      [name]: value,
    }));
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
              Dashboard {">"} Connections {">"} Establish Connection
            </div>

            {/* Heading */}
            <div className="text-lg font-semibold pt-2 flex gap-3 items-center">
              <a href="/connections">
                <img src={mentorsvg} alt="Back" />
              </a>
              <div className="text-lg font-semibold">Establish Connection</div>
            </div>

            {/* Form */}
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* <div>
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
                </div> */}

                <div>
                  <label className="block font-medium mb-1">
                    Start-up/Mentor<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="startup"
                    value={connectiondata.startup}
                    onChange={handleChange}
                    placeholder="Enter Start-up/Mentor"
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Contact <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={connectiondata.contact}
                    onChange={handleChange}
                    placeholder="Enter Contact"
                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                  />
                </div>
              </div>

              {/* Event Description */}
              <div className="pt-5">
                <label className="block font-medium mb-1">Email Content</label>
                <textarea
                  rows="4"
                  name="email_content"
                  value={connectiondata.email_content}
                  onChange={handleChange}
                  placeholder="Type here..."
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-between pt-4 items-center">
                <button
                  type="reset"
                  className="px-4 py-2 text-[#45C74D] underline"
                >
                  Clear Form
                </button>

                <div className="flex-1 flex justify-center">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#45C74D] text-white rounded-lg"
                  >
                    Establish Connection
                  </button>
                </div>
                {/* Empty right side to balance layout */}
                <div className="w-16"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddConnections;

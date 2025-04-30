import React, { useRef } from "react";

const Step1 = ({ formData, handleChange }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a custom event to pass to handleChange
      const customEvent = {
        target: {
          name: "choose_logo",
          value: file.name,
        },
      };
      handleChange(customEvent);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 items-center mb-5">
        <div className="">
          <div className="">
            Name of the Mentor <span className="text-[#E54545]">*</span>
          </div>
          <div className="mt-1">
            <input
              type="text"
              name="mentor_name"
              value={formData.mentor_name}
              onChange={handleChange}
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
              placeholder="Enter name of the Mentor"
            />
          </div>
        </div>
        <div className="">
          <div className="">
            Choose Logo <span className="text-[#E54545]">*</span>
          </div>
          <div className="mt-1 flex">
            <input
              type="text"
              name="choose_logo"
              value={formData.choose_logo}
              onChange={handleChange}
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
              placeholder="No file chosen"
              readOnly
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <button
              onClick={triggerFileInput}
              className="ml-2 bg-[#45C74D] text-white py-2 px-4 rounded-lg flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                ></path>
              </svg>
              Upload
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="">
          <div className="">
            Description <span className="text-[#E54545]">*</span>
          </div>
          <div className="mt-1">
            <textarea
              type="text"
              name="mentor_description"
              value={formData.mentor_description}
              onChange={handleChange}
              rows="4"
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D] resize-none"
              placeholder="Type here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;

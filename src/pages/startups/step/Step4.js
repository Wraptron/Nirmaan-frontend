import React, {useRef, useState} from "react";

const Step4 = ({formData, handleChange}) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="grid grid-cols-1 mt-9 px-7">
          {/* <div>
                <div>Choose Logo</div>
                <div className="mt-1"><input type="text" onChange={handleChange} name="logo_image" value={formData.logo_image} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D] rezize-none"/></div>
          </div> */}
          <div className="">
          <div className="">
            Choose Logo <span className="text-[#E54545]">*</span>
          </div>
          <div className="mt-1 flex">
            <input
              type="text"
              name="logo_image"
              value={formData.logo_image}
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
          <div className="mt-4">
                <div>Description</div>
                <div className="mt-1"><textarea  onChange={handleChange} name="startup_description" value={formData.startup_description} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D] resize-none" placeholder="Type here"/></div>
          </div>
    </div>
  );
};

export default Step4;

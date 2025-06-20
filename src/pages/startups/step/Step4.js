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
  return (
    <div className="grid grid-cols-1 mt-9 px-7">
          <div>
                <div>Choose Logo</div>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={handleClick}
                    className="p-2 bg-[#45C74D] text-white rounded-lg text-sm"
                  >
                    Upload Logo
                  </button>
                  <span className="text-sm text-gray-700">{fileName || "No file chosen"}</span>
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

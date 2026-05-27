import React from "react";
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { ApiAddFunding, ApiFetchStartupData } from "../../../API/API";
import { getSessionUser } from "../../../utils/authSession";

const AddFunding = ({ onClose, onSuccess, startup_name, startup_id }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showStartupDropdown, setShowStartupDropdown] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    startup_id:"",
    startup_name: "",
    project_name: "",
    type: "",
    amount: "",
    status: "",
    purpose: "",
    date: "",
    refNo: "",
    document: null,
  });

  const Project_names = [
    "Nirmaan Seed Funding",
    "Shankar Endownment Fund",
    "Nirmaan External",
    "AI for Healthcare",
    "UGFIR",
    "PGFIR",
    "Nirmaan the Pre-Incubator",
    "Amex Program for Innovation & Entrepreneurship",
  ];

  const fetchData = async () => {
    try {
      const ApiStartup = await ApiFetchStartupData();
      const startupdata = Array.isArray(ApiStartup?.rows)
        ? ApiStartup.rows
        : [];

      
      setData(startupdata);
    } catch (error) {
      toast.error("Failed to fetch startup name");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (startup_id && startup_name) {
      setFormData((prev) => ({
        ...prev,
        startup_id,
        startup_name,
      }));
    }
  }, [startup_id, startup_name]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      setFormData((prev) => ({
        ...prev,
        type: value,
        status: value === "Funding Utilized" ? "Debit" : "Credit",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      document: e.target.files[0],
    }));
  };
  const handleSelect = (project) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        project_name: project,
      };
      return updated;
    });
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("startup_id", formData.startup_id);
    formPayload.append("startup_name", formData.startup_name);
    formPayload.append("funding_type", formData.type);
    formPayload.append("amount", formData.amount);
    formPayload.append("status", formData.status);
    formPayload.append("purpose", formData.purpose);
    formPayload.append("funding_date", formData.date);
    formPayload.append("reference_number", formData.refNo);
    formPayload.append("project_name", formData.project_name);

    // if (formData.document) {
    //   formPayload.append("document", formData.document);
    // }
    try {
      const response = await ApiAddFunding(formPayload);

      toast.success("Funding added successfully");
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }

    // Reset form
    // setFormData({
    //   project_name: "",
    //   type: "",
    //   amount: "",
    //   status: "",
    //   purpose: "",
    //   date: "",
    //   refNo: "",
    //   document: null,
    // });
  };

  const handleCancel = () => {
    setFormData({
      project_name: "",
      type: "",
      amount: "",
      status: "",
      purpose: "",
      date: "",
      refNo: "",
      document: null,
    });
    onClose();
  };

   const decoded = getSessionUser();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#232323]">
              Add Funding Entry
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX size={20} className="text-[#A1A1A1]" />
            </button>
          </div>

          {/* Form */}
          <div className="bg-gray-50 rounded-lg p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Startup Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="startup_name"
                  placeholder="Select Startup name"
                  value={formData.startup_name}
                  onFocus={() => setShowStartupDropdown(true)}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      startup_name: e.target.value,
                      startup_id: "",
                    }));
                    setShowStartupDropdown(true);
                  }}
                  onBlur={() =>
                    setTimeout(() => setShowStartupDropdown(false), 200)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#45C74D] focus:border-[#45C74D]"
                  autoComplete="off"
                />

                {showStartupDropdown && (
                  <ul className="absolute z-10 w-[24rem] p-2 text-sm text-gray-900 border border-gray-300 max-h-48 overflow-y-auto rounded-lg bg-gray-50">
                    {data
                      .filter((s) =>
                        (s.startup_name ?? "")
                          .toLowerCase()
                          .includes((formData.startup_name ?? "").toLowerCase())
                      )
                      .map((startup) => (
                        <li
                          key={startup.startup_id}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          onMouseDown={() => {
                            setFormData((prev) => ({
                              ...prev,
                              startup_name: startup.startup_name,
                              startup_id: startup.startup_id,
                            }));
                            setShowStartupDropdown(false);
                          }}
                        >
                          {startup.startup_name}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Project Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="project_name"
                  placeholder="Select Project name"
                  value={formData.project_name}
                  onFocus={() => setShowDropdown(true)}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      project_name: e.target.value,
                    }));
                    setShowDropdown(true);
                  }}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                  autoComplete="off"
                />

                {showDropdown && Project_names.length > 0 && (
                  <ul className="absolute z-10 w-[24rem] p-2 text-sm text-gray-900 border border-gray-300 max-h-48 overflow-y-auto rounded-lg bg-gray-50">
                    {Project_names.filter((p) =>
                      p
                        .toLowerCase()
                        .includes(formData.project_name.toLowerCase())
                    ).map((project, index) => (
                      <li
                        key={index}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        onMouseDown={() => handleSelect(project)}
                      >
                        {project}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  required
                >
                  <option value="">Select Type</option>
                  {decoded.role === 2 ||
                    (decoded.role === 3 && (
                      <option value="Funding Disbursed">
                        Funding Disbursed
                      </option>
                    ))}
                  <option value="Funding Utilized">Funding Utilized</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Purpose <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  placeholder="Enter purpose"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  required
                />
              </div>
              {formData.type !== "Funding Disbursed" && (
                <div>
                  <label className="block text-sm font-medium text-[#232323] mb-1">
                    Ref No
                  </label>
                  <input
                    type="text"
                    name="refNo"
                    value={formData.refNo}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                    placeholder="Enter reference number"
                  />
                </div>
              )}

              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#232323] mb-1">
                  Document
                </label>
                <input
                  type="file"
                  name="document"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#45C74D]"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>

              <div className="col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="bg-[#45C74D] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#36a03d] transition"
                >
                  Add Entry
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFunding;

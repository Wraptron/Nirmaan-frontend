import React, { useState, useEffect } from "react";

import { FiEdit2 } from "react-icons/fi";
import {
  ApiFetchFunding,
  ApiFetchFundingAmount,
  ApiFetchFundingProject,
  ApiFetchFundingProjectData,
} from "../../../API/API";

import toast from "react-hot-toast";
import EditFundingForm from "../../../pages/startups/step/EditForm/EditFundingForm";
import EditFundingWallet from "./EditFundingWallet";

const ProjectFundingDetail = ({ onClose, selectedProject }) => {
  const [fundingData, setFundingData] = useState([]);
  const [editFunding, setEditFunding] = useState(null);

  const [showEditFundingForm, setShowEditFundingForm] = useState(false);
  const handleEditFundingClick = () => setShowEditFundingForm(true);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = fundingData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(fundingData.length / rowsPerPage);

  const handleEditFundingClose = async () => {
    setShowEditFundingForm(false);
  };
  const handleEditFundingSubmit = async (updatedData) => {
    try {
      setFundingData((prev) =>
        prev.map((fund) =>
          fund.project_id === updatedData.project_id? { ...fund, ...updatedData } : fund
        )
      );
    } catch (error) {
      console.error("Error updating funding section:", error);
      toast.error("Failed to update funding section");
    }
  };

  const FetchData = async () => {
    try {
      const API = await ApiFetchFundingProjectData();
      const funding = API?.rows || [];
      const filteredFunding = funding
        .filter(
          (funding) => String(funding.project_name) === String(selectedProject)
        )   .sort((a, b) => a.project_id - b.project_id);
      setFundingData(filteredFunding || []);
    } catch (err) {
      console.error("Error fetching mentor data:", err);
    }
  };
  useEffect(() => {
    FetchData();
  }, [selectedProject]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 border border-dotted p-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-3 border border-dotted inline-block px-2">
          Funding
        </h2>

        <div className="border border-dotted rounded-lg overflow-x-auto ">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-dotted">
                <th className="px-4 py-2">Project Name</th>
                <th className="px-4 py-2">Funding Type</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <p className="text-lg text-gray-500">No funding added yet.</p>
              ) : (
                currentRows.map((fund) => (
                  <tr key={fund.project_id} className="border-b border-dotted">
                    <td className="px-4 py-2">{fund.project_name || "-"}</td>
                    <td className="px-4 py-2">{fund.funding_type || "-"}</td>
                    <td className="px-4 py-2">
                      {new Date(fund.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-2">
                      {" "}
                      {Number(fund.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center px-4 py-2 border-t border-dotted">

            {totalPages > 1 && (
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-2 py-1 border border-gray-400 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 border border-gray-400 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showEditFundingForm && (
        <EditFundingWallet
          initialData={editFunding}
          onClose={handleEditFundingClose}
          onSubmit={handleEditFundingSubmit}
        />
      )}
    </div>
  );
};

export default ProjectFundingDetail;

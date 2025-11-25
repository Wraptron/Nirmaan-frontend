import React, { useState, useEffect } from "react";

import { FiEdit2 } from "react-icons/fi";
import { ApiFetchFunding, ApiFetchFundingAmount } from "../../../API/API";
import EditFundingForm from "../../startups/step/EditForm/EditFundingForm";
import toast from "react-hot-toast";

const FundingDetail = ({ onClose, startup_id }) => {
  const [fundingData, setFundingData] = useState([]);
  const [fundingAmount, setFundingAmount] = useState([]);
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
          fund.id === updatedData.id ? { ...fund, ...updatedData } : fund
        )
      );
      toast.success("Funding updated successfully");
    } catch (error) {
      console.error("Error updating funding section:", error);
      toast.error("Failed to update funding section");
    }
  };

  const FetchData = async () => {
    try {
      const API = await ApiFetchFunding();
      const funding = API?.rows || [];
      const filteredFunding = funding
        .filter((funding) => String(funding.startup_id) === String(startup_id))
        .sort((a, b) => a.id - b.id);
      setFundingData(filteredFunding || []);

      const ApiFundingAmount = await ApiFetchFundingAmount();
      const amount = ApiFundingAmount || {};
      const fundamount = startup_id ? amount[startup_id] || null : null;
      setFundingAmount(fundamount || []);
    } catch (err) {
      console.error("Error fetching mentor data:", err);
    }
  };
  useEffect(() => {
    FetchData();
  }, [startup_id]);

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

        <div className="border border-dotted rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-dotted">
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Purpose</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Ref No</th>
                <th className="px-4 py-2">Document</th>
                <th className="px-4 py-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <p className="text-lg text-gray-500">No funding added yet.</p>
              ) : (
                currentRows.map((fund) => (
                  <tr key={fund.id} className="border-b border-dotted">
                    <td className="px-4 py-2">{fund.funding_type || "-"}</td>
                    <td className="px-4 py-2">
                      {" "}
                      {Number(fund.amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) || "-"}
                    </td>
                    <td className="px-4 py-2">{fund.status || "-"}</td>
                    <td className="px-4 py-2">{fund.purpose || "-"}</td>
                    <td className="px-4 py-2">{fund.funding_date || "-"}</td>
                    <td className="px-4 py-2">
                      {fund.reference_number || "-"}
                    </td>
                    <td className="px-4 py-2">{fund.document || "-"}</td>
                    <td className="px-4 py-2">
                      <FiEdit2
                        onClick={() => {
                          setEditFunding(fund);
                          setShowEditFundingForm(true);
                        }}
                        className="text-[#45C74D]"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Balance + Pagination */}
          <div className="flex justify-between items-center px-4 py-2 border-t border-dotted">
            <span className="text-sm font-medium">
              Balance: Rs. {fundingAmount?.balance || 0}
            </span>

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
        <EditFundingForm
          initialData={editFunding}
          startup_id={fundingData?.startup_id}
          onClose={handleEditFundingClose}
          onSubmit={handleEditFundingSubmit}
        />
      )}
    </div>
  );
};

export default FundingDetail;

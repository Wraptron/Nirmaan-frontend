import React, { useState } from "react";
import toast from "react-hot-toast";
import { ApiGetFundingDocumentUrl } from "../API/API";
import { hasFundingDocument } from "../utils/upload";

const FundingDocumentLink = ({ fundingId, document }) => {
  const [loading, setLoading] = useState(false);

  if (!hasFundingDocument(document)) {
    return <span>-</span>;
  }

  const handleOpen = async () => {
    setLoading(true);
    try {
      const { url } = await ApiGetFundingDocumentUrl(fundingId);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to open document.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleOpen}
      disabled={loading}
      className="text-[#45C74D] hover:underline disabled:opacity-50"
    >
      {loading ? "Opening..." : "View"}
    </button>
  );
};

export default FundingDocumentLink;

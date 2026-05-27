import React, { useState, useEffect } from "react";
import {
  ApiSaveFeedback,
  ApiFetchFeedback,
  ApiUpdateFeedback,
} from "../../API/API";
import toast from "react-hot-toast";

const FeedbackForm = ({
  isOpen,
  onClose,
  initialFeedback,
  meet_id,
  mentor_id,
  startup_id,
}) => {
  const [feedback, setFeedback] = useState("");
  const [isViewMode, setIsViewMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [savedFeedback, setSavedFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const feedback_id = initialFeedback?.feedback_id || null;

  useEffect(() => {
    if (isOpen) {
      if (initialFeedback) {
        setFeedback(initialFeedback.feedback_text || "");
        setSavedFeedback(initialFeedback);
      } else {
        setFeedback("");
        setSavedFeedback(null);
      }

      setIsViewMode(false);
    }
  }, [isOpen, initialFeedback]);

  const saveFeedback = async () => {
    if (!meet_id) {
      toast.error("Meeting ID is required");
      return false;
    }

    if (!feedback.trim()) {
      toast.error("Please enter feedback text");
      return false;
    }

    setIsSubmitting(true);
    try {
      const feedbackData = {
        meet_id,
        mentor_id,
        startup_id,
        feedback_text: feedback,
      };

      let response;

      if (initialFeedback?.feedback_id) {
        // Update existing feedback
        const updatePayload = {
          feedback_id: initialFeedback.feedback_id,
          feedback_text: feedback,
        };

        response = await ApiUpdateFeedback(updatePayload);

        if (response?.message === "Feedback Updated successfully") {
          toast.success("Feedback updated successfully");
          return true;
        }
      } else {
        // Save new feedback
        response = await ApiSaveFeedback(feedbackData);

        if (response?.message === "Feedback Saved successfully") {
          toast.success("Feedback saved successfully");
          return true;
        }
      }

      throw new Error(response?.error || "Failed to save/update feedback");
    } catch (err) {
      // console.error("Save error:", err);
      toast.error("Could not save/update feedback");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saved = await saveFeedback();
    if (saved) {
      onClose();
    }
  };
  const toggleViewMode = () => {
    setIsViewMode(!isViewMode);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6">
      <div className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Session Feedback</h2>
          {initialFeedback ? (
            <button
              onClick={async () => {
                const saved = await saveFeedback();
                if (saved) onClose();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          ) : (
            <button
              onClick={async () => {
                const saved = await saveFeedback();
                if (saved) onClose();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          {!isViewMode && (
            <div className="mb-4">
              {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div> */}
            </div>
          )}
          <div className="mb-4">
            {isViewMode ? (
              <div className="space-y-4">
                <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto">
                  <p className="font-medium mb-2">Rating: {rating}/5</p>
                  <p className="whitespace-pre-wrap">
                    {feedback || "No feedback available"}
                  </p>
                </div>
                {savedFeedback && (
                  <div className="text-sm text-gray-500">
                    <p>
                      Last updated:{" "}
                      {new Date(savedFeedback.updated_at).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Write your feedback notes here..."
                required
              />
            )}
          </div>
          <div className="flex justify-end space-x-3">
            {/* <button
              type="button"
              onClick={toggleViewMode}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              {isViewMode ? "Edit" : "View"}
            </button> */}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            {!isViewMode && (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting
                  ? feedback_id
                    ? "Updating..."
                    : "Saving..."
                  : feedback_id
                    ? "Update Feedback"
                    : "Save Feedback"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;

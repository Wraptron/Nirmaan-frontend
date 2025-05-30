import React, { useState, useEffect } from "react";
import { ApiSaveFeedback, ApiFetchFeedback } from "../../API/API";
import toast from "react-hot-toast";

const FeedbackModal = ({
  isOpen,
  onClose,
  onSave,
  initialFeedback = "",
  meetingId,
  mentorId,
  startupId,
}) => {
  const [feedback, setFeedback] = useState(initialFeedback);
  const [isViewMode, setIsViewMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [savedFeedback, setSavedFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing feedback when modal opens
  useEffect(() => {
    if (isOpen && meetingId) {
      fetchFeedback();
    }
  }, [isOpen, meetingId]);

  const fetchFeedback = async () => {
    try {
      const response = await ApiFetchFeedback(meetingId);
      if (response?.STATUS?.rows?.[0]) {
        const feedbackData = response.STATUS.rows[0];
        setSavedFeedback(feedbackData);
        setFeedback(feedbackData.feedback_text || "");
        setRating(feedbackData.rating || 0);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      toast.error("Failed to fetch feedback");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!meetingId) {
      toast.error("Meeting ID is required");
      return;
    }

    if (!feedback.trim()) {
      toast.error("Please enter feedback text");
      return;
    }

    setIsSubmitting(true);
    try {
      const feedbackData = {
        meeting_id: meetingId,
        feedback_text: feedback,
        rating: rating,
        mentor_id: mentorId,
        startup_id: startupId,
        created_at: new Date().toISOString(),
      };

      console.log("Sending feedback data:", feedbackData); // Debug log
      const response = await ApiSaveFeedback(meetingId, feedbackData);
      console.log("Save feedback response:", response); // Debug log

      if (response?.STATUS?.success) {
        toast.success("Feedback saved successfully");
        onSave(feedbackData);
        onClose();
      } else {
        throw new Error(response?.STATUS?.message || "Failed to save feedback");
      }
    } catch (error) {
      console.error("Error saving feedback:", error);
      toast.error(error.message || "Failed to save feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleViewMode = () => {
    setIsViewMode(!isViewMode);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Session Feedback</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {!isViewMode && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              </div>
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
            <button
              type="button"
              onClick={toggleViewMode}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              {isViewMode ? "Edit" : "View"}
            </button>
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
                  ? "Saving..."
                  : savedFeedback
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

export default FeedbackModal;

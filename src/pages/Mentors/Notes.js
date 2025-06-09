import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pencil, X, Save, ArrowLeft } from 'lucide-react';
import SideBar from '../../components/sidebar';
import NavBar from '../../components/NavBar';
import { ApiFetchScheduleMeetings, ApiFetchMentor } from '../../API/API';

const Notes = () => {
  const { notesId } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [savedContent, setSavedContent] = useState('');
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch meeting details
  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        setLoading(true);
        // First get all mentors to find the mentor_id
        const mentorResponse = await ApiFetchMentor();
        const allMentors = mentorResponse?.STATUS?.rows || [];
        
        // Find the meeting in each mentor's meetings
        let foundMeeting = null;
        let mentorId = null;

        for (const mentor of allMentors) {
          const meetingsResponse = await ApiFetchScheduleMeetings(mentor.mentor_id);
          const meetings = meetingsResponse?.STATUS?.rows || [];
          const meeting = meetings.find(m => String(m.meeting_id) === String(notesId));
          
          if (meeting) {
            foundMeeting = meeting;
            mentorId = mentor.mentor_id;
            break;
          }
        }

        if (foundMeeting) {
          setMeetingDetails({
            startUpName: foundMeeting.start_up_name || 'N/A',
            date: foundMeeting.date || 'N/A',
            duration: foundMeeting.meeting_duration || 'N/A',
            mode: foundMeeting.meeting_mode || 'N/A',
            mentorName: foundMeeting.mentor_name || 'N/A',
            status: foundMeeting.status || 'N/A',
            description: foundMeeting.description || 'N/A',
            meeting_link: foundMeeting.meeting_link || 'N/A',
            mentorId: mentorId
          });
        }

        // Load saved note
        const savedNote = localStorage.getItem(`meeting_note_${notesId}`);
        if (savedNote) {
          setNoteContent(savedNote);
          setSavedContent(savedNote);
        }
      } catch (error) {
        console.error('Error fetching meeting details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingDetails();
  }, [notesId]);

  // Toggle the note area
  const toggleNoteArea = () => {
    if (isOpen && noteContent !== savedContent) {
      saveNote(); // Auto-save on close
    }
    setIsOpen(!isOpen);
  };

  // Handle textarea change
  const handleContentChange = (e) => {
    setNoteContent(e.target.value);
  };

  // Save the note to localStorage
  const saveNote = () => {
    localStorage.setItem(`meeting_note_${notesId}`, noteContent);
    setSavedContent(noteContent);
  };

  if (loading) {
    return (
      <div className="flex">
        <SideBar />
        <div className="ms-[220px] bg-gray-100 flex-grow">
          <NavBar />
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Loading meeting details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!meetingDetails) {
    return (
      <div className="flex">
        <SideBar />
        <div className="ms-[220px] bg-gray-100 flex-grow">
          <NavBar />
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">Meeting not found</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="ms-[220px] bg-gray-100 flex-grow">
        <NavBar />
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="mr-2 p-2 rounded-full hover:bg-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Meeting Notes</h1>
          </div>

          {/* Meeting Details */}
          <div className="bg-white p-6 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-4">Meeting Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600">Startup</p>
                <p className="font-medium">{meetingDetails.startUpName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-medium">{meetingDetails.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium">{meetingDetails.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mode</p>
                <p className="font-medium">{meetingDetails.mode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mentor</p>
                <p className="font-medium">{meetingDetails.mentorName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-medium">{meetingDetails.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Link</p>
                {meetingDetails.meeting_link ? (
                  <a 
                    href={meetingDetails.meeting_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                  >
                    Join Meeting
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                ) : (
                  <p className="font-medium text-gray-500">No link available</p>
                )}
              </div>
            </div>
            {meetingDetails.description && meetingDetails.description !== 'N/A' && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">Description</p>
                <p className="font-medium mt-1">{meetingDetails.description}</p>
              </div>
            )}
          </div>

          {/* Notes Section */}
          <div className="bg-white p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Notes</h2>
              <button
                onClick={toggleNoteArea}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-white transition
                  ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                {isOpen ? (
                  <>
                    <X size={18} /> Close
                  </>
                ) : (
                  <>
                    <Pencil size={18} /> Edit Notes
                  </>
                )}
              </button>
            </div>

            {isOpen ? (
              <div className="space-y-4">
                <textarea
                  className="w-full h-64 p-4 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none"
                  placeholder="Write your meeting notes here..."
                  value={noteContent}
                  onChange={handleContentChange}
                  autoFocus
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {noteContent !== savedContent ? 'Unsaved changes' : 'All changes saved'}
                  </div>
                  <button
                    onClick={saveNote}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    <Save size={18} /> Save Notes
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-md min-h-[200px]">
                {noteContent ? (
                  <p className="whitespace-pre-wrap">{noteContent}</p>
                ) : (
                  <p className="text-gray-500 italic">No notes available. Click 'Edit Notes' to add some.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;

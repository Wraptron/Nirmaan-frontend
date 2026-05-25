import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/sidebar";
import mentorsvg from "../../assets/images/Frame (11).svg";
import {
  ApiFetchMentor,
  ApiFetchStartup,
  ApiScheduleMeeting,
  ApiUpdateMentorSessionRequest,
} from "../../API/API";
import { buildMeetingFormFromRequest } from "./sessionRequestHelpers";
import toast from "react-hot-toast";

const EMPTY_FORM = {
  startup_name: "",
  startup_id: "",
  founder_name: "",
  mentor_name: "",
  mentor_id: "",
  meeting_mode: "Virtual",
  meeting_link: "",
  meeting_location: "",
  participants: "",
  date: "",
  time: "",
  meeting_duration: "",
  meeting_agenda: "",
};

const durationOptions = ["30 mins", "1 hour"];

const inputClass =
  "block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#45C74D]/30 focus:border-[#45C74D]";

const labelClass = "block text-sm font-medium text-gray-700 mb-1";

function ScheduleMeetingForm({
  sessionRequest = null,
  sessionRequestId = null,
  fixedMentorId = null,
  onClose,
  onSuccess,
  asPopup = false,
}) {
  const fromRequest = Boolean(sessionRequest);
  const lockMentor = Boolean(fixedMentorId);
  const [startupname, setStartupName] = useState([]);
  const [mentorname, setMentorName] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [meetingdata, setMeetingdata] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const response = await ApiFetchStartup();
      setStartupName(
        response.rows.map((item) => ({
          id: item.startup_id,
          startup_name: item.startup_name,
        }))
      );
      const API = await ApiFetchMentor();
      const sortedData = API.STATUS?.rows || [];
      setMentorName(
        sortedData.map((row) => ({
          mentor_id: String(row.mentor_id),
          mentor_name: row.mentor_name,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!sessionRequest) return;
    const prefilled = buildMeetingFormFromRequest(sessionRequest);
    setMeetingdata((prev) => ({
      ...prev,
      ...prefilled,
      mentor_id: prefilled.mentor_id ? String(prefilled.mentor_id) : "",
    }));
    setSearchTerm(prefilled.startup_name || "");
  }, [sessionRequest]);

  useEffect(() => {
    if (!fixedMentorId || !mentorname.length) return;
    const mentor = mentorname.find(
      (m) => String(m.mentor_id) === String(fixedMentorId)
    );
    if (mentor) {
      setMeetingdata((prev) => ({
        ...prev,
        mentor_id: String(mentor.mentor_id),
        mentor_name: mentor.mentor_name,
      }));
    } else {
      setMeetingdata((prev) => ({
        ...prev,
        mentor_id: String(fixedMentorId),
      }));
    }
  }, [fixedMentorId, mentorname]);

  const filteredStartups = startupname
    .filter((startup) =>
      (startup.startup_name ?? "")
        .toLowerCase()
        .includes((searchTerm ?? "").toLowerCase())
    )
    .sort((a, b) =>
      (a.startup_name ?? "").localeCompare(b.startup_name ?? "")
    );

  const handleSelect = (startup) => {
    setMeetingdata((prev) => ({
      ...prev,
      startup_name: startup.startup_name,
      startup_id: String(startup.id),
    }));
    setSearchTerm(startup.startup_name);
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startup_name") {
      setSearchTerm(value);
      setShowDropdown(true);
      setMeetingdata((prev) => ({
        ...prev,
        startup_name: value,
        startup_id: "",
      }));
    } else {
      setMeetingdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!meetingdata.startup_id) newErrors.startup_name = "Startup is required";
    if (!meetingdata.founder_name?.trim())
      newErrors.founder_name = "Founder name is required";
    if (!meetingdata.mentor_id) newErrors.mentor_id = "Mentor is required";
    if (!meetingdata.date) newErrors.date = "Date is required";
    if (!meetingdata.time) newErrors.time = "Time is required";
    if (!meetingdata.meeting_duration)
      newErrors.meeting_duration = "Duration is required";
    if (
      meetingdata.meeting_mode === "Virtual" &&
      !meetingdata.meeting_link?.trim()
    ) {
      newErrors.meeting_link = "Meeting link is required";
    }
    if (
      meetingdata.meeting_mode === "In Person" &&
      !meetingdata.meeting_location?.trim()
    ) {
      newErrors.meeting_location = "Location is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newdate = new Date(meetingdata.date).toISOString().split("T")[0];
    const payload = {
      mentor_reference_id: meetingdata.mentor_id,
      ...meetingdata,
      date: newdate,
      time:
        meetingdata.time.length === 5
          ? `${meetingdata.time}:00`
          : meetingdata.time,
    };

    setSubmitting(true);
    try {
      await ApiScheduleMeeting(payload);
      if (sessionRequestId) {
        await ApiUpdateMentorSessionRequest(sessionRequestId, "accepted");
        toast.success("Meeting scheduled and request accepted.");
      } else {
        toast.success("Meeting scheduled successfully.");
      }
      onSuccess?.();
      onClose?.();
    } catch (error) {
      toast.error(
        error?.message || "Failed to schedule meeting. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fromRequest ? (
        <p className="text-sm text-gray-600 bg-[#f0faf0] border border-[#45C74D]/20 rounded-lg px-3 py-2.5">
          Fields are pre-filled from the startup request. You can edit anything
          before scheduling.
        </p>
      ) : null}

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
          Session details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative sm:col-span-2">
            <label className={labelClass}>
              Start-up <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Search or edit startup name"
              value={searchTerm}
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
                setMeetingdata((prev) => ({
                  ...prev,
                  startup_name: e.target.value,
                  startup_id: "",
                }));
              }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className={inputClass}
            />
            {errors.startup_name ? (
              <p className="text-red-500 text-xs mt-1">{errors.startup_name}</p>
            ) : null}
            {showDropdown && filteredStartups.length > 0 ? (
              <ul className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg text-sm">
                {filteredStartups.map((startup) => (
                  <li
                    key={startup.id}
                    onMouseDown={() => handleSelect(startup)}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-50"
                  >
                    {startup.startup_name}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div>
            <label className={labelClass}>
              Mentor <span className="text-red-500">*</span>
            </label>
            {lockMentor ? (
              <input
                type="text"
                readOnly
                value={meetingdata.mentor_name || "Mentor"}
                className={`${inputClass} bg-gray-50 text-gray-700`}
              />
            ) : (
              <select
                value={meetingdata.mentor_id}
                onChange={(e) => {
                  const mentor = mentorname.find(
                    (m) => String(m.mentor_id) === e.target.value
                  );
                  if (mentor) {
                    setMeetingdata((prev) => ({
                      ...prev,
                      mentor_id: String(mentor.mentor_id),
                      mentor_name: mentor.mentor_name,
                    }));
                  }
                }}
                className={inputClass}
              >
                <option value="">Select mentor</option>
                {mentorname.map((m) => (
                  <option key={m.mentor_id} value={String(m.mentor_id)}>
                    {m.mentor_name}
                  </option>
                ))}
              </select>
            )}
            {errors.mentor_id ? (
              <p className="text-red-500 text-xs mt-1">{errors.mentor_id}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass}>
              Founder / team member <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="founder_name"
              value={meetingdata.founder_name}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.founder_name ? (
              <p className="text-red-500 text-xs mt-1">{errors.founder_name}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass}>
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={meetingdata.date}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.date ? (
              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass}>
              Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="time"
              value={meetingdata.time}
              onChange={handleChange}
              className={inputClass}
            />
            {errors.time ? (
              <p className="text-red-500 text-xs mt-1">{errors.time}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass}>
              Duration <span className="text-red-500">*</span>
            </label>
            <select
              name="meeting_duration"
              value={meetingdata.meeting_duration}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select duration</option>
              {durationOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.meeting_duration ? (
              <p className="text-red-500 text-xs mt-1">
                {errors.meeting_duration}
              </p>
            ) : null}
          </div>

          <div>
            <label className={labelClass}>Participants</label>
            <input
              type="number"
              name="participants"
              value={meetingdata.participants}
              onChange={handleChange}
              placeholder="Optional"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
          Meeting setup
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <span className={labelClass}>Mode</span>
            <div className="flex gap-2 mt-1">
              {["Virtual", "In Person"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() =>
                    setMeetingdata((prev) => ({ ...prev, meeting_mode: mode }))
                  }
                  className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
                    meetingdata.meeting_mode === mode
                      ? "bg-[#45C74D] text-white border-[#45C74D]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {mode === "Virtual" ? "Online" : "In person"}
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            {meetingdata.meeting_mode === "Virtual" ? (
              <>
                <label className={labelClass}>
                  Meeting link <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="meeting_link"
                  value={meetingdata.meeting_link}
                  onChange={handleChange}
                  placeholder="https://meet.google.com/..."
                  className={inputClass}
                />
                {errors.meeting_link ? (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.meeting_link}
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <label className={labelClass}>
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="meeting_location"
                  value={meetingdata.meeting_location}
                  onChange={handleChange}
                  placeholder="Room or address"
                  className={inputClass}
                />
                {errors.meeting_location ? (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.meeting_location}
                  </p>
                ) : null}
              </>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Agenda</label>
            <textarea
              rows={3}
              name="meeting_agenda"
              value={meetingdata.meeting_agenda}
              onChange={handleChange}
              placeholder="Meeting agenda"
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-60"
          >
            Cancel
          </button>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 text-sm font-medium text-white bg-[#45C74D] rounded-lg hover:bg-[#3bae42] disabled:opacity-60"
        >
          {submitting
            ? "Scheduling…"
            : fromRequest
              ? "Schedule & accept"
              : "Schedule meeting"}
        </button>
      </div>
    </form>
  );

  if (asPopup) {
    return (
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-meeting-title"
      >
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[92vh] flex flex-col">
          <div className="shrink-0 px-6 py-4 border-b border-gray-100 flex items-start justify-between gap-4">
            <div>
              <h2
                id="schedule-meeting-title"
                className="text-lg font-semibold text-gray-900"
              >
                Schedule meeting
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {sessionRequest?.startup_name} · {sessionRequest?.mentor_name}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="overflow-y-auto px-6 py-5">{formContent}</div>
        </div>
      </div>
    );
  }

  return formContent;
}

export function ScheduleMeetingPopup({ sessionRequest, onClose, onSuccess }) {
  if (!sessionRequest) return null;
  return (
    <ScheduleMeetingForm
      sessionRequest={sessionRequest}
      sessionRequestId={sessionRequest.id}
      onClose={onClose}
      onSuccess={onSuccess}
      asPopup
    />
  );
}

/** Full-page schedule meeting (mentorship + mentor profile routes). */
export function ScheduleMeetingPage() {
  const { mentor_id: mentorIdFromRoute } = useParams();
  const navigate = useNavigate();
  const isMentorRoute = Boolean(mentorIdFromRoute);
  const backPath = isMentorRoute
    ? `/mentors/mentor_profile/${mentorIdFromRoute}`
    : "/mentorship";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="ml-[221px] flex-1 flex flex-col">
        <NavBar />
        <div className="mx-10 py-5">
          <div className="bg-white rounded-sm px-10 py-10">
            <div className="text-sm text-[#808080]">
              Dashboard {">"}{" "}
              {isMentorRoute ? "Mentors" : "Mentorship"} {">"} Schedule Session
            </div>
            <div className="text-lg font-semibold pt-2 flex gap-3 items-center">
              <button
                type="button"
                onClick={() => navigate(backPath)}
                className="p-0 border-0 bg-transparent cursor-pointer"
              >
                <img src={mentorsvg} alt="Back" />
              </button>
              <div>Schedule New Meeting</div>
            </div>
            <div className="mt-6">
              <ScheduleMeetingForm
                fixedMentorId={mentorIdFromRoute || null}
                onSuccess={() => navigate(backPath)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleMeetingForm;

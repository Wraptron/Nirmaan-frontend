import { getAuthSession } from "../../utils/authSession";

/** Map mentor session request fields → schedule meeting form. */

/** Resolve logged-in startup id from session (role 5). */
export const resolveStartupContext = () => {
  const session = getAuthSession();
  let startupId = session.startup_id || "";

  if (startupId != null && startupId !== "") {
    startupId = String(startupId);
  }

  return {
    startupId: startupId ? String(startupId) : "",
    startupName: "",
  };
};

export const mapDurationToMeetingLabel = (minutes) => {
  const n = Number(minutes);
  if (n <= 30) return "30 mins";
  return "1 hour";
};

export const mapSessionModeToMeetingMode = (mode) => {
  const value = String(mode || "").toLowerCase();
  if (value === "online") return "Virtual";
  return "In Person";
};

export const formatRequestDateForInput = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (!Number.isNaN(d.getTime())) {
    return d.toISOString().split("T")[0];
  }
  return String(value).slice(0, 10);
};

export const formatRequestTimeForInput = (value) => {
  if (!value) return "";
  return String(value).slice(0, 5);
};

export const buildMeetingFormFromRequest = (req) => ({
  startup_name: req.startup_name || "",
  startup_id: req.startup_id != null ? String(req.startup_id) : "",
  founder_name: "",
  mentor_name: req.mentor_name || "",
  mentor_id: req.mentor_id != null ? String(req.mentor_id) : "",
  meeting_mode: mapSessionModeToMeetingMode(req.session_mode),
  meeting_link: "",
  meeting_location: "",
  participants: "",
  date: formatRequestDateForInput(req.requested_date),
  time: formatRequestTimeForInput(req.requested_time),
  meeting_duration: mapDurationToMeetingLabel(req.duration),
  meeting_agenda: req.agenda || "",
});

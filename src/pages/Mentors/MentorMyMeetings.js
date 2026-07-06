import React, { useEffect, useMemo, useState } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import MeetingDetailsModal, {
  getMeetingStatus,
} from "../../components/MeetingDetailsModal";
import {
  ApiCancelMeeting,
  ApiFetchMeetingFeedback,
  ApiFetchScheduleMeetings,
} from "../../API/API";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import {
  Calendar,
  Clock,
  Video,
  ChevronRight,
  CalendarX2,
  Search,
} from "lucide-react";
import dayjs from "dayjs";
import FeedbackForm from "./FeedbackForm";
import { useAuth } from "../../context/AuthContext";

const ROWS_PER_PAGE = 10;

const FILTER_TABS = [
  {
    id: "all",
    label: "Total",
    inactive: "bg-white text-gray-800 ring-gray-200 hover:bg-gray-50",
    active: "bg-[#45C74D] text-white ring-[#45C74D] shadow-md shadow-[#45C74D]/25",
  },
  {
    id: "upcoming",
    label: "Upcoming",
    inactive: "bg-emerald-50 text-emerald-800 ring-emerald-200 hover:bg-emerald-100",
    active: "bg-[#45C74D] text-white ring-[#45C74D] shadow-md shadow-[#45C74D]/25",
  },
  {
    id: "today",
    label: "Today",
    inactive: "bg-blue-50 text-blue-800 ring-blue-200 hover:bg-blue-100",
    active: "bg-[#45C74D] text-white ring-[#45C74D] shadow-md shadow-[#45C74D]/25",
  },
  {
    id: "completed",
    label: "Completed",
    inactive: "bg-slate-100 text-slate-700 ring-slate-200 hover:bg-slate-200",
    active: "bg-[#45C74D] text-white ring-[#45C74D] shadow-md shadow-[#45C74D]/25",
  },
];

function normalizeMeetingsResponse(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.STATUS?.rows)) return data.STATUS.rows;
  return [];
}

function formatListDate(dateStr) {
  if (!dateStr) return "—";
  const parsed = dayjs(dateStr, ["D MMM YYYY", "YYYY-MM-DD"], true);
  const d = parsed.isValid() ? parsed : dayjs(dateStr);
  return d.isValid() ? d.format("DD MMM YYYY") : dateStr;
}

function formatTime(timeStr) {
  if (!timeStr) return "—";
  const t = dayjs(timeStr, ["HH:mm:ss", "H:mm:ss", "HH:mm", "h:mm A"], true);
  return t.isValid() ? t.format("h:mm A") : timeStr;
}

function MentorMyMeetings() {
  const { user } = useAuth();
  const mentorId = user?.mentor_id != null ? String(user.mentor_id) : null;
  const [meetings, setMeetings] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddFeedbackForm, setShowAddFeedbackForm] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [initialFeedback, setInitialFeedback] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusTab, setStatusTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [cancellingMeetingId, setCancellingMeetingId] = useState(null);

  const getStartupId = (m) => m?.startup_id ?? m?.startupId ?? m?.startupID ?? null;

  const fetchFeedbackForMeetings = async (meetingRows) => {
    if (!mentorId) return [];
    try {
      const feedbackPromises = meetingRows.map((m) =>
        getStartupId(m)
          ? ApiFetchMeetingFeedback(mentorId, getStartupId(m)).then((res) =>
              Array.isArray(res) ? res : res?.STATUS?.rows || res?.rows || []
            )
          : Promise.resolve([]),
      );

      const allFeedbackArrays = await Promise.all(feedbackPromises);
      return allFeedbackArrays.flat();
    } catch {
      return [];
    }
  };

  useEffect(() => {
    if (!mentorId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadMeetings = async () => {
      try {
        setLoading(true);
        const response = await ApiFetchScheduleMeetings(mentorId);
        if (cancelled) return;
        const rows = normalizeMeetingsResponse(response);
        const sorted = [...rows].sort((a, b) => {
          const da = dayjs(a.date, ["D MMM YYYY", "YYYY-MM-DD"], true);
          const db = dayjs(b.date, ["D MMM YYYY", "YYYY-MM-DD"], true);
          if (!da.isValid() || !db.isValid()) return 0;
          return db.valueOf() - da.valueOf();
        });
        setMeetings(sorted);
        const feedbackRows = await fetchFeedbackForMeetings(sorted);
        if (!cancelled) setFeedback(feedbackRows);
      } catch (err) {
        console.error("Failed to load meetings:", err);
        if (!cancelled) setMeetings([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadMeetings();
    return () => {
      cancelled = true;
    };
  }, [mentorId]);

  const filteredMeetings = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return meetings.filter((m) => {
      const status = getMeetingStatus(m.date);
      const statusLabel = status?.label?.toLowerCase() || "";
      if (m.status === "cancelled") {
        if (statusTab === "completed") return true;
        return statusTab === "all";
      }
      if (statusTab === "upcoming" && statusLabel !== "upcoming") return false;
      if (statusTab === "today" && statusLabel !== "today") return false;
      if (statusTab === "completed" && statusLabel !== "completed") return false;
      if (!q) return true;
      const startup = (m.start_up_name || "").toLowerCase();
      const founder = (m.founder_name || "").toLowerCase();
      return startup.includes(q) || founder.includes(q);
    });
  }, [meetings, searchTerm, statusTab]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMeetings.length / ROWS_PER_PAGE),
  );

  const paginatedMeetings = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredMeetings.slice(start, start + ROWS_PER_PAGE);
  }, [filteredMeetings, currentPage]);

  const showingFrom =
    filteredMeetings.length === 0 ? 0 : (currentPage - 1) * ROWS_PER_PAGE + 1;
  const showingTo = Math.min(
    currentPage * ROWS_PER_PAGE,
    filteredMeetings.length,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusTab]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const stats = useMemo(() => {
    let upcoming = 0;
    let today = 0;
    let completed = 0;
    meetings.forEach((m) => {
      const s = getMeetingStatus(m.date);
      if (m.status === "cancelled") completed++;
      else if (s?.label === "Upcoming") upcoming++;
      else if (s?.label === "Today") today++;
      else if (s?.label === "Completed") completed++;
    });
    return { total: meetings.length, upcoming, today, completed };
  }, [meetings]);

  const openMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMeeting(null);
  };

  const handleAddFeedbackClose = async () => {
    setShowAddFeedbackForm(false);
    setSelectedSession(null);
    setInitialFeedback(null);

    // Refresh feedback labels after saving/updating.
    if (meetings.length) {
      const updatedFeedback = await fetchFeedbackForMeetings(meetings);
      setFeedback(updatedFeedback);
    }
  };

  const openFeedbackModal = (meeting) => {
    const currentFeedback = feedback.find(
      (f) => String(f.meet_id) === String(meeting?.meet_id),
    );
    setInitialFeedback(currentFeedback || null);
    setSelectedSession(meeting);
    setShowAddFeedbackForm(true);
  };

  const handleCancelMeeting = async (meeting, reason) => {
    try {
      setCancellingMeetingId(meeting.meet_id);
      await ApiCancelMeeting(meeting.meet_id, reason);
      setMeetings((prev) =>
        prev.map((m) =>
          String(m.meet_id) === String(meeting.meet_id)
            ? {
                ...m,
                status: "cancelled",
                cancellation_reason: reason,
                cancelled_at: new Date().toISOString(),
              }
            : m
        )
      );
      setShowModal(false);
      setSelectedMeeting(null);
      toast.success("Meeting cancelled.");
    } catch (err) {
      toast.error(err?.message || "Failed to cancel meeting.");
    } finally {
      setCancellingMeetingId(null);
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="ms-[220px] min-h-screen flex-grow bg-gradient-to-br from-slate-50 via-gray-50 to-emerald-50/30">
        <NavBar />
        <main className="min-h-[calc(100vh-64px)] w-full p-3 sm:p-4">
          <div className="flex min-h-full w-full flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-6">
          <div className="mb-8">
            <p className="text-sm font-medium text-[#45C74D]">Mentorship</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
              My Meetings
            </h1>
            <p className="mt-2 max-w-xl text-sm text-gray-500">
              All your sessions are loaded once, then filtered and paginated on
              this page ({ROWS_PER_PAGE} per page).
            </p>

            {!loading && meetings.length > 0 && (
              <div
                className="mt-5 flex flex-wrap gap-3"
                role="tablist"
                aria-label="Filter meetings by status"
              >
                {FILTER_TABS.map((tab) => (
                  <FilterTab
                    key={tab.id}
                    id={tab.id}
                    label={tab.label}
                    value={
                      tab.id === "all"
                        ? stats.total
                        : tab.id === "upcoming"
                          ? stats.upcoming
                          : tab.id === "today"
                            ? stats.today
                            : stats.completed
                    }
                    isActive={statusTab === tab.id}
                    onClick={() => setStatusTab(tab.id)}
                    className={
                      statusTab === tab.id ? tab.active : tab.inactive
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-24 shadow-sm">
              <FaSpinner className="animate-spin text-4xl text-[#45C74D]" />
              <p className="mt-4 text-sm font-medium text-gray-500">
                Loading your meetings…
              </p>
            </div>
          ) : meetings.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 bg-white px-8 py-20 text-center shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50">
                <CalendarX2 className="h-8 w-8 text-gray-300" />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-gray-800">
                No meetings yet
              </h2>
              <p className="mt-2 max-w-sm text-sm text-gray-500">
                When startups schedule sessions with you, they will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="relative mb-4 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search by startup or founder…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none transition focus:border-[#45C74D] focus:ring-2 focus:ring-[#45C74D]/20"
                />
              </div>

              {filteredMeetings.length === 0 ? (
                <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center text-sm text-gray-500 shadow-sm">
                  No meetings match your search or filter.
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-slate-200/50">
                  <div className="flex items-center justify-between border-b border-gray-100 bg-slate-50/80 px-6 py-3 text-sm text-gray-600">
                    <span>
                      Showing{" "}
                      <strong className="text-gray-900">
                        {showingFrom}–{showingTo}
                      </strong>{" "}
                      of{" "}
                      <strong className="text-gray-900">
                        {filteredMeetings.length}
                      </strong>{" "}
                      meetings
                      {statusTab !== "all" &&
                        ` · ${FILTER_TABS.find((t) => t.id === statusTab)?.label}`}
                    </span>
                  </div>

                  <div className="hidden grid-cols-12 gap-4 border-b border-gray-100 bg-slate-50/50 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:grid">
                    <div className="col-span-3">Startup</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Time</div>
                    <div className="col-span-2">Duration</div>
                    <div className="col-span-3">Mode / Notes</div>
                  </div>

                  <ul className="divide-y divide-gray-50">
                    {paginatedMeetings.map((meeting) => {
                      const status = getMeetingStatus(meeting.date);
                      const hasFeedback = feedback.some(
                        (f) => String(f.meet_id) === String(meeting?.meet_id),
                      );
                      return (
                        <li key={meeting.meet_id}>
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={() => openMeeting(meeting)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") openMeeting(meeting);
                            }}
                            className="group grid w-full grid-cols-1 gap-3 px-5 py-4 text-left transition hover:bg-emerald-50/40 sm:grid-cols-12 sm:items-center sm:gap-4 sm:px-6"
                          >
                            <div className="col-span-3 flex min-w-0 items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#45C74D]/15 to-[#45C74D]/5 ring-1 ring-[#45C74D]/20">
                                <Video className="h-4 w-4 text-[#45C74D]" />
                              </div>
                              <div className="min-w-0">
                                <p className="truncate font-semibold text-gray-900 group-hover:text-[#2d9e35]">
                                  {meeting.start_up_name || "Session"}
                                </p>
                                {status && (
                                  <span
                                    className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${status.badge}`}
                                  >
                                    <span
                                      className={`h-1 w-1 rounded-full ${status.dot}`}
                                    />
                                    {status.label}
                                  </span>
                                )}
                                {meeting.status === "cancelled" && (
                                  <span className="mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset bg-red-50 text-red-700 ring-red-600/20">
                                    <span className="h-1 w-1 rounded-full bg-red-500" />
                                    Cancelled
                                  </span>
                                )}
                              </div>
                              <ChevronRight className="ml-auto h-5 w-5 shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-[#45C74D] sm:hidden" />
                            </div>

                            <div className="col-span-2 flex items-center gap-2 text-sm text-gray-600 sm:block">
                              <Calendar className="h-3.5 w-3.5 text-gray-400 sm:hidden" />
                              {formatListDate(meeting.date)}
                            </div>
                            <div className="col-span-2 flex items-center gap-2 text-sm text-gray-600 sm:block">
                              <Clock className="h-3.5 w-3.5 text-gray-400 sm:hidden" />
                              {formatTime(meeting.time)}
                            </div>
                            <div className="col-span-2 text-sm text-gray-600">
                              {meeting.meeting_duration || "—"}
                            </div>
                            <div className="col-span-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                                {meeting.meeting_mode || "—"}
                              </span>
                              <div className="flex items-center gap-2">
                                {meeting.status !== "cancelled" && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openFeedbackModal(meeting);
                                    }}
                                    className="bg-[#45C74D] text-white px-4 py-2 rounded-md text-sm"
                                  >
                                    {hasFeedback ? "View Notes" : "Add Notes"}
                                  </button>
                                )}
                                <ChevronRight className="hidden h-5 w-5 shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-[#45C74D] sm:block" />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {totalPages > 1 && (
                    <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4 sm:flex-row">
                      <span className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className="rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 bg-[#45C74D] text-white hover:bg-[#3aab42] disabled:hover:bg-gray-200"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 bg-[#45C74D] text-white hover:bg-[#3aab42] disabled:hover:bg-gray-200"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          </div>
        </main>
      </div>

      <MeetingDetailsModal
        meeting={selectedMeeting}
        isVisible={showModal}
        onClose={closeModal}
        showCancelAction
        cancelling={cancellingMeetingId === selectedMeeting?.meet_id}
        onCancelMeeting={handleCancelMeeting}
      />

      {showAddFeedbackForm && selectedSession && (
        <FeedbackForm
          key={selectedSession.meet_id}
          isOpen={showAddFeedbackForm}
          mentor_id={mentorId}
          meet_id={selectedSession.meet_id}
          startup_id={getStartupId(selectedSession)}
          onClose={handleAddFeedbackClose}
          initialFeedback={initialFeedback}
        />
      )}
    </div>
  );
}

function FilterTab({ id, label, value, isActive, onClick, className }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      id={`meeting-tab-${id}`}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm ring-1 transition ${className}`}
    >
      <span className={isActive ? "text-white/90" : "opacity-80"}>{label}</span>
      <span className="font-bold">{value}</span>
    </button>
  );
}

export default MentorMyMeetings;

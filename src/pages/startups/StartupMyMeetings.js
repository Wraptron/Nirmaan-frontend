import React, { useEffect, useMemo, useState } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import MeetingDetailsModal, {
  getMeetingStatus,
} from "../../components/MeetingDetailsModal";
import { ApiFetchStartupMyMeetings } from "../../API/API";
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

const ROWS_PER_PAGE = 10;

const REQUEST_STATUS_STYLES = {
  pending: {
    label: "Pending",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-800 ring-amber-600/20",
  },
  accepted: {
    label: "Confirmed",
    dot: "bg-sky-500",
    badge: "bg-sky-50 text-sky-700 ring-sky-600/20",
  },
  rejected: {
    label: "Declined",
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-700 ring-red-600/20",
  },
  cancelled: {
    label: "Cancelled",
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-700 ring-red-600/20",
  },
};

const FILTER_TABS = [
  {
    id: "all",
    label: "Total",
    inactive: "bg-white text-gray-800 ring-gray-200 hover:bg-gray-50",
    active: "bg-[#45C74D] text-white ring-[#45C74D] shadow-md shadow-[#45C74D]/25",
  },
  {
    id: "pending",
    label: "Pending",
    inactive: "bg-amber-50 text-amber-800 ring-amber-200 hover:bg-amber-100",
    active: "bg-[#45C74D] text-white ring-[#45C74D] shadow-md shadow-[#45C74D]/25",
  },
  {
    id: "upcoming",
    label: "Upcoming",
    inactive: "bg-emerald-50 text-emerald-800 ring-emerald-200 hover:bg-emerald-100",
    active: "bg-[#45C74D] text-white ring-[#45C74D] shadow-md shadow-[#45C74D]/25",
  },
  {
    id: "completed",
    label: "Completed",
    inactive: "bg-slate-100 text-slate-700 ring-slate-200 hover:bg-slate-200",
    active: "bg-[#45C74D] text-white ring-[#45C74D] shadow-md shadow-[#45C74D]/25",
  },
];

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

function getRequestStatusStyle(status) {
  const key = String(status || "pending").toLowerCase();
  return REQUEST_STATUS_STYLES[key] || REQUEST_STATUS_STYLES.pending;
}

function buildMeetingItems(meetings) {
  return (meetings || []).map((m) => ({
    kind: "meeting",
    id: `meeting-${m.meet_id}`,
    meet_id: m.meet_id,
    mentor_name: m.mentor_name || "Mentor",
    date: m.date,
    time: m.time,
    duration: m.meeting_duration,
    mode: m.meeting_mode,
    status: m.status,
    meeting: m,
    sortAt: dayjs(m.date, ["D MMM YYYY", "YYYY-MM-DD"], true).valueOf() || 0,
  }));
}

function buildRequestItems(sessionRequests) {
  return (sessionRequests || []).map((r) => ({
    kind: "request",
    id: `request-${r.id}`,
    requestId: r.id,
    mentor_name: r.mentor_name || "Mentor",
    date: r.requested_date,
    time: r.requested_time,
    duration: r.duration ? `${r.duration} min` : "—",
    mode: r.session_mode,
    status: r.status,
    agenda: r.agenda,
    sortAt:
      dayjs(r.requested_date, ["YYYY-MM-DD"], true).valueOf() ||
      dayjs(r.created_at).valueOf() ||
      0,
  }));
}

function StartupMyMeetings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusTab, setStatusTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const data = await ApiFetchStartupMyMeetings();
        if (cancelled) return;

        const sessionRequests = Array.isArray(data?.sessionRequests)
          ? data.sessionRequests
          : [];
        const meetings = Array.isArray(data?.meetings) ? data.meetings : [];

        const combined = [
          ...buildMeetingItems(meetings),
          ...buildRequestItems(sessionRequests),
        ].sort((a, b) => b.sortAt - a.sortAt);
        setItems(combined);
      } catch (err) {
        console.error("Failed to load startup meetings:", err);
        if (!cancelled) {
          setItems([]);
          toast.error(
            err?.response?.data?.message ||
              "Could not load meetings. Refresh the page or log in again.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredItems = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return items.filter((item) => {
      if (item.kind === "request") {
        const reqStyle = getRequestStatusStyle(item.status);
        if (statusTab === "pending" && item.status !== "pending") return false;
        if (statusTab === "upcoming") return false;
        if (statusTab === "completed") {
          if (!["rejected", "cancelled"].includes(item.status)) return false;
        }
      } else {
        if (item.status === "cancelled") {
          if (statusTab === "upcoming" || statusTab === "pending") return false;
          if (statusTab === "completed" || statusTab === "all") {
            return true;
          }
        }
        const schedule = getMeetingStatus(item.date);
        const scheduleLabel = schedule?.label?.toLowerCase() || "";
        if (statusTab === "pending") return false;
        if (
          statusTab === "upcoming" &&
          scheduleLabel !== "upcoming" &&
          scheduleLabel !== "today"
        ) {
          return false;
        }
        if (statusTab === "completed" && scheduleLabel !== "completed") {
          return false;
        }
      }

      if (!q) return true;
      return (item.mentor_name || "").toLowerCase().includes(q);
    });
  }, [items, searchTerm, statusTab]);

  const stats = useMemo(() => {
    let pending = 0;
    let upcoming = 0;
    let completed = 0;
    items.forEach((item) => {
      if (item.kind === "request") {
        if (item.status === "pending") pending++;
        if (item.status === "rejected" || item.status === "cancelled") completed++;
        if (item.status === "accepted") upcoming++;
      } else {
        if (item.status === "cancelled") {
          completed++;
          return;
        }
        const s = getMeetingStatus(item.date);
        if (s?.label === "Upcoming" || s?.label === "Today") upcoming++;
        else if (s?.label === "Completed") completed++;
      }
    });
    return { total: items.length, pending, upcoming, completed };
  }, [items]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ROWS_PER_PAGE),
  );

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredItems.slice(start, start + ROWS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const showingFrom =
    filteredItems.length === 0 ? 0 : (currentPage - 1) * ROWS_PER_PAGE + 1;
  const showingTo = Math.min(
    currentPage * ROWS_PER_PAGE,
    filteredItems.length,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusTab]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const openMeeting = (item) => {
    if (item.kind !== "meeting") return;
    setSelectedMeeting(item.meeting);
    setShowModal(true);
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
                Session requests and scheduled mentor meetings in one place.
              </p>

              {!loading && items.length > 0 && (
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
                          : tab.id === "pending"
                            ? stats.pending
                            : tab.id === "upcoming"
                              ? stats.upcoming
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
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 bg-white px-8 py-20 text-center shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50">
                  <CalendarX2 className="h-8 w-8 text-gray-300" />
                </div>
                <h2 className="mt-5 text-lg font-semibold text-gray-800">
                  No meetings yet
                </h2>
                <p className="mt-2 max-w-sm text-sm text-gray-500">
                  Request a session from a mentor under Mentors — it will show up
                  here with its status.
                </p>
              </div>
            ) : (
              <>
                <div className="relative mb-4 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search by mentor name…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none transition focus:border-[#45C74D] focus:ring-2 focus:ring-[#45C74D]/20"
                  />
                </div>

                {filteredItems.length === 0 ? (
                  <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center text-sm text-gray-500 shadow-sm">
                    No items match your search or filter.
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
                          {filteredItems.length}
                        </strong>
                      </span>
                    </div>

                    <ul className="divide-y divide-gray-50">
                      {paginatedItems.map((item) => {
                        const isRequest = item.kind === "request";
                        const requestStatus = isRequest
                          ? getRequestStatusStyle(item.status)
                          : null;
                        const scheduleStatus = !isRequest
                          ? item.status === "cancelled"
                            ? REQUEST_STATUS_STYLES.cancelled
                            : getMeetingStatus(item.date)
                          : null;

                        return (
                          <li key={item.id}>
                            <div
                              role={isRequest ? undefined : "button"}
                              tabIndex={isRequest ? undefined : 0}
                              onClick={() => openMeeting(item)}
                              onKeyDown={(e) => {
                                if (
                                  !isRequest &&
                                  (e.key === "Enter" || e.key === " ")
                                ) {
                                  openMeeting(item);
                                }
                              }}
                              className={`group grid w-full grid-cols-1 gap-3 px-5 py-4 text-left transition sm:grid-cols-12 sm:items-center sm:gap-4 sm:px-6 ${
                                isRequest
                                  ? ""
                                  : "cursor-pointer hover:bg-emerald-50/40"
                              }`}
                            >
                              <div className="col-span-4 flex min-w-0 items-center gap-3 sm:col-span-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#45C74D]/15 to-[#45C74D]/5 ring-1 ring-[#45C74D]/20">
                                  <Video className="h-4 w-4 text-[#45C74D]" />
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate font-semibold text-gray-900 group-hover:text-[#2d9e35]">
                                    {item.mentor_name}
                                  </p>
                                  <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wide text-gray-400">
                                    {isRequest ? "Session request" : "Scheduled"}
                                  </span>
                                  {requestStatus && (
                                    <span
                                      className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${requestStatus.badge}`}
                                    >
                                      <span
                                        className={`h-1 w-1 rounded-full ${requestStatus.dot}`}
                                      />
                                      {requestStatus.label}
                                    </span>
                                  )}
                                  {scheduleStatus && (
                                    <span
                                      className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${scheduleStatus.badge}`}
                                    >
                                      <span
                                        className={`h-1 w-1 rounded-full ${scheduleStatus.dot}`}
                                      />
                                      {scheduleStatus.label}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="col-span-2 flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="h-3.5 w-3.5 text-gray-400 sm:hidden" />
                                {formatListDate(item.date)}
                              </div>
                              <div className="col-span-2 flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="h-3.5 w-3.5 text-gray-400 sm:hidden" />
                                {formatTime(item.time)}
                              </div>
                              <div className="col-span-2 text-sm text-gray-600">
                                {item.duration || "—"}
                              </div>
                              <div className="col-span-3 flex items-center justify-between gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                                  {item.mode || "—"}
                                </span>
                                {!isRequest && (
                                  <ChevronRight className="h-5 w-5 shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-[#45C74D]" />
                                )}
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
                            className="rounded-lg bg-[#45C74D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3aab42] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                          >
                            Previous
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setCurrentPage((p) =>
                                Math.min(totalPages, p + 1),
                              )
                            }
                            disabled={currentPage === totalPages}
                            className="rounded-lg bg-[#45C74D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3aab42] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
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
        onClose={() => {
          setShowModal(false);
          setSelectedMeeting(null);
        }}
      />
    </div>
  );
}

function FilterTab({ label, value, isActive, onClick, className }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm ring-1 transition ${className}`}
    >
      <span className={isActive ? "text-white/90" : "opacity-80"}>{label}</span>
      <span className="font-bold">{value}</span>
    </button>
  );
}

export default StartupMyMeetings;

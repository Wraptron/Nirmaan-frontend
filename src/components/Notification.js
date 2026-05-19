import React, { useEffect } from "react";

const formatTime = (value) => {
  if (!value) return "—";
  const str = String(value);
  if (/^\d{1,2}:\d{2}/.test(str)) {
    const [h, m] = str.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  return str;
};

const formatRelativeTime = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  const diffMs = Date.now() - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

const ModeBadge = ({ mode }) => {
  const isOnline = String(mode).toLowerCase() === "online";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
        isOnline
          ? "bg-sky-50 text-sky-700 ring-1 ring-sky-100"
          : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
      }`}
    >
      {mode}
    </span>
  );
};

const MetaChip = ({ icon, children }) => (
  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
    {icon}
    {children}
  </span>
);

const CalendarIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

function NotificationSkeleton() {
  return (
    <div className="px-4 py-3 space-y-3 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 bg-gray-100 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
            <div className="h-3 bg-gray-100 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function NotificationItem({ req, formatRequestDate }) {
  const relative = formatRelativeTime(req.created_at);
  const initials = (req.startup_name || "S")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="px-4 py-3.5 hover:bg-gray-50/80 transition-colors">
      <div className="flex gap-3">
        <div
          className="w-10 h-10 rounded-full bg-[#45C74D]/10 text-[#2d8a33] flex items-center justify-center text-xs font-semibold shrink-0 ring-1 ring-[#45C74D]/20"
          aria-hidden
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-gray-900 leading-snug">
              <span className="text-[#2d8a33]">{req.startup_name}</span>
              <span className="font-normal text-gray-600"> requested a session</span>
            </p>
            {relative ? (
              <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">
                {relative}
              </span>
            ) : null}
          </div>
          {req.mentor_name ? (
            <p className="mt-0.5 text-xs text-gray-600 flex items-center gap-1">
              <UserIcon />
              <span className="font-medium text-gray-700">{req.mentor_name}</span>
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <MetaChip icon={<CalendarIcon />}>
              {formatRequestDate(req.requested_date)}
            </MetaChip>
            <MetaChip icon={<ClockIcon />}>
              {formatTime(req.requested_time)}
              <span className="text-gray-300 mx-0.5">·</span>
              {req.duration} min
            </MetaChip>
            <ModeBadge mode={req.session_mode} />
          </div>
          {req.agenda ? (
            <p className="mt-2 text-xs text-gray-500 line-clamp-2 leading-relaxed bg-gray-50 rounded-md px-2.5 py-1.5 border border-gray-100">
              {req.agenda}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function Notification({
  isOpen,
  onClose,
  loading,
  requests = [],
  formatRequestDate,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const count = requests.length;

  return (
    <div
      role="dialog"
      aria-label="Notifications"
      className="absolute right-0 top-full mt-2 z-[100] w-[min(100vw-2rem,400px)] origin-top-right"
    >
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-gray-900">Notifications</h2>
            {count > 0 ? (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-semibold text-white bg-[#45C74D] rounded-full">
                {count}
              </span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close notifications"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="max-h-[min(70vh,420px)] overflow-y-auto overscroll-contain">
          {loading ? (
            <NotificationSkeleton />
          ) : count === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">All caught up</p>
              <p className="text-xs text-gray-500 mt-1">No pending mentor session requests</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {requests.map((req) => (
                <NotificationItem
                  key={req.id}
                  req={req}
                  formatRequestDate={formatRequestDate}
                />
              ))}
            </div>
          )}
        </div>

        {count > 0 ? (
          <footer className="px-4 py-2 border-t border-gray-100 bg-gray-50/30">
            <p className="text-[11px] text-center text-gray-400">
              Mentor session requests from startups
            </p>
          </footer>
        ) : null}
      </div>
    </div>
  );
}

export default Notification;

import React, { useEffect, useState } from "react";

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

const typeLabel = (type) => {
  const map = {
    mentorship: "Mentorship",
  };
  return map[type] || type;
};

const resolveMentorshipStatus = (event, sessionRequestStatus) => {
  const eventStatus =
    event === "pending"
      ? "pending"
      : event === "accepted"
        ? "accepted"
        : event === "rejected"
          ? "rejected"
          : event;

  if (
    eventStatus === "pending" &&
    sessionRequestStatus &&
    sessionRequestStatus !== "pending"
  ) {
    return sessionRequestStatus;
  }

  return eventStatus;
};

export const consolidateMentorshipNotifications = (items) => {
  const resolvedBySourceId = new Map();

  items.forEach((item) => {
    if (item._notificationType !== "mentorship" && !item.startup_name) return;
    const sourceId = String(item.id);
    if (["accepted", "rejected", "cancelled"].includes(item.status)) {
      resolvedBySourceId.set(sourceId, item.status);
    }
  });

  return items.filter((item) => {
    if (item._notificationType !== "mentorship" && !item.startup_name) {
      return true;
    }
    const sourceId = String(item.id);
    const resolvedStatus = resolvedBySourceId.get(sourceId);
    return !(item.status === "pending" && resolvedStatus);
  });
};

export const mapNotificationToDisplayItem = (n) => {
  const isUnread = !n.read_at;
  if (n.type === "mentorship" && n.metadata && typeof n.metadata === "object") {
    const status = resolveMentorshipStatus(
      n.event,
      n.session_request_status || n.metadata?.status
    );
    return {
      ...n.metadata,
      id: n.source_id,
      notificationId: n.id,
      status,
      created_at: n.created_at,
      isUnread,
      _notificationType: n.type,
    };
  }
  return {
    id: n.source_id || n.id,
    notificationId: n.id,
    type: n.type,
    event: n.event,
    title: n.title,
    body: n.body,
    created_at: n.created_at,
    status: n.event,
    isUnread,
    _notificationType: n.type,
  };
};

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

function GenericInboxItem({ item }) {
  const relative = formatRelativeTime(item.created_at);
  return (
    <article
      className={`px-3 py-2 hover:bg-gray-50/80 transition-colors ${
        item.isUnread ? "bg-sky-50/40" : ""
      }`}
    >
      <div className="flex gap-2.5 items-start">
        <div className="relative w-7 h-7 rounded-full bg-violet-50 text-violet-700 flex items-center justify-center text-[9px] font-semibold shrink-0 ring-1 ring-violet-100">
          {typeLabel(item.type).slice(0, 2).toUpperCase()}
          {item.isUnread ? (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#45C74D] rounded-full ring-2 ring-white" />
          ) : null}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs font-medium text-gray-900 leading-snug line-clamp-2">
              {item.title}
            </p>
            {relative ? (
              <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">
                {relative}
              </span>
            ) : null}
          </div>
          {item.body ? (
            <p className="mt-0.5 text-[11px] text-gray-500 line-clamp-2">{item.body}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="sticky top-0 z-10 px-3 py-1.5 bg-gray-50/95 border-b border-gray-100 backdrop-blur-sm">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
        {children}
      </p>
    </div>
  );
}

function SessionStatusNotificationItem({ req, formatRequestDate, viewerRole }) {
  const relative = formatRelativeTime(req.created_at);
  const isAccepted = req.status === "accepted";
  const isCancelled = req.status === "cancelled";
  const isMentor = viewerRole === "mentor";
  const title = isCancelled
    ? isMentor
      ? "Session cancelled"
      : "Session cancelled by mentor"
    : isAccepted
      ? isMentor
        ? "Meeting scheduled"
        : "Session confirmed"
      : "Session declined";
  const party = isMentor
    ? req.startup_name || "startup"
    : req.mentor_name || "mentor";
  const when =
    (isAccepted || isCancelled) && (req.requested_date || req.requested_time)
      ? [
          req.requested_date ? formatRequestDate(req.requested_date) : null,
          req.requested_time ? formatTime(req.requested_time) : null,
        ]
          .filter(Boolean)
          .join(" · ")
      : null;

  return (
    <article
      className={`px-3 py-2 hover:bg-gray-50/80 transition-colors ${
        req.isUnread ? "bg-sky-50/40" : ""
      }`}
    >
      <div className="flex gap-2.5 items-start">
        <div
          className={`relative w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 ring-1 ${
            isCancelled
              ? "bg-red-50 text-red-700 ring-red-100"
              : isAccepted
              ? "bg-sky-50 text-sky-700 ring-sky-100"
              : "bg-red-50 text-red-700 ring-red-100"
          }`}
          aria-hidden
        >
          {isAccepted ? "✓" : "×"}
          {req.isUnread ? (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#45C74D] rounded-full ring-2 ring-white" />
          ) : null}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs font-medium text-gray-900 leading-snug">
              {title}
              <span className="font-normal text-gray-500"> · {party}</span>
            </p>
            {relative ? (
              <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0">
                {relative}
              </span>
            ) : null}
          </div>
          {when ? (
            <p className="mt-0.5 text-[11px] text-gray-500">{when}</p>
          ) : null}
          {isCancelled && req.cancellation_reason ? (
            <p className="mt-0.5 text-[11px] text-red-600 line-clamp-2">
              Reason: {req.cancellation_reason}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function NotificationItem({
  req,
  formatRequestDate,
  onAccept,
  onReject,
  processingId,
  expanded,
  onToggleExpand,
}) {
  const relative = formatRelativeTime(req.created_at);
  const initials = (req.startup_name || "S")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const hasDetails = Boolean(req.agenda?.trim());
  const metaLine = [
    req.mentor_name,
    formatRequestDate(req.requested_date),
    formatTime(req.requested_time),
    req.duration ? `${req.duration} min` : null,
    req.session_mode,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article
      className={`px-3 py-2.5 hover:bg-gray-50/80 transition-colors ${
        req.isUnread ? "bg-sky-50/40" : ""
      }`}
    >
      <div className="flex gap-2.5">
        <div
          className="relative w-8 h-8 rounded-full bg-[#45C74D]/10 text-[#2d8a33] flex items-center justify-center text-[10px] font-semibold shrink-0 ring-1 ring-[#45C74D]/20"
          aria-hidden
        >
          {initials}
          {req.isUnread ? (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#45C74D] rounded-full ring-2 ring-white" />
          ) : null}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2">
              <span className="text-[#2d8a33]">{req.startup_name}</span>
              <span className="font-normal text-gray-600"> · session request</span>
            </p>
            {relative ? (
              <span className="text-[10px] text-gray-400 whitespace-nowrap shrink-0 pt-0.5">
                {relative}
              </span>
            ) : null}
          </div>
          {metaLine ? (
            <p className="mt-0.5 text-[11px] text-gray-500 line-clamp-2">{metaLine}</p>
          ) : null}
          {expanded && hasDetails ? (
            <p className="mt-1.5 text-[11px] text-gray-600 leading-relaxed bg-gray-50 rounded px-2 py-1 border border-gray-100">
              {req.agenda}
            </p>
          ) : null}
          <div className="mt-2 flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              disabled={processingId === req.id}
              onClick={() => onAccept?.(req)}
              className="px-2.5 py-1 text-[11px] font-semibold text-white bg-[#45C74D] rounded-md hover:bg-[#3bae42] disabled:opacity-60"
            >
              Accept
            </button>
            <button
              type="button"
              disabled={processingId === req.id}
              onClick={() => onReject?.(req)}
              className="px-2.5 py-1 text-[11px] font-semibold text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 disabled:opacity-60"
            >
              {processingId === req.id ? "…" : "Reject"}
            </button>
            {hasDetails ? (
              <button
                type="button"
                onClick={onToggleExpand}
                className="px-1.5 py-1 text-[11px] font-medium text-gray-500 hover:text-gray-700"
              >
                {expanded ? "Hide" : "Details"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function renderNotificationItem(item, props) {
  const {
    formatRequestDate,
    onAccept,
    onReject,
    processingId,
    viewerRole,
    expandedId,
    onToggleExpand,
  } = props;
  const itemKey = String(item.notificationId || item.id);

  if (item._notificationType === "mentorship" || item.startup_name) {
    if (item.status === "pending") {
      return (
        <NotificationItem
          key={itemKey}
          req={item}
          formatRequestDate={formatRequestDate}
          onAccept={onAccept}
          onReject={onReject}
          processingId={processingId}
          expanded={expandedId === itemKey}
          onToggleExpand={() => onToggleExpand(itemKey)}
        />
      );
    }
    if (
      item.status === "accepted" ||
      item.status === "rejected" ||
      item.status === "cancelled"
    ) {
      return (
        <SessionStatusNotificationItem
          key={itemKey}
          req={item}
          formatRequestDate={formatRequestDate}
          viewerRole={viewerRole}
        />
      );
    }
  }

  return <GenericInboxItem key={itemKey} item={item} />;
}

const partitionItems = (items, showActionSection) => {
  const pending = [];
  const recent = [];
  items.forEach((item) => {
    if (
      showActionSection &&
      item.status === "pending" &&
      (item._notificationType === "mentorship" || item.startup_name)
    ) {
      pending.push(item);
    } else {
      recent.push(item);
    }
  });
  return { pending, recent };
};

function Notification({
  isOpen,
  onClose,
  loading,
  items = [],
  unreadCount = 0,
  formatRequestDate,
  onAccept,
  onReject,
  processingId,
  viewerRole = "admin",
  emptyTitle = "All caught up",
  emptySubtitle = "No new notifications",
  hasMore = false,
  loadingMore = false,
  onLoadMore,
  onMarkAllRead,
  markingAllRead = false,
  retentionDays = 90,
}) {
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!isOpen) setExpandedId(null);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const count = items.length;
  const unread = Number(unreadCount) || 0;
  const showActionSection = Boolean(onAccept);
  const { pending, recent } = partitionItems(items, showActionSection);

  const itemProps = {
    formatRequestDate,
    onAccept,
    onReject,
    processingId,
    viewerRole,
    expandedId,
    onToggleExpand: (id) =>
      setExpandedId((current) => (current === id ? null : id)),
  };

  return (
    <div
      role="dialog"
      aria-label="Notifications"
      className="absolute right-0 top-full mt-2 z-[100] w-[min(100vw-2rem,380px)] origin-top-right"
    >
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden flex flex-col max-h-[min(85vh,560px)]">
        <header className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-sm font-semibold text-gray-900">Notifications</h2>
            {unread > 0 ? (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-semibold text-white bg-[#45C74D] rounded-full">
                {unread}
              </span>
            ) : null}
            {count > 0 ? (
              <span className="text-[10px] text-gray-400">{count} shown</span>
            ) : null}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {unread > 0 && onMarkAllRead ? (
              <button
                type="button"
                onClick={onMarkAllRead}
                disabled={markingAllRead}
                className="px-2 py-1 text-[11px] font-medium text-[#2d8a33] hover:bg-[#45C74D]/10 rounded-md disabled:opacity-60"
              >
                {markingAllRead ? "…" : "Mark all read"}
              </button>
            ) : null}
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
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          {loading ? (
            <NotificationSkeleton />
          ) : count === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">{emptyTitle}</p>
              <p className="text-xs text-gray-500 mt-1">{emptySubtitle}</p>
            </div>
          ) : (
            <div>
              {pending.length > 0 ? (
                <section>
                  <SectionLabel>
                    Needs action ({pending.length})
                  </SectionLabel>
                  <div className="divide-y divide-gray-100">
                    {pending.map((item) => renderNotificationItem(item, itemProps))}
                  </div>
                </section>
              ) : null}
              {recent.length > 0 ? (
                <section>
                  {pending.length > 0 ? (
                    <SectionLabel>Recent ({recent.length})</SectionLabel>
                  ) : null}
                  <div className="divide-y divide-gray-100">
                    {recent.map((item) => renderNotificationItem(item, itemProps))}
                  </div>
                </section>
              ) : null}
            </div>
          )}
        </div>

        {count > 0 || hasMore ? (
          <footer className="px-3 py-2 border-t border-gray-100 bg-gray-50/30 space-y-1.5 shrink-0">
            {hasMore && onLoadMore ? (
              <button
                type="button"
                onClick={onLoadMore}
                disabled={loadingMore}
                className="w-full py-1.5 text-[11px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-60"
              >
                {loadingMore ? "Loading…" : "Load older notifications"}
              </button>
            ) : null}
            <p className="text-[10px] text-center text-gray-400 leading-snug">
              Scroll for more · Last {retentionDays} days
            </p>
          </footer>
        ) : null}
      </div>
    </div>
  );
}

export default Notification;

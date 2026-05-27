import React, { useState } from "react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import {
  X,
  Building2,
  User,
  Calendar,
  Clock,
  Timer,
  Video,
  Users,
  MapPin,
  FileText,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

/** Ensure external meeting URLs open correctly (not as same-site paths). */
export function normalizeMeetingUrl(link) {
  if (!link || typeof link !== "string") return "";
  const trimmed = link.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function getMeetingStatus(dateStr) {
  const parsed = dayjs(dateStr, ["D MMM YYYY", "YYYY-MM-DD"], true);
  const d = parsed.isValid() ? parsed : dayjs(dateStr);
  if (!d.isValid()) return null;
  if (d.isAfter(dayjs(), "day"))
    return {
      label: "Upcoming",
      dot: "bg-emerald-500",
      badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    };
  if (d.isSame(dayjs(), "day"))
    return {
      label: "Today",
      dot: "bg-blue-500",
      badge: "bg-blue-50 text-blue-700 ring-blue-600/20",
    };
  return {
    label: "Completed",
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-600 ring-slate-500/20",
  };
}

function formatMeetingDate(dateStr) {
  if (!dateStr) return "—";
  const parsed = dayjs(dateStr, ["D MMM YYYY", "YYYY-MM-DD"], true);
  const d = parsed.isValid() ? parsed : dayjs(dateStr);
  return d.isValid() ? d.format("ddd, DD MMM YYYY") : dateStr;
}

function formatTime(timeStr) {
  if (!timeStr) return "—";
  const t = dayjs(timeStr, ["HH:mm:ss", "H:mm:ss", "HH:mm", "h:mm A"], true);
  return t.isValid() ? t.format("h:mm A") : timeStr;
}

function DetailCard({ icon: Icon, label, value, className = "" }) {
  return (
    <div
      className={`flex gap-3 rounded-xl border border-gray-100 bg-gray-50/80 p-3.5 ${className}`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-gray-100">
        <Icon className="h-4 w-4 text-[#3aab42]" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-semibold text-gray-900">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function MeetingDetailsModal({ meeting, isVisible, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isVisible || !meeting) return null;

  const status = getMeetingStatus(meeting.date);
  const mode = (meeting.meeting_mode || "").toLowerCase();
  const isVirtual = mode.includes("virtual") || mode.includes("online");
  const meetingUrl = normalizeMeetingUrl(meeting.meeting_link);

  const handleBackdrop = (e) => {
    if (e.target.id === "meeting-modal-backdrop") onClose();
  };

  return (
    <div
      id="meeting-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="meeting-modal-title"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-900/15 ring-1 ring-black/5 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#45C74D] to-[#2d9e35] px-6 py-5 text-white">
          <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 right-12 h-20 w-20 rounded-full bg-white/5" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-white/80">
                Session overview
              </p>
              <h2
                id="meeting-modal-title"
                className="mt-1 text-xl font-bold tracking-tight"
              >
                {meeting.start_up_name || "Meeting"}
              </h2>
              {status && (
                <span
                  className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${status.badge} bg-white`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="max-h-[65vh] overflow-y-auto px-6 py-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <DetailCard icon={Building2} label="Startup" value={meeting.start_up_name} />
            <DetailCard icon={User} label="Founder" value={meeting.founder_name} />
            <DetailCard
              icon={Calendar}
              label="Date"
              value={formatMeetingDate(meeting.date)}
            />
            <DetailCard icon={Clock} label="Time" value={formatTime(meeting.time)} />
            <DetailCard
              icon={Timer}
              label="Duration"
              value={meeting.meeting_duration}
            />
            <DetailCard icon={Video} label="Mode" value={meeting.meeting_mode} />
            {meeting.participants && (
              <DetailCard
                icon={Users}
                label="Participants"
                value={meeting.participants}
                className="sm:col-span-2"
              />
            )}
          </div>

          {isVirtual && meetingUrl && (
            <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800/70">
                External meeting link
              </p>
              <p
                className="mt-3 break-all rounded-lg border border-emerald-100 bg-white px-3 py-2 font-mono text-xs text-gray-600"
                title={meetingUrl}
              >
                {meetingUrl}
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <a
                  href={meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#45C74D] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[#45C74D]/25 transition hover:bg-[#3aab42]"
                >
                  <Video className="h-4 w-4" />
                  Open external link
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                </a>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(meetingUrl);
                      setCopied(true);
                      toast.success("Meeting link copied");
                      setTimeout(() => setCopied(false), 2000);
                    } catch {
                      toast.error("Could not copy link");
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-[#45C74D]" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </div>
          )}

          {!isVirtual && meeting.meeting_location && (
            <div className="mt-5 flex gap-3 rounded-xl border border-amber-100 bg-amber-50/60 p-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-800/70">
                  Location
                </p>
                <p className="mt-1 text-sm font-medium text-gray-800">
                  {meeting.meeting_location}
                </p>
              </div>
            </div>
          )}

          {meeting.meeting_agenda && (
            <div className="mt-5 rounded-xl border border-gray-100 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-gray-700">
                <FileText className="h-4 w-4 text-[#45C74D]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Agenda
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                {meeting.meeting_agenda}
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 bg-gray-50/80 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MeetingDetailsModal;

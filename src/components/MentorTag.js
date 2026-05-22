import React from "react";

const TAG_STYLES = {
  VC: "bg-rose-100 text-rose-800 border-rose-300",
  IITMEF: "bg-emerald-100 text-emerald-800 border-emerald-300",
  Alum: "bg-violet-100 text-violet-800 border-violet-300",
  Others: "bg-amber-100 text-amber-800 border-amber-300",
};

const FALLBACK_PALETTE = [
  "bg-sky-100 text-sky-800 border-sky-300",
  "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300",
  "bg-cyan-100 text-cyan-800 border-cyan-300",
  "bg-orange-100 text-orange-800 border-orange-300",
  "bg-teal-100 text-teal-800 border-teal-300",
  "bg-indigo-100 text-indigo-800 border-indigo-300",
  "bg-pink-100 text-pink-800 border-pink-300",
  "bg-lime-100 text-lime-800 border-lime-300",
];

const KNOWN_TAG_KEYS = {
  vc: "VC",
  iitmef: "IITMEF",
  alum: "Alum",
  others: "Others",
};

const getTagStyle = (tag) => {
  const label = String(tag || "").trim();
  if (!label) return "";

  const knownKey = KNOWN_TAG_KEYS[label.toLowerCase()];
  if (knownKey && TAG_STYLES[knownKey]) {
    return TAG_STYLES[knownKey];
  }

  let hash = 0;
  for (let i = 0; i < label.length; i += 1) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  }
  return FALLBACK_PALETTE[Math.abs(hash) % FALLBACK_PALETTE.length];
};

function MentorTag({ tag, className = "" }) {
  const label = String(tag || "").trim();
  if (!label) {
    return null;
  }

  const style = getTagStyle(label);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style} ${className}`}
    >
      {label}
    </span>
  );
}

export default MentorTag;

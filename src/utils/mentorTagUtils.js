export const MENTOR_TAG_OPTIONS = ["VC", "IITMEF", "Alum", "Others"];

export const isVcMentorTag = (tag) =>
  String(tag || "").trim().toLowerCase() === "vc";

const parseJsonField = (value) => {
  if (!value) {
    return null;
  }

  if (typeof value === "object") {
    return value;
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  return null;
};

export const resolveStartupProgram = (startup) => {
  if (!startup) {
    return "";
  }

  const basic = parseJsonField(startup.basic);
  const official = parseJsonField(startup.official);

  return (
    startup.program ||
    startup.scheme ||
    startup.startup_program ||
    basic?.program ||
    official?.scheme ||
    ""
  )
    .toString()
    .trim();
};

export const isPrathamProgram = (startup) =>
  resolveStartupProgram(startup).toLowerCase() === "pratham";

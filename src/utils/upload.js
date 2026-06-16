export const UPLOAD_PROFILES = {
  document: {
    extensions: [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"],
    maxSizeBytes: 5 * 1024 * 1024,
    label: "PDF, DOC, DOCX, JPG, PNG",
  },
  image: {
    extensions: [".jpg", ".jpeg", ".png", ".webp"],
    maxSizeBytes: 2 * 1024 * 1024,
    label: "JPG, PNG, WEBP",
  },
};

export const validateUploadFile = (file, profileName = "document") => {
  if (!file) return null;

  const profile = UPLOAD_PROFILES[profileName];
  if (!profile) return "Invalid upload profile.";

  const name = file.name || "";
  const dotIndex = name.lastIndexOf(".");
  const ext = dotIndex >= 0 ? name.slice(dotIndex).toLowerCase() : "";

  if (!profile.extensions.includes(ext)) {
    return `Invalid file type. Allowed: ${profile.label}.`;
  }

  if (file.size > profile.maxSizeBytes) {
    const mb = Math.round(profile.maxSizeBytes / (1024 * 1024));
    return `File too large. Maximum size is ${mb} MB.`;
  }

  return null;
};

export const hasStoredS3File = (storedValue, folderPrefix) => {
  if (!storedValue || typeof storedValue !== "string") return false;
  const trimmed = storedValue.trim();
  if (!trimmed) return false;
  return (
    trimmed.startsWith(`${folderPrefix}/`) ||
    trimmed.includes(`.amazonaws.com/${folderPrefix}/`)
  );
};

export const hasFundingDocument = (document) =>
  hasStoredS3File(document, "Funding");

export const validateFundingDocument = (file) =>
  validateUploadFile(file, "document");

export const validateImageUpload = (file) => validateUploadFile(file, "image");

export const getAcceptAttribute = (profileName = "document") => {
  const profile = UPLOAD_PROFILES[profileName];
  return profile.extensions.join(",");
};

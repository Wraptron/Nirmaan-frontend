/**
 * Turn API / axios errors into a safe string for toast or UI text.
 */
export function getErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  if (error == null) return fallback;
  if (typeof error === "string") return error;

  const data = error?.response?.data;
  if (typeof data === "string") return data;

  if (data && typeof data === "object") {
    const nested =
      data.message ||
      data.error ||
      data.Error ||
      data.authentication ||
      data.status;
    if (typeof nested === "string") return nested;
  }

  if (typeof error?.message === "string" && error.message) {
    return error.message;
  }

  return fallback;
}

export function asDisplayText(value, fallback = "") {
  if (value == null) return fallback;
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (typeof value === "object") {
    if (typeof value.startup_description === "string") {
      return value.startup_description;
    }
    if (typeof value.message === "string") return value.message;
    try {
      return JSON.stringify(value);
    } catch {
      return fallback;
    }
  }
  return fallback;
}

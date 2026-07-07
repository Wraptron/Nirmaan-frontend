const LEGACY_SESSION_KEYS = [
  "role",
  "startup_id",
  "mentor_id",
  "user_mail",
  "user_name",
  "startupId",
  "token",
  "email",
  "name",
];

let memorySession = {
  role: null,
  startup_id: null,
  mentor_id: null,
  user_mail: null,
  user_name: null,
};

let onClearCallback = null;

/** Remove auth keys left in sessionStorage from the pre-migration flow. */
export function clearLegacySessionStorageAuth() {
  if (typeof sessionStorage === "undefined") {
    return;
  }

  LEGACY_SESSION_KEYS.forEach((key) => {
    sessionStorage.removeItem(key);
  });
}

/** Allows AuthContext to stay in sync when legacy callers invoke clearAuthSession. */
export function registerAuthClearCallback(callback) {
  onClearCallback = callback;
}

/** Sync in-memory session from server-verified user (used by AuthContext). */
export function syncAuthSession(user) {
  clearLegacySessionStorageAuth();

  if (!user) {
    memorySession = {
      role: null,
      startup_id: null,
      mentor_id: null,
      user_mail: null,
      user_name: null,
    };
    return;
  }

  const roleRaw = user.role;
  memorySession = {
    role: roleRaw === "" || roleRaw == null ? null : Number(roleRaw),
    startup_id: user.startup_id ?? null,
    mentor_id: user.mentor_id ?? null,
    user_mail: user.user_mail ?? null,
    user_name: user.user_name ?? null,
  };
}

export function getAuthSession() {
  return { ...memorySession };
}

/** Shape compatible with legacy jwt-decode usage across the app. */
export function getSessionUser() {
  const session = getAuthSession();
  return {
    user_mail: session.user_mail,
    user_name: session.user_name,
    role: session.role,
    startup_id: session.startup_id,
    mentor_id: session.mentor_id,
  };
}

export function isAuthenticated() {
  return memorySession.role != null && memorySession.role !== "";
}

export function clearAuthSession() {
  syncAuthSession(null);
  clearLegacySessionStorageAuth();
  localStorage.removeItem("token");
  if (onClearCallback) {
    onClearCallback();
  }
}

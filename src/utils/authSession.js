const LEGACY_AUTH_KEYS = [
  "role",
  "startup_id",
  "mentor_id",
  "user_mail",
  "user_name",
  "startupId",
];

const EMPTY_SESSION = {
  role: null,
  startup_id: null,
  mentor_id: null,
  user_mail: null,
  user_name: null,
};

/** Server-validated session (in-memory only). Populated via /auth/me or login refresh. */
let validatedSession = null;
let bootstrapPromise = null;

function normalizeUser({
  role,
  startup_id,
  mentor_id,
  user_mail,
  user_name,
}) {
  const roleRaw = role;
  return {
    role: roleRaw === "" || roleRaw == null ? null : Number(roleRaw),
    startup_id: startup_id ?? null,
    mentor_id: mentor_id ?? null,
    user_mail: user_mail ?? null,
    user_name: user_name ?? null,
  };
}

/** Remove legacy client-side auth keys from prior app versions. */
function clearLegacyAuthStorage() {
  LEGACY_AUTH_KEYS.forEach((key) => sessionStorage.removeItem(key));
  localStorage.removeItem("token");
}

/** Set auth state from a server-validated response (login or /auth/me). */
export function setValidatedSession(user) {
  validatedSession = normalizeUser(user);
}

export function clearValidatedSession() {
  validatedSession = null;
}

/**
 * Bootstrap auth from the server. Returns the validated user or null.
 * Authorization for API calls is enforced by httpOnly cookies on the backend.
 */
export async function bootstrapAuth(apiClient) {
  if (bootstrapPromise) {
    return bootstrapPromise;
  }

  bootstrapPromise = (async () => {
    clearLegacyAuthStorage();

    try {
      const response = await apiClient.get("/api/v1/auth/me");
      const user = response.data?.user;
      if (user?.user_mail) {
        setValidatedSession(user);
        return { ok: true, user: validatedSession };
      }
    } catch {
      // No valid session cookie — fall through to clear.
    }

    clearValidatedSession();
    return { ok: false, user: null };
  })().finally(() => {
    bootstrapPromise = null;
  });

  return bootstrapPromise;
}

export function getAuthSession() {
  if (validatedSession) {
    return { ...validatedSession };
  }
  return { ...EMPTY_SESSION };
}

/** Shape compatible with legacy jwt-decode usage across the app. */
export function getSessionUser() {
  return getAuthSession();
}

/** True only when the server has confirmed the session via /auth/me or login. */
export function isAuthenticated() {
  return validatedSession != null;
}

export function clearAuthSession() {
  clearValidatedSession();
  clearLegacyAuthStorage();
}

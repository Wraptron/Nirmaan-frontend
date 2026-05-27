const SESSION_KEYS = {
  role: "role",
  startup_id: "startup_id",
  mentor_id: "mentor_id",
  user_mail: "user_mail",
  user_name: "user_name",
};

export function setAuthSession({
  role,
  startup_id,
  mentor_id,
  user_mail,
  user_name,
}) {
  if (role != null) sessionStorage.setItem(SESSION_KEYS.role, String(role));
  sessionStorage.setItem(SESSION_KEYS.startup_id, startup_id ?? "");
  if (mentor_id != null && mentor_id !== "") {
    sessionStorage.setItem(SESSION_KEYS.mentor_id, String(mentor_id));
  } else {
    sessionStorage.removeItem(SESSION_KEYS.mentor_id);
  }
  if (user_mail) sessionStorage.setItem(SESSION_KEYS.user_mail, user_mail);
  if (user_name) sessionStorage.setItem(SESSION_KEYS.user_name, user_name);
}

export function getAuthSession() {
  const roleRaw = sessionStorage.getItem(SESSION_KEYS.role);
  return {
    role: roleRaw === "" || roleRaw == null ? null : Number(roleRaw),
    startup_id: sessionStorage.getItem(SESSION_KEYS.startup_id) || null,
    mentor_id: sessionStorage.getItem(SESSION_KEYS.mentor_id) || null,
    user_mail: sessionStorage.getItem(SESSION_KEYS.user_mail) || null,
    user_name: sessionStorage.getItem(SESSION_KEYS.user_name) || null,
  };
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
  const role = sessionStorage.getItem(SESSION_KEYS.role);
  return role != null && role !== "";
}

export function clearAuthSession() {
  Object.values(SESSION_KEYS).forEach((key) => {
    sessionStorage.removeItem(key);
  });
  localStorage.removeItem("token");
}

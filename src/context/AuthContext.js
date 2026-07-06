import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiClient } from "../utils/apiClient";
import {
  clearAuthSession,
  clearLegacySessionStorageAuth,
  registerAuthClearCallback,
  syncAuthSession,
} from "../utils/authSession";

const AuthContext = createContext(null);

let authMeCallCount = 0;

/** Sole HTTP caller for GET /api/v1/auth/me — do not duplicate elsewhere. */
async function fetchCurrentUser() {
  authMeCallCount++;
  if (authMeCallCount > 1) {
    console.warn(
      `[auth] /auth/me called ${authMeCallCount} times this session — check for duplicate calls`
    );
  }

  const response = await apiClient.get("/api/v1/auth/me");
  return response.data?.user ?? null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const applyUser = useCallback((nextUser) => {
    setUser(nextUser);
    if (nextUser) {
      syncAuthSession(nextUser);
    } else {
      clearAuthSession();
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const nextUser = await fetchCurrentUser();
      applyUser(nextUser);
      return nextUser;
    } catch {
      applyUser(null);
      return null;
    }
  }, [applyUser]);

  const clearUser = useCallback(() => {
    applyUser(null);
  }, [applyUser]);

  useEffect(() => {
    registerAuthClearCallback(() => setUser(null));
    clearLegacySessionStorageAuth();
  }, []);

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      clearLegacySessionStorageAuth();
      setLoading(true);
      try {
        await refreshUser();
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      active = false;
    };
  }, [refreshUser]);

  const isAuthenticated = user?.role != null && user?.role !== "";

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      refreshUser,
      clearUser,
    }),
    [user, loading, isAuthenticated, refreshUser, clearUser]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

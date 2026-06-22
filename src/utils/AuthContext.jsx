import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiClient, setAuthRefreshHandler } from "./apiClient";
import { bootstrapAuth } from "./authSession";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(null);

  const refreshAuth = useCallback(async () => {
    const result = await bootstrapAuth(apiClient);
    if (result.ok) {
      setUser(result.user);
      setStatus("authenticated");
    } else {
      setUser(null);
      setStatus("unauthenticated");
    }
    return result;
  }, []);

  useEffect(() => {
    setAuthRefreshHandler(refreshAuth);
    refreshAuth();
    return () => setAuthRefreshHandler(null);
  }, [refreshAuth]);

  const value = useMemo(
    () => ({
      status,
      user,
      isAuthenticated: status === "authenticated" && user != null,
      refreshAuth,
    }),
    [status, user, refreshAuth]
  );

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <span className="text-green-600">Loading...</span>
      </div>
    );
  }

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

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

/**
 * UX-only route guard. Real authorization is enforced by the API via
 * httpOnly cookies and server-side role checks on every endpoint.
 */
function ProtectedRoutes({ requiredRoles = [], allowedRoles = [] }) {
  const { isAuthenticated, user } = useAuth();
  const roles = requiredRoles?.length ? requiredRoles : allowedRoles;

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  if (roles.length > 0 && !roles.includes(String(user.role))) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;

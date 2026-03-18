// utils/ProtectedRoutes.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes({ requiredRoles = [], allowedRoles = [] }) {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');
  const roles = requiredRoles?.length ? requiredRoles : allowedRoles;

  // If token or role is missing, redirect to login
  if (!token || !role) {
    return <Navigate to="/" replace />;
  }

  // If role is not in the allowed roles, redirect to login
  if (roles.length > 0 && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and authorized
  return <Outlet />;
}

export default ProtectedRoutes;

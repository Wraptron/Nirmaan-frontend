// utils/ProtectedRoutes.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthSession, isAuthenticated } from './authSession';

function ProtectedRoutes({ requiredRoles = [], allowedRoles = [] }) {
  const { role } = getAuthSession();
  const roles = requiredRoles?.length ? requiredRoles : allowedRoles;

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  if (roles.length > 0 && !roles.includes(String(role))) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;

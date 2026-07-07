// utils/ProtectedRoutes.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoutes({ requiredRoles = [], allowedRoles = [] }) {
  const { user, loading, isAuthenticated } = useAuth();
  const roles = requiredRoles?.length ? requiredRoles : allowedRoles;

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (roles.length > 0 && !roles.includes(String(user.role))) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;

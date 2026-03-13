import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Spinner from "../UI/Spinner/Spinner";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole = null }) {
  const { loading, isAuthenticated, user } = useAuthContext();

  if (loading) {
    return <Spinner center={true} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;

// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function AdminRoute({ children }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (profile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

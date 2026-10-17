import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";

/**
 * AdminRoute (frontend-only placeholder guard)
 * Same mock check as CustomerRoute, scoped to /admin/*.
 */
export default function AdminRoute() {
  const { isAuthenticated, role } = useAuth();
  return isAuthenticated && role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
}

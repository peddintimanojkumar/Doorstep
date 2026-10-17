import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";

/**
 * CustomerRoute (frontend-only placeholder guard)
 * Blocks access to /dashboard/* when there's no mock session. This is not
 * real authorization — it only checks localStorage via useAuth — and exists
 * so the route tree behaves sensibly until a real backend is wired in.
 */
export default function CustomerRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
}

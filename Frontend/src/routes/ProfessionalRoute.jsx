import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";

export default function ProfessionalRoute() {
  const { session, isAuthenticated } = useAuth();

  const location = useLocation();

  /*
   * Not logged in
   */
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  /*
   * Check role
   */
  const role = String(session?.role || "").toLowerCase();

  /*
   * Only professionals can enter
   * the professional dashboard.
   */
  if (role !== "professional") {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  /*
   * Correct user.
   */
  return <Outlet />;
}

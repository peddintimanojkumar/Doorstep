import { useLocalStorage } from "./useLocalStorage";
import { loginUser as authenticateUser } from "../services/api/authApi";
import { registerUser as createAccount } from "../services/api/authApi";
function mapRole(role) {
  const roles = {
    CUSTOMER: "customer",
    PROFESSIONAL: "professional",
    ADMIN: "admin",
  };

  return roles[role] || role?.toLowerCase() || null;
}

export function useAuth() {
  const [session, setSession] = useLocalStorage("doorstep.session", null);

  const login = async (credentials) => {
    const user = await authenticateUser(credentials);

    const nextSession = {
      id: user.id,
      name: [user.firstName, user.lastName].filter(Boolean).join(" "),
      email: user.email,
      mobile: user.phone || "",
      role: mapRole(user.role),
    };

    setSession(nextSession);
    return nextSession;
  };

  const register = async (data) => {
    await createAccount(data);

    // Log in through the existing backend login endpoint.
    // This also stores the JWT using loginUser().
    return await login({
      email: data.email.trim(),
      password: data.password,
    });
  };

  const updateSession = (updates) => {
    setSession((current) => ({
      ...(current || {}),
      ...updates,
    }));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setSession(null);
  };

  return {
    session,
    role: session?.role ?? null,
    isAuthenticated: 
    Boolean(session) && Boolean(localStorage.getItem("token")),
    login,
    register,
    logout,
    updateSession,
  };
}

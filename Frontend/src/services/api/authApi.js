
import apiClient from "./apiClient";

export async function loginUser(credentials) {
  const email = credentials.email?.trim();
  const password = credentials.password;

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const response = await apiClient.post("/auth/login", {
    email,
    password,
  });

  const { token, user } = response.data;

  if (!token || !user) {
    throw new Error("Invalid login response from server.");
  }

  localStorage.setItem("token", token);

  return user;
}

export async function registerUser(data) {
  const fullName = data.name.trim();
  const nameParts = fullName.split(/\s+/);

  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const response = await apiClient.post("/auth/register", {
    firstName,
    lastName,
    email: data.email.trim().toLowerCase(),
    phone: data.mobile.replace(/\s+/g, ""),
    password: data.password,
  });

  return response.data;
}


import apiClient from "./apiClient";

export async function getAdminProfessionals() {
  const response = await apiClient.get("/admin/professionals");
  return response.data.professionals ?? [];
}

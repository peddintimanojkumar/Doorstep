import apiClient from "./apiClient";

export async function getAdminServices(params = {}) {
  const response = await apiClient.get("/admin/services", {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 100,
      ...(params.search?.trim()
        ? { search: params.search.trim() }
        : {}),
      ...(params.categoryId
        ? { categoryId: params.categoryId }
        : {}),
      ...(params.isActive !== "" && params.isActive !== undefined
        ? { isActive: params.isActive }
        : {}),
    },
  });

  return response.data;
}

export async function getAdminCategories() {
  const response = await apiClient.get("/admin/categories", {
    params: { page: 1, limit: 100 },
  });

  return response.data.categories ?? [];
}

export async function createAdminService(service) {
  const response = await apiClient.post("/admin/services", service);
  return response.data;
}

export async function updateAdminService(id, service) {
  const response = await apiClient.put(
    `/admin/services/${id}`,
    service
  );
  return response.data;
}

export async function updateAdminServiceStatus(id, isActive) {
  const response = await apiClient.patch(
    `/admin/services/${id}/status`,
    { isActive }
  );
  return response.data;
}
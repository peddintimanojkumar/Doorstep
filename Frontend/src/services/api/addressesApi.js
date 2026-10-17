import apiClient from "./apiClient";

export async function getAddresses() {
  const response = await apiClient.get("/addresses");
  return response.data.addresses || [];
}

export async function createAddress(address) {
  const response = await apiClient.post("/addresses", address);
  return response.data.address;
}

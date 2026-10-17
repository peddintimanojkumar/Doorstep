import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getPopularServices,
  getServices,
  getServiceBySlug,
} from "../services/api/servicesApi";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: Infinity,
  });
}

/** The full service catalogue (filtering/sorting happens client-side). */
export function useServiceCatalog() {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePopularServices() {
  return useQuery({
    queryKey: ["services", "popular"],
    queryFn: getPopularServices,
    staleTime: 5 * 60 * 1000,
  });
}
export function useServiceDetails(slug) {
  return useQuery({
    queryKey: ["services", "detail", slug],
    queryFn: () => getServiceBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
}

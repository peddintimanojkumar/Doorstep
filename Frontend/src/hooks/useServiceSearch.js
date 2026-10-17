import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchCategories } from "../services/api/servicesApi";
import { useDebounce } from "./useDebounce";

const MIN_QUERY_LENGTH = 2;

/**
 * useServiceSearch
 * Debounces the raw input, then queries the search API (mock for now).
 * Returns:
 *  - hasQuery: the input is long enough to search
 *  - results: matching categories
 *  - isLoading: waiting on the debounce or the request
 */
export function useServiceSearch(query) {
  const trimmed = query.trim();
  const debounced = useDebounce(trimmed, 250);
  const enabled = debounced.length >= MIN_QUERY_LENGTH;

  const { data, isFetching } = useQuery({
    queryKey: ["service-search", debounced],
    queryFn: () => searchCategories(debounced),
    enabled,
    placeholderData: keepPreviousData,
  });

  const hasQuery = trimmed.length >= MIN_QUERY_LENGTH;

  return {
    hasQuery,
    results: hasQuery && enabled ? (data ?? []) : [],
    isLoading: hasQuery && (trimmed !== debounced || isFetching),
  };
}

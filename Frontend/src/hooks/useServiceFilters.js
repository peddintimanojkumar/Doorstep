import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";
import {
  categoryOptions,
  filterLabels,
  sidebarFilters,
  sortOptions,
} from "../data/serviceFilters";

const FILTER_OPTIONS = {
  category: categoryOptions,
  ...Object.fromEntries(
    sidebarFilters.map((filter) => [filter.key, filter.options]),
  ),
};
const FILTER_KEYS = Object.keys(FILTER_OPTIONS);
const DEFAULT_SORT = "recommended";

/**
 * useServiceFilters
 * Keeps the Services page filters in the URL (?q=&category=&type=&price=
 * &duration=&availability=&sort=) so views can be shared and bookmarked,
 * and so links from elsewhere (e.g. homepage search) just work. Unknown
 * or invalid values in the URL are ignored.
 *
 * The search box is local state, debounced into the `q` param; changes to
 * `q` that come from the URL (back/forward) flow back into the box.
 */
export function useServiceFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const read = (key) => {
      const value = searchParams.get(key) ?? "";
      return FILTER_OPTIONS[key].some((option) => option.value === value)
        ? value
        : "";
    };
    const sort = searchParams.get("sort");

    return {
      q: (searchParams.get("q") ?? "").trim(),
      ...Object.fromEntries(FILTER_KEYS.map((key) => [key, read(key)])),
      sort: sortOptions.some((option) => option.value === sort)
        ? sort
        : DEFAULT_SORT,
    };
  }, [searchParams]);

  const setParam = useCallback(
    (key, value) => {
      setSearchParams(
        (previous) => {
          const next = new URLSearchParams(previous);
          const isDefault =
            !value || (key === "sort" && value === DEFAULT_SORT);
          if (isDefault) {
            next.delete(key);
          } else {
            next.set(key, value);
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  // --- search box: local state <-> `q` param -------------------------------
  const [searchInput, setSearchInput] = useState(filters.q);
  const debouncedInput = useDebounce(searchInput, 300);
  const lastWrittenQ = useRef(filters.q);

  // URL -> input, only for changes we didn't write ourselves.
  useEffect(() => {
    if (filters.q !== lastWrittenQ.current) {
      lastWrittenQ.current = filters.q;
      setSearchInput(filters.q);
    }
  }, [filters.q]);

  // input -> URL, once typing pauses.
  useEffect(() => {
    const trimmed = debouncedInput.trim();
    if (trimmed === filters.q) return;
    lastWrittenQ.current = trimmed;
    setParam("q", trimmed);
    // Deliberately keyed on the debounced input only: re-running when
    // filters.q changes would overwrite a URL-driven change with stale input.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  const setFilter = useCallback(
    (key, value) => setParam(key, value),
    [setParam],
  );

  const clearFilter = useCallback(
    (key) => {
      if (key === "q") {
        lastWrittenQ.current = "";
        setSearchInput("");
      }
      setParam(key, "");
    },
    [setParam],
  );

  // Clears the search and every filter, but keeps the chosen sort order.
  const resetFilters = useCallback(() => {
    lastWrittenQ.current = "";
    setSearchInput("");
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams();
        const sort = previous.get("sort");
        if (sort) next.set("sort", sort);
        return next;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  const activeFilters = useMemo(() => {
    const tags = [];
    if (filters.q) tags.push({ key: "q", label: `Search: “${filters.q}”` });
    FILTER_KEYS.forEach((key) => {
      if (!filters[key]) return;
      const option = FILTER_OPTIONS[key].find(
        (item) => item.value === filters[key],
      );
      tags.push({ key, label: `${filterLabels[key]}: ${option.label}` });
    });
    return tags;
  }, [filters]);

  return {
    filters,
    activeFilters,
    searchInput,
    setSearchInput,
    setFilter,
    clearFilter,
    resetFilters,
  };
}

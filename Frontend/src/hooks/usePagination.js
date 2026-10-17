import { useEffect, useMemo, useState } from "react";

/**
 * usePagination
 * Client-side pagination over an already-filtered array. Resets to page 1
 * whenever the filtered result shrinks below the current page (e.g. a
 * search narrows the list while on page 2).
 */
export function usePagination(items, pageSize = 6) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));

  useEffect(() => {
    if (page > pageCount) setPage(1);
  }, [page, pageCount]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  return { page, setPage, pageCount, pageItems };
}

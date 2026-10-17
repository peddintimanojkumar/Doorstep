import { ChevronLeft, ChevronRight } from "lucide-react";

/** Pagination — Prev/Next control for DataTable. Renders nothing for a single page. */
export default function Pagination({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null;

  return (
    <div className="mt-3 flex items-center justify-between rounded-control border border-stone-200 bg-white px-4 py-2.5 text-sm text-ink-500">
      <span>
        Page {page} of {pageCount}
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          className="flex items-center gap-1 rounded-control border border-stone-300 px-3 py-1.5 hover:border-fern-300 disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Prev
        </button>
        <button
          type="button"
          disabled={page === pageCount}
          onClick={() => onChange(page + 1)}
          className="flex items-center gap-1 rounded-control border border-stone-300 px-3 py-1.5 hover:border-fern-300 disabled:pointer-events-none disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

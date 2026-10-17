import { useId } from "react";
import { Search, X } from "lucide-react";

/**
 * SearchField
 * Controlled text search input with a leading icon and a clear button.
 * The label is visually hidden but always present for screen readers.
 */
export default function SearchField({
  value,
  onChange,
  placeholder = "Search",
  label = "Search",
  className = "",
}) {
  const id = useId();

  return (
    <div role="search" className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400"
        aria-hidden="true"
      />
      <input
        id={id}
        type="text"
        autoComplete="off"
        enterKeyHint="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-card border border-stone-300 bg-white pl-12 pr-11 text-base text-ink-800 shadow-rest placeholder:text-ink-300 focus:border-fern-500 focus:outline-none focus:ring-2 focus:ring-fern-200"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-400 hover:bg-stone-100 hover:text-ink-700"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

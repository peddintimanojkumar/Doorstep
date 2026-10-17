import { useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import Button from "../common/Button";
import { useServiceSearch } from "../../hooks/useServiceSearch";
import { getIcon } from "../../utils/iconMap";
import { categoryGroups } from "../../data/categories";
import { popularSearches } from "../../data/home";
import { ROUTES } from "../../constants/routes";

const GROUP_LABELS = Object.fromEntries(
  categoryGroups.map((group) => [group.id, group.label]),
);

/**
 * ServiceSearch
 * Combobox-style search. Typing (2+ characters, debounced) shows matching
 * categories; arrow keys move through them, Enter opens the highlighted one
 * — or, with nothing highlighted, the full results on /services?q=.
 *
 * Props:
 *  - showPopular: render the popular-search chips under the field
 */
export default function ServiceSearch({ showPopular = false }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const listboxId = useId();
  const navigate = useNavigate();

  const { hasQuery, results, isLoading } = useServiceSearch(query);
  const showDropdown = open && hasQuery;
  const activeResult = results[activeIndex];

  const goToCategory = (category) => {
    setOpen(false);
    navigate(ROUTES.serviceDetails(category.slug));
  };

  const goToResults = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setOpen(false);
    navigate(`${ROUTES.SERVICES}?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (activeResult) {
      goToCategory(activeResult);
    } else {
      goToResults();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    if (!open) {
      setOpen(true);
      return;
    }
    if (results.length === 0) return;

    const step = event.key === "ArrowDown" ? 1 : -1;
    setActiveIndex(
      (current) => (current + step + results.length) % results.length,
    );
  };

  const handleBlur = (event) => {
    if (!containerRef.current?.contains(event.relatedTarget)) {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
    setOpen(true);
    setActiveIndex(-1);
  };

  const clear = () => {
    setQuery("");
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const applyPopularSearch = (text) => {
    setQuery(text);
    setOpen(true);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div>
      <div ref={containerRef} onBlur={handleBlur} className="relative">
        <form
          role="search"
          aria-label="Search services"
          onSubmit={handleSubmit}
          className="flex items-center gap-2 rounded-card border border-stone-300 bg-white px-4 shadow-rest focus-within:border-fern-500 focus-within:ring-2 focus-within:ring-fern-200"
        >
          <Search
            className="h-5 w-5 shrink-0 text-ink-400"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-label="What do you need help with?"
            aria-expanded={showDropdown}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={
              activeResult ? `${listboxId}-${activeIndex}` : undefined
            }
            autoComplete="off"
            enterKeyHint="search"
            placeholder="I need a plumber"
            value={query}
            onChange={handleChange}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            className="h-14 min-w-0 flex-1 bg-transparent text-base text-ink-800 placeholder:text-ink-300 focus-visible:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={clear}
              aria-label="Clear search"
              className="rounded-full p-1.5 text-ink-400 hover:bg-stone-100 hover:text-ink-700"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
          <Button type="submit" size="md">
            Search
          </Button>
        </form>

        {showDropdown && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-card border border-stone-200 bg-white shadow-lifted">
            {results.length > 0 ? (
              <>
                <ul
                  id={listboxId}
                  role="listbox"
                  aria-label="Matching services"
                >
                  {results.map((category, index) => {
                    const Icon = getIcon(category.icon);
                    return (
                      <li
                        key={category.id}
                        id={`${listboxId}-${index}`}
                        role="option"
                        aria-selected={index === activeIndex}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => goToCategory(category)}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`flex cursor-pointer items-center gap-3 px-4 py-3 ${
                          index === activeIndex ? "bg-fern-50" : ""
                        }`}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-fern-50 text-fern-700">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-ink-800">
                            {category.name}
                          </span>
                          <span className="block text-xs text-ink-400">
                            {GROUP_LABELS[category.group]}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={goToResults}
                  className="w-full border-t border-stone-200 px-4 py-3 text-left text-sm font-medium text-fern-700 hover:bg-stone-50"
                >
                  See all services matching “{query.trim()}”
                </button>
              </>
            ) : (
              <p role="status" className="px-4 py-5 text-sm text-ink-500">
                {isLoading
                  ? "Searching…"
                  : "No matching services yet. Try a different word, or browse all services."}
              </p>
            )}
          </div>
        )}
      </div>

      {showPopular && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-ink-400">Popular:</span>
          {popularSearches.map((text) => (
            <button
              key={text}
              type="button"
              onClick={() => applyPopularSearch(text)}
              className="max-w-full rounded-full border border-stone-300 bg-[#F3F4F6] px-3 py-1 text-left text-sm text-ink-600 transition-colors hover:border-fern-300 hover:text-fern-700"
            >
              {text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

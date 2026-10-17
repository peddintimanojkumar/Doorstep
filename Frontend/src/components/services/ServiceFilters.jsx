import { sidebarFilters } from "../../data/serviceFilters";

/**
 * ServiceFilters
 * Sidebar filter panel, generated from data/serviceFilters.js. Each filter
 * is a fieldset of radio buttons, so it is fully keyboard and screen-reader
 * accessible without any custom widgets.
 *
 * Props:
 *  - filters: current filter values, keyed by filter key
 *  - onChange: (key, value) => void
 */
export default function ServiceFilters({ filters, onChange }) {
  return (
    <div className="space-y-6 rounded-card border border-stone-200 bg-white p-5 shadow-rest">
      <h2 className="font-sans text-base font-semibold text-ink-800">
        Filters
      </h2>

      {sidebarFilters.map((filter) => (
        <fieldset key={filter.key}>
          <legend className="text-sm font-medium text-ink-800">
            {filter.label}
          </legend>
          <div className="mt-2 space-y-0.5">
            {filter.options.map((option) => (
              <label
                key={option.value || "any"}
                className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-ink-600"
              >
                <input
                  type="radio"
                  name={filter.key}
                  value={option.value}
                  checked={filters[filter.key] === option.value}
                  onChange={() => onChange(filter.key, option.value)}
                  className="h-4 w-4 accent-fern-600"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

import { Check } from "lucide-react";

/**
 * OptionGrid
 * Shared "pick one of several cards" control used by the booking steps
 * that are a selection rather than a text form (Service, Package, Time,
 * Duration) — keeps those step files thin instead of each re-implementing
 * the same radio-group card markup.
 *
 * Props: options: [{ value, label, description? }], value, onChange,
 * ariaLabel, columns (Tailwind grid-cols classes for sm/lg).
 */
export default function OptionGrid({
  options,
  value,
  onChange,
  ariaLabel,
  columns = "sm:grid-cols-2 lg:grid-cols-3",
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`grid grid-cols-1 gap-3 ${columns}`}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={`flex items-start gap-3 rounded-card border p-4 text-left transition ${
              selected
                ? "border-fern-500 bg-fern-50/60 ring-1 ring-fern-500"
                : "border-stone-200 bg-white hover:border-fern-300"
            }`}
          >
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                selected
                  ? "border-fern-600 bg-fern-600 text-white"
                  : "border-stone-300"
              }`}
            >
              {selected && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
            </span>
            <span>
              <span className="block text-sm font-medium text-ink-800">
                {option.label}
              </span>
              {option.description && (
                <span className="mt-0.5 block text-xs text-ink-500">
                  {option.description}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * ChipGroup
 * Single-select row of pill buttons (used for category filters).
 * Props:
 *  - options: [{ value, label }]
 *  - value: the selected option's value
 *  - onChange: (value) => void
 *  - ariaLabel: accessible name for the group
 */
export default function ChipGroup({
  options,
  value,
  onChange,
  ariaLabel,
  className = "",
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value || "all"}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              selected
                ? "border-fern-600 bg-fern-600 text-white"
                : "border-stone-300 bg-white text-ink-600 hover:border-fern-300 hover:text-fern-700"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

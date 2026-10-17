import { useId } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Select
 * Styled native <select> (keeps full native keyboard/a11y behavior).
 * onChange is called with the new value directly (not the raw event), to
 * match ChipGroup's convention.
 *
 * Props: label, value, onChange: (value) => void,
 * options: [{ value, label }], hideLabel (default false).
 */
export default function Select({
  label,
  value,
  onChange,
  options,
  hideLabel = false,
  className = "",
}) {
  const id = useId();

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={hideLabel ? "sr-only" : "mb-1.5 block text-xs text-ink-500"}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-control border border-stone-300 bg-white py-2.5 pl-3 pr-9 text-sm text-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fern-200"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

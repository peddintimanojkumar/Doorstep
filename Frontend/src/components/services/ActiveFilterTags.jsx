import { X } from "lucide-react";

/**
 * ActiveFilterTags
 * Removable tags for every active filter, plus a "Clear all" action.
 * Renders nothing when no filters are active.
 */
export default function ActiveFilterTags({ tags, onRemove, onClearAll }) {
  if (tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-2" aria-label="Active filters">
      {tags.map((tag) => (
        <li key={tag.key}>
          <button
            type="button"
            onClick={() => onRemove(tag.key)}
            aria-label={`Remove filter: ${tag.label}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-fern-50 py-1 pl-3 pr-2 text-sm text-fern-800 hover:bg-fern-100"
          >
            {tag.label}
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={onClearAll}
          className="px-2 text-sm font-medium text-ink-500 underline-offset-2 hover:text-ink-800 hover:underline"
        >
          Clear all
        </button>
      </li>
    </ul>
  );
}

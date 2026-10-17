import { SearchX } from "lucide-react";

/**
 * EmptyState
 * Shown when a filtered/searched list has zero results.
 * Props: title, description, action (a ReactNode, usually a Button —
 * consistent with SectionHeading's `action` convention).
 */
export default function EmptyState({
  title = "No results found",
  description = "Try adjusting your filters or search terms.",
  action,
}) {
  return (
    <div className="rounded-card border border-dashed border-stone-300 p-10 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-ink-400">
        <SearchX className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-ink-500">
        {description}
      </p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

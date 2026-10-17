/**
 * Spinner
 * Minimal loading indicator used for route-level Suspense fallbacks and
 * any async UI state. Respects prefers-reduced-motion via the global rule
 * in index.css (animation duration collapses, spinner still renders).
 *
 * Props:
 *  - size: "sm" | "md" | "lg" (default "md")
 *  - label: accessible label (default "Loading")
 */
export default function Spinner({ size = "md", label = "Loading" }) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-9 w-9 border-[3px]",
  };

  return (
    <div role="status" aria-label={label} className="inline-flex items-center">
      <span
        className={`${sizes[size]} animate-spin rounded-full border-fern-200 border-t-fern-600`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

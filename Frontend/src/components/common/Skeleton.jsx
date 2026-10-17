/** Skeleton — animated placeholder block. Size it with className. */
export default function Skeleton({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-control bg-stone-200 ${className}`}
    />
  );
}

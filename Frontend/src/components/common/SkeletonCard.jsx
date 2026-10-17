import Skeleton from "./Skeleton";

/** SkeletonCard — loading placeholder shaped like a ServiceCard. */
export default function SkeletonCard() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="rounded-card border border-stone-200 bg-white p-6 shadow-rest"
    >
      <Skeleton className="h-11 w-11" />
      <Skeleton className="mt-5 h-5 w-2/3" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-4/5" />
      <Skeleton className="mt-6 h-7 w-24" />
      <div className="mt-5 flex gap-3">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );
}

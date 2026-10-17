import { Star } from "lucide-react";

/**
 * RatingPlaceholder
 * Honest placeholder for services with no reviews yet — outlined stars
 * rather than a fabricated rating number.
 */
export default function RatingPlaceholder() {
  return (
    <div className="flex items-center gap-2 text-ink-400">
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} className="h-4 w-4" />
        ))}
      </div>
      <span className="text-sm">No reviews yet</span>
    </div>
  );
}

const TONES = {
  neutral: "bg-stone-100 text-ink-600",
  fern: "bg-fern-50 text-fern-700",
  marigold: "bg-marigold-50 text-marigold-700",
  inverse: "bg-white/10 text-white",
};

/**
 * Badge
 * Small pill label. tone: "neutral" | "fern" | "marigold" | "inverse"
 * (inverse is for dark backgrounds).
 */
export default function Badge({ tone = "neutral", className = "", children }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

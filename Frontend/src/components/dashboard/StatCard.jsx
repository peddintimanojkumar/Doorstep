const ACCENTS = {
  fern: "bg-fern-50 text-fern-700",
  marigold: "bg-marigold-50 text-marigold-700",
  ink: "bg-stone-100 text-ink-600",
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  accent = "fern",
}) {
  return (
    <div className="rounded-card border border-stone-200 bg-white p-5 shadow-rest">
      {Icon && (
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-control ${
            ACCENTS[accent] || ACCENTS.ink
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      )}

      <p className="mt-4 font-display text-2xl text-ink-800">{value}</p>

      <p className="text-sm text-ink-500">{label}</p>
    </div>
  );
}

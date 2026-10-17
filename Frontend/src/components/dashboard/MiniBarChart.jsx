/**
 * MiniBarChart
 * A small, dependency-free bar chart built from plain divs — the approved
 * tech stack doesn't include a charting library, and this is simple enough
 * not to need one. Not meant to replace a real charting library if richer
 * charts are ever needed.
 *
 * Props: data: [{ label, value }]
 */
export default function MiniBarChart({ data }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  const summary = data.map((item) => `${item.label}: ${item.value}`).join(", ");

  return (
    <div
      role="img"
      aria-label={`Bar chart. ${summary}`}
      className="flex h-48 items-end gap-3 rounded-card border border-stone-200 bg-white p-5"
    >
      {data.map((item) => (
        <div
          key={item.label}
          className="flex h-full flex-1 flex-col items-center justify-end gap-2"
        >
          <div
            aria-hidden="true"
            className="w-full rounded-t-control bg-fern-500"
            style={{ height: `${Math.max((item.value / max) * 100, 4)}%` }}
          />
          <span className="text-xs text-ink-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

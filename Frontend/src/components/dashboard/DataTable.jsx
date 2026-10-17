/**
 * DataTable
 * Simple, responsive table — scrolls horizontally on its own rather than
 * letting the page scroll sideways.
 *
 * Props:
 *  - columns: [{ key, label, render?: (row) => ReactNode }]
 *  - rows: array of objects; a column without `render` shows row[key]
 *  - emptyMessage: shown instead of a table when rows is empty
 */
export default function DataTable({
  columns,
  rows,
  emptyMessage = "Nothing to show yet.",
}) {
  if (rows.length === 0) {
    return (
      <p className="rounded-card border border-dashed border-stone-300 p-8 text-center text-sm text-ink-500">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-card border border-stone-200 bg-white">
      <table className="w-full min-w-[32rem] text-left text-sm">
        <thead>
          <tr className="border-b border-stone-200 text-xs uppercase tracking-wide text-ink-400">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-4 py-3 font-medium"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {rows.map((row, index) => (
            <tr key={row.id ?? index}>
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-ink-700">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

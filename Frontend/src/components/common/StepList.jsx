import { getIcon } from "../../utils/iconMap";

// Tailwind needs full class names at build time, so column counts are mapped
// explicitly rather than built with string interpolation.
const COLUMNS = {
  4: "lg:grid-cols-4",
  7: "lg:grid-cols-7",
};

/**
 * StepList
 * Ordered process/journey. Vertical timeline on small screens, horizontal
 * row (with connectors) from `lg` up.
 *
 * Props:
 *  - steps: [{ icon, title, description? }]
 *  - columns: 4 | 7 (columns at lg and above)
 *  - showNumbers: prefix each step with 01, 02, ...
 */
export default function StepList({ steps, columns = 4, showNumbers = false }) {
  return (
    <ol className={`grid gap-6 ${COLUMNS[columns]}`}>
      {steps.map((step, index) => {
        const Icon = getIcon(step.icon);
        const isLast = index === steps.length - 1;

        return (
          <li key={step.title} className="relative min-h-10 pl-14 lg:pl-0">
            <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-fern-50 text-fern-700 lg:static">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>

            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute left-5 top-11 h-[calc(100%-1.5rem)] w-px bg-fern-200 lg:left-12 lg:top-5 lg:h-px lg:w-[calc(100%-2rem)]"
              />
            )}

            <div className="pt-2 lg:pt-4">
              {showNumbers && (
                <p className="text-xs font-medium text-fern-600">
                  {String(index + 1).padStart(2, "0")}
                </p>
              )}
              <h3 className="font-sans text-base font-semibold text-ink-800">
                {step.title}
              </h3>
              {step.description && (
                <p className="mt-1 text-sm text-ink-500">{step.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Accordion
 * Expand/collapse list of question+answer (or any title+content) pairs.
 * Single item open at a time by default.
 *
 * Props:
 *  - items: [{ question, answer }] or [{ title, content }]
 *  - allowMultiple: keep more than one item open at once (default false)
 */
export default function Accordion({ items, allowMultiple = false }) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState(() => new Set());

  const toggle = (index) => {
    setOpenIds((current) => {
      const next = allowMultiple ? new Set(current) : new Set();
      if (current.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="divide-y divide-stone-200 rounded-card border border-stone-200 bg-white">
      {items.map((item, index) => {
        const isOpen = openIds.has(index);
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        const title = item.question ?? item.title;
        const content = item.answer ?? item.content;

        return (
          <div key={title}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-ink-800 hover:bg-stone-50"
              >
                {title}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-ink-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 pb-4 text-sm text-ink-500"
              >
                {content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

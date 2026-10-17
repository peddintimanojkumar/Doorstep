import { useState } from "react";
import Button from "../common/Button";
import OptionGrid from "./OptionGrid";
import { formatCurrency } from "../../utils/formatCurrency";

/**
 * ServiceSelector
 * Step 1. A plain selection grid (see OptionGrid) rather than a form —
 * there's nothing to type, just a choice to confirm.
 */
export default function ServiceSelector({ catalog, value, onSelect }) {
  const [selected, setSelected] = useState(value);

  const options = catalog.map((service) => ({
    value: service.slug,
    label: service.name,
    description:
      service.startingPrice != null
        ? `From ${formatCurrency(service.startingPrice)}`
        : "Price on request",
  }));

  return (
    <div>
      <h2 className="text-2xl">What do you need help with?</h2>
      <p className="mt-1 text-sm text-ink-500">
        Choose a service to get started.
      </p>

      <div className="mt-6 max-h-[28rem] overflow-y-auto pr-1">
        <OptionGrid
          options={options}
          value={selected}
          onChange={setSelected}
          ariaLabel="Choose a service"
        />
      </div>

      <div className="mt-8 flex gap-3">
        <Button disabled={!selected} onClick={() => onSelect(selected)}>
          Continue
        </Button>
      </div>
    </div>
  );
}

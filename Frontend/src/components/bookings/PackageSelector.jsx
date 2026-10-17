import { useState } from "react";
import Button from "../common/Button";
import OptionGrid from "./OptionGrid";
import { formatPackagePrice } from "../../utils/formatCurrency";

/** Step 2 (only shown when the chosen service has packages). */
export default function PackageSelector({ service, value, onNext, onBack }) {
  const [selected, setSelected] = useState(value);

  const options = service.packages.map((pkg) => ({
    value: pkg.name,
    label: pkg.name,
    description: formatPackagePrice(pkg),
  }));

  return (
    <div>
      <h2 className="text-2xl">Choose a package</h2>
      <p className="mt-1 text-sm text-ink-500">
        Pricing shown is indicative — confirmed before the job begins.
      </p>

      <div className="mt-6">
        <OptionGrid
          options={options}
          value={selected}
          onChange={setSelected}
          ariaLabel="Choose a package"
        />
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button disabled={!selected} onClick={() => onNext(selected)}>
          Continue
        </Button>
      </div>
    </div>
  );
}

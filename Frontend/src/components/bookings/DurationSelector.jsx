import { useState } from "react";
import Button from "../common/Button";
import OptionGrid from "./OptionGrid";
import { getDurationOptions } from "../../utils/durationOptions";

export default function DurationSelector({ service, value, onNext, onBack }) {
  const options = getDurationOptions(service.duration?.bucket);
  const [selected, setSelected] = useState(
    value || (options.length === 1 ? options[0].value : ""),
  );

  return (
    <div>
      <h2 className="text-2xl">How long do you need the professional?</h2>
      <p className="mt-1 text-sm text-ink-500">
        A rough estimate is fine — you can adjust this with your professional.
      </p>

      <div className="mt-6">
        <OptionGrid
          options={options}
          value={selected}
          onChange={setSelected}
          ariaLabel="Choose a duration"
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

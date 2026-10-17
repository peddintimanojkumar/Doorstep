import { useState } from "react";
import Button from "../common/Button";
import OptionGrid from "./OptionGrid";
import { timeSlots } from "../../utils/timeSlots";

export default function TimeSelector({ value, onNext, onBack }) {
  const [selected, setSelected] = useState(value);

  return (
    <div>
      <h2 className="text-2xl">Choose a time</h2>
      <p className="mt-1 text-sm text-ink-500">
        Professionals are typically available between 8 AM and 8 PM.
      </p>

      <div className="mt-6">
        <OptionGrid
          options={timeSlots}
          value={selected}
          onChange={setSelected}
          ariaLabel="Choose a time"
          columns="sm:grid-cols-3 lg:grid-cols-4"
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

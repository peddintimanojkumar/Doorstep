import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../common/Button";
import { dateSchema } from "../../utils/bookingSchemas";

const todayIso = () => new Date().toISOString().slice(0, 10);

export default function DateSelector({ value, onNext, onBack }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dateSchema),
    defaultValues: { date: value || "" },
  });

  return (
    <form onSubmit={handleSubmit((data) => onNext(data.date))} noValidate>
      <h2 className="text-2xl">Choose a date</h2>
      <p className="mt-1 text-sm text-ink-500">
        Pick a date that works for you.
      </p>

      <div className="mt-6 max-w-xs">
        <label
          htmlFor="booking-date"
          className="mb-1.5 block text-sm text-ink-600"
        >
          Date
        </label>
        <input
          id="booking-date"
          type="date"
          min={todayIso()}
          {...register("date")}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? "booking-date-error" : undefined}
          className="w-full rounded-control border border-stone-300 px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fern-200"
        />
        {errors.date && (
          <p id="booking-date-error" className="mt-1.5 text-sm text-red-600">
            {errors.date.message}
          </p>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}

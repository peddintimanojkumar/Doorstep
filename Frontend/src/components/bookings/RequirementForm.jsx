import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../common/Button";
import { requirementsSchema } from "../../utils/bookingSchemas";

export default function RequirementForm({ value, onNext, onBack }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(requirementsSchema),
    defaultValues: { notes: value || "" },
  });
  const notes = watch("notes") ?? "";

  return (
    <form
      onSubmit={handleSubmit((data) => onNext(data.notes ?? ""))}
      noValidate
    >
      <h2 className="text-2xl">Anything else we should know?</h2>
      <p className="mt-1 text-sm text-ink-500">
        Optional — share specific instructions for your professional.
      </p>

      <div className="mt-6 max-w-xl">
        <label
          htmlFor="req-notes"
          className="mb-1.5 block text-sm text-ink-600"
        >
          Additional requirements
        </label>
        <textarea
          id="req-notes"
          rows={5}
          {...register("notes")}
          aria-invalid={Boolean(errors.notes)}
          aria-describedby="req-notes-hint"
          className="w-full rounded-control border border-stone-300 px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fern-200"
        />
        <p
          id="req-notes-hint"
          className={`mt-1.5 text-xs ${errors.notes ? "text-red-600" : "text-ink-400"}`}
        >
          {errors.notes?.message ?? `${notes.length}/500`}
        </p>
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

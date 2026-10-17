import Button from "../common/Button";
import { formatCurrency, formatPackagePrice } from "../../utils/formatCurrency";
import { getDurationOptions } from "../../utils/durationOptions";
import {
  formatBookingDate,
  formatBookingTime,
} from "../../utils/bookingFormatters";

/** Step: Review. Read-only summary of every choice made so far. */
export default function BookingSummary({
  service,
  draft,
  onConfirm,
  onBack,
  isSubmitting = false,
}) {
  const pkg = service.packages.find((item) => item.name === draft.packageName);
  const durationLabel =
    getDurationOptions(service.duration?.bucket).find(
      (option) => option.value === draft.duration,
    )?.label ?? draft.duration;

  const priceLine = pkg
    ? formatPackagePrice(pkg)
    : service.startingPrice != null
      ? `From ${formatCurrency(service.startingPrice)}`
      : "On request";

  const rows = [
    { label: "Service", value: service.name },
    pkg && { label: "Package", value: pkg.name },
    { label: "Date", value: formatBookingDate(draft.date) },
    { label: "Time", value: formatBookingTime(draft.time) },
    { label: "Duration", value: durationLabel },
    {
      label: "Address",
      value: [draft.address, draft.landmark, draft.city, draft.pincode]
        .filter(Boolean)
        .join(", "),
    },
    draft.notes && { label: "Notes", value: draft.notes },
  ].filter(Boolean);

  return (
    <div>
      <h2 className="text-2xl">Review your booking</h2>
      <p className="mt-1 text-sm text-ink-500">
        Check the details below before confirming.
      </p>

      <div className="mt-6 max-w-xl rounded-card border border-stone-200 bg-white">
        <dl className="divide-y divide-stone-100">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-4 px-5 py-3.5 text-sm"
            >
              <dt className="shrink-0 text-ink-500">{row.label}</dt>
              <dd className="text-right text-ink-800">{row.value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex items-center justify-between border-t border-stone-200 px-5 py-4">
          <span className="text-sm text-ink-500">Indicative price</span>
          <span className="font-display text-lg text-ink-800">{priceLine}</span>
        </div>
      </div>

      <p className="mt-4 max-w-xl text-xs text-ink-400">
        This is an indicative price. The final amount is confirmed with your
        professional before the job begins.
      </p>

      <div className="mt-8 flex gap-3">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onConfirm} disabled={isSubmitting}>
          {isSubmitting ? "Saving Booking..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
}

import { Calendar, Clock, MapPin, User } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  formatBookingDate,
  formatBookingTime,
} from "../../utils/bookingFormatters";

/**
 * JobCard
 * One job/request summary from the professional's side — same shape of
 * information as the customer's BookingCard, but with the customer's name
 * instead of a "View service" link, and a flexible `children` slot for
 * actions (Accept/Decline on Requests, "Mark as completed" on Jobs).
 */
export default function JobCard({ job, children }) {
  return (
    <div className="rounded-card border border-stone-200 bg-white p-5 shadow-rest">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-sans text-base font-semibold text-ink-800">
            {job.serviceName}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-500">
            <User className="h-3.5 w-3.5" aria-hidden="true" />
            {job.customerName}
          </p>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <dl className="mt-4 space-y-1.5 text-sm text-ink-500">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
          {formatBookingDate(job.date)}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
          {formatBookingTime(job.time)} · {job.duration}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          {[job.address, job.city].filter(Boolean).join(", ")}
        </div>
      </dl>

      <p className="mt-4 font-display text-lg text-ink-800">
        {formatCurrency(job.price)}
      </p>

      {children && <div className="mt-4 flex flex-wrap gap-3">{children}</div>}
    </div>
  );
}

import { Calendar, Clock, MapPin } from "lucide-react";
import Button from "../common/Button";
import StatusBadge from "./StatusBadge";
import {
  formatBookingDate,
  formatBookingTime,
} from "../../utils/bookingFormatters";
import { ROUTES } from "../../constants/routes";

/**
 * BookingCard
 * One booking summary — used on both the dashboard overview and the full
 * Bookings list. `onCancel` is optional; the Cancel action only shows for
 * upcoming bookings and only when a handler is actually passed in.
 */
export default function BookingCard({ booking, onCancel }) {
  const canCancel = booking.status === "upcoming" && Boolean(onCancel);

  return (
    <div className="rounded-card border border-stone-200 bg-white p-5 shadow-rest">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-sans text-base font-semibold text-ink-800">
            {booking.serviceName}
          </p>
          {booking.packageName && (
            <p className="text-sm text-ink-500">{booking.packageName}</p>
          )}
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <dl className="mt-4 space-y-1.5 text-sm text-ink-500">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
          {formatBookingDate(booking.date)}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
          {formatBookingTime(booking.time)}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          {[booking.address, 
          booking.city, booking.state,
           booking.pincode]
            .filter(Boolean)
            .join(", ") || "Address not available"}
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button
          to={ROUTES.serviceDetails(booking.serviceSlug)}
          variant="secondary"
          size="sm"
        >
          View service
        </Button>
        {canCancel && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCancel(booking.id)}
          >
            Cancel booking
          </Button>
        )}
      </div>
    </div>
  );
}

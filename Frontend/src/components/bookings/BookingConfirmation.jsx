import { CircleCheckBig } from "lucide-react";
import Button from "../common/Button";
import {
  formatBookingDate,
  formatBookingTime,
} from "../../utils/bookingFormatters";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";

/** Terminal screen shown after a successful booking submission. */
export default function BookingConfirmation({ confirmation, service, draft }) {
  const { isAuthenticated } = useAuth();

  const bookingsDestination = isAuthenticated
    ? ROUTES.DASHBOARD_BOOKINGS
    : ROUTES.LOGIN;

  return (
    <div className="mx-auto max-w-lg text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-fern-50 text-fern-700">
        <CircleCheckBig className="h-8 w-8" aria-hidden="true" />
      </span>

      <h2 className="mt-5 text-2xl">Booking confirmed</h2>

      <p className="mt-2 text-sm text-ink-500">
        Your booking reference is{" "}
        <span className="font-medium text-ink-800">{confirmation.id}</span>.
        We’ll match you with a verified professional and share updates as your
        booking progresses.
      </p>

      <div className="mt-6 rounded-card border border-stone-200 bg-stone-50 p-5 text-left text-sm">
        <p className="font-medium text-ink-800">{service?.name}</p>
        <p className="mt-1 text-ink-500">
          {formatBookingDate(draft.date)} · {formatBookingTime(draft.time)}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to={bookingsDestination}>View my bookings</Button>

        <Button to={ROUTES.HOME} variant="secondary">
          Back to home
        </Button>
      </div>
    </div>
  );
}

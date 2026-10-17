import { useState } from "react";
import ChipGroup from "../../components/common/ChipGroup";
import Skeleton from "../../components/common/Skeleton";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import BookingCard from "../../components/dashboard/BookingCard";
import { useBookings } from "../../hooks/useBookings";
import { usePageMeta } from "../../hooks/usePageMeta";
import brand from "../../config/brand";

const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function CustomerBookings() {
  usePageMeta({ title: `Your bookings — ${brand.name}` });

  const { bookings, isPending, isError, refetch, cancelBooking } =
    useBookings();
  const [status, setStatus] = useState("");

  const visible = status
    ? bookings.filter((booking) => booking.status === status)
    : bookings;

  return (
    <div className="p-6 sm:p-10">
      <h1 className="text-2xl">Your bookings</h1>
      <p className="mt-1 text-sm text-ink-500">
        Every booking you’ve made, in one place.
      </p>

      <div className="mt-6">
        <ChipGroup
          options={STATUS_FILTERS}
          value={status}
          onChange={setStatus}
          ariaLabel="Filter bookings by status"
        />
      </div>

      <div className="mt-6">
        {isPending ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="h-44" />
            ))}
          </div>
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : visible.length === 0 ? (
          <EmptyState
            title="No bookings here"
            description="Try a different filter, or check back after your next booking."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={cancelBooking}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

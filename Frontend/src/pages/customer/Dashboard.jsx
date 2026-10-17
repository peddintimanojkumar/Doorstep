import { CalendarClock, CircleCheck, CircleX, Zap } from "lucide-react";
import Button from "../../components/common/Button";
import Skeleton from "../../components/common/Skeleton";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import StatCard from "../../components/dashboard/StatCard";
import BookingCard from "../../components/dashboard/BookingCard";
import { useBookings } from "../../hooks/useBookings";
import { useAuth } from "../../hooks/useAuth";
import { usePageMeta } from "../../hooks/usePageMeta";
import { ROUTES } from "../../constants/routes";
import brand from "../../config/brand";

export default function CustomerDashboard() {
  usePageMeta({ title: `Your dashboard — ${brand.name}` });

  const { session } = useAuth();
  const { bookings, isPending, isError, refetch, cancelBooking } =
    useBookings();

  if (isPending) {
    return (
      <div className="p-6 sm:p-10">
        <Skeleton className="h-8 w-56" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-28" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 sm:p-10">
        <ErrorState onRetry={refetch} />
      </div>
    );
  }

  const counts = {
    upcoming: bookings.filter((b) => b.status === "upcoming").length,
    active: bookings.filter((b) => b.status === "active").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const nextUpcoming = bookings.find((b) => b.status === "upcoming");
  const recent = bookings.slice(0, 3);

  return (
    <div className="p-6 sm:p-10">
      <h1 className="text-2xl">
        Welcome back{session?.name ? `, ${session.name}` : ""}
      </h1>

      <p className="mt-1 text-sm text-ink-500">
        Here’s a quick look at your bookings.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={CalendarClock}
          label="Upcoming Booking"
          value={counts.upcoming}
          accent="fern"
        />

        <StatCard
          icon={Zap}
          label="Active Service"
          value={counts.active}
          accent="marigold"
        />

        <StatCard
          icon={CircleCheck}
          label="Completed Services"
          value={counts.completed}
          accent="fern"
        />

        <StatCard
          icon={CircleX}
          label="Cancelled Services"
          value={counts.cancelled}
          accent="ink"
        />
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-ink-800">
          Your next booking
        </h2>

        <div className="mt-4 max-w-md">
          {nextUpcoming ? (
            <BookingCard booking={nextUpcoming} onCancel={cancelBooking} />
          ) : (
            <EmptyState
              title="No upcoming bookings"
              description="When you book a service, it'll show up here."
              action={<Button to={ROUTES.SERVICES}>Browse services</Button>}
            />
          )}
        </div>
      </div>

      {recent.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink-800">
              Recent bookings
            </h2>

            <Button to={ROUTES.DASHBOARD_BOOKINGS} variant="ghost" size="sm">
              View all
            </Button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={cancelBooking}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

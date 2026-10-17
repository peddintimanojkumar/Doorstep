import { Briefcase, CalendarCheck, Users, Wallet } from "lucide-react";
import StatCard from "../../components/dashboard/StatCard";
import DataTable from "../../components/dashboard/DataTable";
import MiniBarChart from "../../components/dashboard/MiniBarChart";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  customers,
  professionals,
  platformBookings,
  payments,
} from "../../data/admin";
import { formatCurrency } from "../../utils/formatCurrency";
import brand from "../../config/brand";

// Groups bookings by calendar month (oldest to newest among the mock
// records) for the chart below — a simple, honest summary of the seed
// data, not a live analytics pipeline.
function bookingsByMonth(bookings) {
  const counts = new Map();
  for (const booking of bookings) {
    const date = new Date(`${booking.date}T00:00:00`);
    const key = date.toLocaleDateString(undefined, { month: "short" });
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts, ([label, value]) => ({ label, value }));
}

function topServicesByBookings(bookings) {
  const counts = new Map();
  for (const booking of bookings) {
    counts.set(booking.serviceName, (counts.get(booking.serviceName) ?? 0) + 1);
  }
  return Array.from(counts, ([serviceName, bookingCount]) => ({
    serviceName,
    bookingCount,
  }))
    .sort((a, b) => b.bookingCount - a.bookingCount)
    .slice(0, 5);
}

export default function AdminReports() {
  usePageMeta({ title: `Reports — ${brand.name} Admin` });

  const totalRevenue = payments
    .filter((payment) => payment.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0);
  const monthly = bookingsByMonth(platformBookings);
  const topServices = topServicesByBookings(platformBookings);

  const columns = [
    { key: "serviceName", label: "Service" },
    { key: "bookingCount", label: "Bookings" },
  ];

  return (
    <div className="p-6 sm:p-10">
      <h1 className="text-2xl">Reports</h1>
      <p className="mt-1 text-sm text-ink-500">
        A summary view of platform activity.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total Customers"
          value={customers.length}
          accent="fern"
        />
        <StatCard
          icon={Briefcase}
          label="Total Professionals"
          value={professionals.length}
          accent="fern"
        />
        <StatCard
          icon={CalendarCheck}
          label="Total Bookings"
          value={platformBookings.length}
          accent="marigold"
        />
        <StatCard
          icon={Wallet}
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          accent="ink"
        />
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-ink-800">
          Bookings by month
        </h2>
        <div className="mt-4">
          <MiniBarChart data={monthly} />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-ink-800">
          Top services by bookings
        </h2>
        <div className="mt-4">
          <DataTable columns={columns} rows={topServices} />
        </div>
      </div>
    </div>
  );
}

import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Eye,
  FileText,
  MoreVertical,
  PieChart,
  TrendingUp,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { usePageMeta } from "../../hooks/usePageMeta";
import brand from "../../config/brand";

const RECENT_BOOKINGS = [
  {
    id: "BK-2003",
    customer: "Meera Iyer",
    service: "Pet Care",
    date: "9 Oct 2026",
    time: "10:00 AM",
    status: "Upcoming",
    initial: "M",
  },
  {
    id: "BK-2001",
    customer: "Ananya Rao",
    service: "Home Cleaning",
    date: "7 Oct 2026",
    time: "02:00 PM",
    status: "Upcoming",
    initial: "A",
  },
  {
    id: "BK-2002",
    customer: "Rahul Nair",
    service: "Plumbing",
    date: "6 Oct 2026",
    time: "11:00 AM",
    status: "Upcoming",
    initial: "R",
  },
  {
    id: "BK-2004",
    customer: "Vikram Shah",
    service: "Elder Care",
    date: "5 Oct 2026",
    time: "03:00 PM",
    status: "Active",
    initial: "V",
  },
  {
    id: "BK-2005",
    customer: "Sneha Gupta",
    service: "Electrical",
    date: "4 Oct 2026",
    time: "10:00 AM",
    status: "Completed",
    initial: "S",
  },
];

const RECENT_PAYMENTS = [
  {
    id: "PAY-5010",
    customer: "Rahul Nair",
    amount: "₹300",
    method: "Card",
    date: "9 Oct 2026",
    status: "Success",
    initial: "R",
  },
  {
    id: "PAY-5009",
    customer: "Ananya Rao",
    amount: "₹500",
    method: "UPI",
    date: "7 Oct 2026",
    status: "Success",
    initial: "A",
  },
  {
    id: "PAY-5003",
    customer: "Sneha Gupta",
    amount: "₹250",
    method: "UPI",
    date: "6 Oct 2026",
    status: "Success",
    initial: "S",
  },
  {
    id: "PAY-5006",
    customer: "Farhan Ahmed",
    amount: "₹450",
    method: "UPI",
    date: "5 Oct 2026",
    status: "Success",
    initial: "F",
  },
  {
    id: "PAY-5001",
    customer: "Priya Menon",
    amount: "₹150",
    method: "Card",
    date: "4 Oct 2026",
    status: "Success",
    initial: "P",
  },
];

const BAR_DATA = [
  16, 19, 11, 15, 14, 5, 18, 27, 17, 21, 8, 14, 7, 11, 10, 17, 15, 16, 19, 21,
  20, 16, 29, 15, 10, 18, 26,
];

const SERVICE_DATA = [
  {
    name: "Home Cleaning",
    percentage: 28,
    value: 34,
    className: "bg-[#3285F5]",
  },
  {
    name: "Plumbing",
    percentage: 18,
    value: 22,
    className: "bg-[#27B979]",
  },
  {
    name: "Electrical",
    percentage: 15,
    value: 18,
    className: "bg-[#FFB52E]",
  },
  {
    name: "Elder Care",
    percentage: 12,
    value: 15,
    className: "bg-[#9A62DD]",
  },
  {
    name: "Pet Care",
    percentage: 10,
    value: 12,
    className: "bg-[#FF7952]",
  },
  {
    name: "Others",
    percentage: 17,
    value: 19,
    className: "bg-[#9998D5]",
  },
];

const REVENUE_DATA = [
  1.0, 1.5, 2.1, 1.7, 2.8, 2.0, 2.6, 2.2, 3.1, 2.3, 2.2, 3.0, 2.7, 3.8, 4.1,
  3.6, 4.5, 4.0, 4.7,
];

export default function AdminDashboard() {
  usePageMeta({
    title: `Admin Dashboard — ${brand.name}`,
  });

  const { session } = useAuth();

  const displayName = session?.name || "Manupeddinti";

  return (
    <div className="min-h-screen bg-[#F5F8FC]">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        {/* ===================================================
            PAGE HEADER
        =================================================== */}
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-[#647795]">
              Welcome back
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#102A54] sm:text-4xl">
              {displayName}
            </h1>

            <p className="mt-1 text-base text-[#5A6F90]">
              Here's what's happening on Doorstep today.
            </p>
          </div>

          <button
            type="button"
            className="flex h-12 items-center justify-between gap-6 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-[#243B60] shadow-sm hover:bg-slate-50"
          >
            <span className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-[#50627D]" />1 Oct 2026 - 31
              Oct 2026
            </span>

            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        {/* ===================================================
            KPI CARDS
        =================================================== */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            icon={Users}
            value="10"
            label="Total Customers"
            growth="+12%"
            iconClass="bg-[#E4F0FF] text-[#1670E8]"
            growthClass="text-green-600"
          />

          <KpiCard
            icon={BriefcaseBusiness}
            value="10"
            label="Total Professionals"
            growth="+8%"
            iconClass="bg-[#E2F8EC] text-[#20A968]"
            growthClass="text-green-600"
          />

          <KpiCard
            icon={CalendarDays}
            value="12"
            label="Total Bookings"
            growth="+20%"
            iconClass="bg-[#F0E9FF] text-[#7A3FE2]"
            growthClass="text-green-600"
          />

          <KpiCard
            icon={Wallet}
            value="₹3,450"
            label="Total Revenue"
            growth="+18%"
            iconClass="bg-[#FFF0D9] text-[#F28B00]"
            growthClass="text-green-600"
          />
        </div>

        {/* ===================================================
            CHARTS
        =================================================== */}
        <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_1.1fr_1fr]">
          <BookingsOverview />

          <ServiceDistribution />

          <RevenueOverview />
        </div>

        {/* ===================================================
            TABLES
        =================================================== */}
        <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_1fr]">
          <RecentBookings />

          <RecentPayments />
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   KPI CARD
============================================================= */

function KpiCard({ icon: Icon, value, label, growth, iconClass, growthClass }) {
  return (
    <div className="group flex min-h-[104px] items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div
          className={[
            "flex h-16 w-16 shrink-0 items-center justify-center rounded-full",
            iconClass,
          ].join(" ")}
        >
          <Icon className="h-8 w-8" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-[#102A54]">{value}</p>

            <span
              className={[
                "hidden items-center gap-1 text-xs font-semibold sm:flex",
                growthClass,
              ].join(" ")}
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
              {growth}
            </span>
          </div>

          <p className="mt-1 text-sm text-[#5A6F90]">{label}</p>
        </div>
      </div>

      <ChevronRight className="h-6 w-6 text-[#1268E8] transition group-hover:translate-x-1" />
    </div>
  );
}

/* =============================================================
   BOOKINGS OVERVIEW
============================================================= */

function BookingsOverview() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <ChartHeader icon={CalendarDays} title="Bookings Overview" />

      <div className="mt-5 h-[205px]">
        <div className="relative flex h-full">
          {/* Y axis */}
          <div className="flex w-8 flex-col justify-between pb-7 text-xs text-slate-400">
            <span>40</span>
            <span>30</span>
            <span>20</span>
            <span>10</span>
            <span>0</span>
          </div>

          {/* Chart */}
          <div className="relative flex min-w-0 flex-1 flex-col">
            <div className="absolute inset-x-0 top-0 bottom-7 flex flex-col justify-between">
              {[40, 30, 20, 10, 0].map((value) => (
                <div key={value} className="border-t border-slate-100" />
              ))}
            </div>

            <div className="relative z-10 flex h-full items-end justify-between gap-[3px] pb-7">
              {BAR_DATA.map((value, index) => (
                <div key={index} className="flex h-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-[2px] bg-[#5B9BEF] transition hover:bg-[#1268E8]"
                    style={{
                      height: `${(value / 40) * 100}%`,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[11px] text-slate-400">
              <span>Oct 1</span>
              <span>Oct 7</span>
              <span>Oct 14</span>
              <span>Oct 21</span>
              <span>Oct 28</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   SERVICE DISTRIBUTION
============================================================= */

function ServiceDistribution() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <ChartHeader icon={PieChart} title="Service Category Distribution" />

      <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        <div className="relative h-44 w-44 shrink-0">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(#3285F5 0 28%, #27B979 28% 46%, #FFB52E 46% 61%, #9A62DD 61% 73%, #FF7952 73% 83%, #9998D5 83% 100%)",
            }}
          />

          <div className="absolute inset-[38px] flex flex-col items-center justify-center rounded-full bg-white shadow-inner">
            <span className="text-xl font-bold text-[#102A54]">120</span>

            <span className="mt-1 text-xs text-slate-500">Total Bookings</span>
          </div>
        </div>

        <div className="w-full space-y-3">
          {SERVICE_DATA.map((service) => (
            <div key={service.name} className="flex items-center gap-2 text-xs">
              <span
                className={[
                  "h-2.5 w-2.5 shrink-0 rounded-full",
                  service.className,
                ].join(" ")}
              />

              <span className="min-w-0 flex-1 truncate text-[#31476A]">
                {service.name}
              </span>

              <span className="font-semibold text-[#263B5B]">
                {service.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   REVENUE OVERVIEW
============================================================= */

function RevenueOverview() {
  const points = REVENUE_DATA.map((value, index) => {
    const x = (index / (REVENUE_DATA.length - 1)) * 100;
    const y = 100 - (value / 5) * 100;

    return `${x},${y}`;
  }).join(" ");

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <ChartHeader icon={BarChart3} title="Revenue Overview" />

      <div className="mt-3">
        <div className="flex items-end gap-3">
          <p className="text-3xl font-bold text-[#102A54]">₹3,450</p>

          <span className="mb-1 flex items-center gap-1 text-xs font-semibold text-green-600">
            <TrendingUp className="h-3.5 w-3.5" />
            +18%
          </span>
        </div>

        <p className="mt-1 text-sm text-[#5A6F90]">Total Revenue</p>
      </div>

      <div className="relative mt-4 h-[120px]">
        <div className="absolute inset-0 flex flex-col justify-between">
          {[6, 4, 2, 0].map((value) => (
            <div key={value} className="flex items-center gap-2">
              <span className="w-5 text-[10px] text-slate-400">{value}K</span>

              <div className="h-px flex-1 bg-slate-100" />
            </div>
          ))}
        </div>

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute bottom-5 left-8 right-0 h-[90px] w-[calc(100%-32px)]"
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#79D69D" stopOpacity="0.35" />

              <stop offset="100%" stopColor="#79D69D" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          <polygon
            points={`0,100 ${points} 100,100`}
            fill="url(#revenueGradient)"
          />

          <polyline
            points={points}
            fill="none"
            stroke="#25A969"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="absolute bottom-0 left-8 right-0 flex justify-between text-[10px] text-slate-400">
          <span>Oct 1</span>
          <span>Oct 7</span>
          <span>Oct 14</span>
          <span>Oct 21</span>
          <span>Oct 28</span>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   RECENT BOOKINGS
============================================================= */

function RecentBookings() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <TableHeader
        icon={CalendarDays}
        title="Recent Bookings"
        link="/admin/bookings"
      />

      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full">
          <thead>
            <tr className="bg-[#F7F9FC] text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-3 py-3">#</th>
              <th className="px-3 py-3">Customer</th>
              <th className="px-3 py-3">Service</th>
              <th className="px-3 py-3">Date & Time</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {RECENT_BOOKINGS.map((booking) => (
              <tr
                key={booking.id}
                className="text-xs text-[#31476A] hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-3 py-3">{booking.id}</td>

                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar initial={booking.initial} />

                    <span className="font-medium text-[#263B5B]">
                      {booking.customer}
                    </span>
                  </div>
                </td>

                <td className="whitespace-nowrap px-3 py-3">
                  {booking.service}
                </td>

                <td className="whitespace-nowrap px-3 py-3">
                  <p>{booking.date}</p>
                  <p className="text-[11px] text-slate-400">{booking.time}</p>
                </td>

                <td className="px-3 py-3">
                  <StatusBadge status={booking.status} />
                </td>

                <td className="px-3 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#263B5B] hover:bg-slate-100"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#263B5B] hover:bg-slate-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* =============================================================
   RECENT PAYMENTS
============================================================= */

function RecentPayments() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <TableHeader
        icon={CreditCard}
        title="Recent Payments"
        link="/admin/payments"
      />

      <div className="overflow-x-auto">
        <table className="min-w-[650px] w-full">
          <thead>
            <tr className="bg-[#F7F9FC] text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-3 py-3">#</th>
              <th className="px-3 py-3">Customer</th>
              <th className="px-3 py-3">Amount</th>
              <th className="px-3 py-3">Method</th>
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {RECENT_PAYMENTS.map((payment) => (
              <tr
                key={payment.id}
                className="text-xs text-[#31476A] hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-3 py-3">{payment.id}</td>

                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar initial={payment.initial} />

                    <span className="font-medium text-[#263B5B]">
                      {payment.customer}
                    </span>
                  </div>
                </td>

                <td className="whitespace-nowrap px-3 py-3 font-semibold text-[#263B5B]">
                  {payment.amount}
                </td>

                <td className="whitespace-nowrap px-3 py-3">
                  {payment.method}
                </td>

                <td className="whitespace-nowrap px-3 py-3">{payment.date}</td>

                <td className="px-3 py-3">
                  <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-600">
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* =============================================================
   HEADERS
============================================================= */

function ChartHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-[#123B78]" />

        <h2 className="text-base font-bold text-[#102A54]">{title}</h2>
      </div>

      <button
        type="button"
        className="hidden items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-[#31476A] hover:bg-slate-50 sm:flex"
      >
        This Month
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function TableHeader({ icon: Icon, title, link }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-[#123B78]" />

        <h2 className="text-base font-bold text-[#102A54]">{title}</h2>
      </div>

      <a
        href={link}
        className="text-sm font-semibold text-[#1268E8] hover:text-[#012663]"
      >
        View all
      </a>
    </div>
  );
}

/* =============================================================
   SMALL COMPONENTS
============================================================= */

function Avatar({ initial }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E4F0FF] text-xs font-semibold text-[#1268E8]">
      {initial}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Upcoming: "bg-[#E7F1FF] text-[#1268E8]",
    Active: "bg-[#E5F8ED] text-green-600",
    Completed: "bg-[#E5F8ED] text-green-600",
  };

  return (
    <span
      className={[
        "inline-flex rounded-full px-3 py-1 text-[11px] font-semibold",
        styles[status] || "bg-slate-100 text-slate-600",
      ].join(" ")}
    >
      {status}
    </span>
  );
}

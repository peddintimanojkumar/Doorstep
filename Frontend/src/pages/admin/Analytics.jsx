import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  IndianRupee,
  Users,
} from "lucide-react";

import { usePageMeta } from "../../hooks/usePageMeta";
import brand from "../../config/brand";

const MONTHS = [
  { month: "May", bookings: 38, revenue: 8200 },
  { month: "Jun", bookings: 46, revenue: 10400 },
  { month: "Jul", bookings: 54, revenue: 12800 },
  { month: "Aug", bookings: 61, revenue: 14500 },
  { month: "Sep", bookings: 72, revenue: 17200 },
  { month: "Oct", bookings: 84, revenue: 21400 },
];

const SERVICES = [
  { name: "Home Cleaning", bookings: 42, percentage: 28 },
  { name: "Plumbing", bookings: 27, percentage: 18 },
  { name: "Electrical", bookings: 23, percentage: 15 },
  { name: "Elder Care", bookings: 18, percentage: 12 },
  { name: "Pet Care", bookings: 15, percentage: 10 },
];

export default function AdminAnalytics() {
  usePageMeta({
    title: `Analytics — ${brand.name} Admin`,
    description: "Doorstep platform analytics and performance.",
  });

  const maxBookings = Math.max(...MONTHS.map((item) => item.bookings));

  return (
    <div className="min-h-screen bg-[#F5F8FC] p-5 sm:p-7 lg:p-10">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#1268E8]">
            Platform insights
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#012663]">Analytics</h1>

          <p className="mt-2 text-sm text-[#60728D]">
            Monitor Doorstep performance and business growth.
          </p>
        </div>

        <select className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-[#31476A] outline-none">
          <option>This Year</option>
          <option>Last 6 Months</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      {/* STATS */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          icon={CalendarDays}
          label="Total Bookings"
          value="355"
          change="+18%"
          positive
          iconClass="bg-[#EAF2FF] text-[#1268E8]"
        />

        <AnalyticsCard
          icon={IndianRupee}
          label="Total Revenue"
          value="₹84,500"
          change="+22%"
          positive
          iconClass="bg-orange-50 text-orange-500"
        />

        <AnalyticsCard
          icon={Users}
          label="Customers"
          value="1,248"
          change="+12%"
          positive
          iconClass="bg-green-50 text-green-600"
        />

        <AnalyticsCard
          icon={BarChart3}
          label="Completion Rate"
          value="91.4%"
          change="-2%"
          positive={false}
          iconClass="bg-purple-50 text-purple-600"
        />
      </div>

      {/* CHARTS */}
      <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_0.75fr]">
        {/* BOOKINGS */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#102A54]">
                Booking performance
              </h2>

              <p className="mt-1 text-sm text-[#60728D]">
                Monthly booking volume
              </p>
            </div>

            <BarChart3 className="h-5 w-5 text-[#1268E8]" />
          </div>

          <div className="mt-8 flex h-[280px] items-end gap-4 border-b border-l border-slate-200 px-4 pb-0">
            {MONTHS.map((item) => {
              const height = (item.bookings / maxBookings) * 220;

              return (
                <div
                  key={item.month}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >
                  <span className="mb-2 text-xs font-semibold text-[#31476A]">
                    {item.bookings}
                  </span>

                  <div
                    className="w-full max-w-[54px] rounded-t-xl bg-[#1268E8] transition hover:bg-[#023B91]"
                    style={{ height }}
                  />

                  <span className="mt-3 text-xs text-slate-500">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* TOP SERVICES */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#102A54]">Top services</h2>

          <p className="mt-1 text-sm text-[#60728D]">Most booked services</p>

          <div className="mt-7 space-y-5">
            {SERVICES.map((service, index) => (
              <div key={service.name}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF2FF] text-xs font-bold text-[#1268E8]">
                      {index + 1}
                    </span>

                    <span className="text-sm font-semibold text-[#31476A]">
                      {service.name}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-[#102A54]">
                    {service.bookings}
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#1268E8]"
                    style={{
                      width: `${service.percentage}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* REVENUE */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#102A54]">
              Revenue overview
            </h2>

            <p className="mt-1 text-sm text-[#60728D]">
              Revenue generated during the selected period
            </p>
          </div>

          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
            +22% growth
          </span>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {MONTHS.slice(-3).map((item) => (
            <div key={item.month} className="rounded-xl bg-[#F7FAFF] p-5">
              <p className="text-sm text-slate-500">{item.month}</p>

              <p className="mt-2 text-2xl font-bold text-[#012663]">
                ₹{item.revenue.toLocaleString("en-IN")}
              </p>

              <p className="mt-2 text-xs text-green-600">Revenue generated</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AnalyticsCard({
  icon: Icon,
  label,
  value,
  change,
  positive,
  iconClass,
}) {
  const ChangeIcon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div
          className={`flex items-center gap-1 text-xs font-semibold ${
            positive ? "text-green-600" : "text-red-500"
          }`}
        >
          <ChangeIcon className="h-4 w-4" />
          {change}
        </div>
      </div>

      <p className="mt-5 text-2xl font-bold text-[#012663]">{value}</p>

      <p className="mt-1 text-sm text-[#60728D]">{label}</p>
    </div>
  );
}

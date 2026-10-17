import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  MapPin,
  Star,
  Wallet,
  Wrench,
} from "lucide-react";

// import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
import Skeleton from "../../components/common/Skeleton";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

import { useProfessionalJobs } from "../../hooks/useProfessionalJobs";
import { useAuth } from "../../hooks/useAuth";
import { usePageMeta } from "../../hooks/usePageMeta";
import { formatCurrency } from "../../utils/formatCurrency";
import brand from "../../config/brand";
import { ROUTES } from "../../constants/routes";

export default function ProfessionalDashboard() {
  usePageMeta({
    title: `Professional Dashboard — ${brand.name}`,
  });

  const { session } = useAuth();

  const { jobs, isPending, isError, refetch, acceptJob, declineJob } =
    useProfessionalJobs();

  if (isPending) {
    return (
      <div className="p-5 sm:p-8">
        <Skeleton className="h-10 w-72" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-28 rounded-2xl" />
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

  const safeJobs = Array.isArray(jobs) ? jobs : [];

  const pending = safeJobs.filter((job) => job.status === "pending");

  const active = safeJobs.filter((job) => job.status === "active");

  const upcoming = safeJobs.filter((job) => job.status === "upcoming");

  const completed = safeJobs.filter((job) => job.status === "completed");

  const totalEarned = completed.reduce(
    (sum, job) => sum + Number(job.price || 0),
    0,
  );

  const scheduled = [...active, ...upcoming];

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#102A54] sm:text-4xl">
              Welcome back
              {session?.name ? `, ${session.name}` : ""}
            </h1>

            <p className="mt-2 text-base text-[#5A6F90]">
              Here's what's happening with your jobs today.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF4FF] text-[#1268E8]">
              <CalendarDays className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#102A54]">
                {formatToday()}
              </p>

              <p className="text-xs text-slate-500">Have a productive day!</p>
            </div>
          </div>
        </div>

        {/* =====================================================
            STAT CARDS
        ===================================================== */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ProfessionalStatCard
            icon={ClipboardList}
            value={pending.length}
            label="New Requests"
            iconClass="bg-[#EAF4FF] text-[#1268E8]"
            arrowClass="text-[#1268E8]"
          />

          <ProfessionalStatCard
            icon={BriefcaseBusiness}
            value={active.length}
            label="Active Jobs"
            iconClass="bg-[#E8F8ED] text-green-600"
            arrowClass="text-green-600"
          />

          <ProfessionalStatCard
            icon={CheckCircle2}
            value={completed.length}
            label="Completed Jobs"
            iconClass="bg-[#F0EBFF] text-violet-600"
            arrowClass="text-violet-600"
          />

          <ProfessionalStatCard
            icon={Wallet}
            value={formatCurrency(totalEarned)}
            label="Total Earned"
            iconClass="bg-[#FFF4DF] text-orange-500"
            arrowClass="text-orange-500"
          />
        </div>

        {/* =====================================================
            GET MORE BOOKINGS
        ===================================================== */}
        <section className="relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#DCEAFF] to-[#C7DDFA] px-6 py-6 sm:px-8">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl font-bold text-[#123B78]">
              Get more bookings
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#31598D] sm:text-base">
              Keep your profile updated, add your skills and availability to
              attract more customers.
            </p>

            <Link
              to={ROUTES.PROFESSIONAL_PROFILE}
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-[#012663] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#023B91]"
            >
              Update Profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="pointer-events-none absolute -bottom-12 right-8 hidden h-48 w-48 rounded-full bg-white/30 lg:block" />

          <div className="pointer-events-none absolute bottom-0 right-16 hidden text-[120px] font-bold leading-none text-[#0B4D9B]/20 lg:block">
            PRO
          </div>

          <div className="absolute right-8 top-5 hidden rounded-xl bg-white/80 px-6 py-4 shadow-sm lg:block">
            <div className="space-y-2.5">
              <ChecklistItem text="Verified Profile" />
              <ChecklistItem text="Add Services" />
              <ChecklistItem text="Set Your Availability" />
              <ChecklistItem text="Get More Bookings" />
            </div>
          </div>
        </section>

        {/* =====================================================
            REQUESTS + UPCOMING
        ===================================================== */}
        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          {/* New Requests */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={ClipboardList}
              title="New Requests"
              link={ROUTES.PROFESSIONAL_REQUESTS}
            />

            <div className="divide-y divide-slate-100 px-5">
              {pending.length === 0 ? (
                <div className="py-8">
                  <EmptyState
                    title="No new requests"
                    description="New job requests will appear here."
                  />
                </div>
              ) : (
                pending
                  .slice(0, 3)
                  .map((job) => (
                    <RequestRow
                      key={job.id}
                      job={job}
                      onAccept={() => acceptJob(job.id)}
                      onDecline={() => declineJob(job.id)}
                    />
                  ))
              )}
            </div>
          </section>

          {/* Today and Upcoming */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={CalendarDays}
              title="Today & Upcoming Jobs"
              link={ROUTES.PROFESSIONAL_JOBS}
            />

            <div className="px-5 pb-4">
              {scheduled.length === 0 ? (
                <div className="py-8">
                  <EmptyState
                    title="No jobs scheduled"
                    description="Accepted jobs will show up here."
                  />
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {scheduled.slice(0, 4).map((job, index) => (
                    <UpcomingJob key={job.id} job={job} first={index === 0} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* =====================================================
            RECENT EARNINGS + REVIEWS
        ===================================================== */}
        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          {/* Recent Earnings */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={CircleDollarSign}
              title="Recent Earnings"
              link={ROUTES.PROFESSIONAL_EARNINGS}
            />

            <div className="divide-y divide-slate-100 px-5">
              {completed.length === 0 ? (
                <div className="py-8">
                  <EmptyState
                    title="No completed jobs"
                    description="Your recent earnings will appear here."
                  />
                </div>
              ) : (
                completed
                  .slice(0, 4)
                  .map((job) => <EarningRow key={job.id} job={job} />)
              )}
            </div>
          </section>

          {/* Customer Reviews */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={Star}
              title="Customer Reviews"
              link={ROUTES.PROFESSIONAL_REVIEWS}
            />

            <div className="px-5 pb-6">
              <div className="flex gap-4 border-b border-slate-100 py-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-semibold text-[#102A54]">
                  S
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-[#102A54]">
                        Suresh Kumar
                      </p>

                      <p className="text-xs text-slate-500">25 Sep 2026</p>
                    </div>
                  </div>

                  <div className="mt-2 flex gap-1 text-orange-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-current" />
                    ))}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    “Great service, very professional and punctual. Highly
                    recommended!”
                  </p>
                </div>
              </div>

              <div className="pt-4 text-right">
                <Link
                  to={ROUTES.PROFESSIONAL_REVIEWS}
                  className="text-sm font-semibold text-[#1268E8] hover:text-[#012663]"
                >
                  View all reviews
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   STAT CARD
============================================================= */

function ProfessionalStatCard({
  icon: Icon,
  value,
  label,
  iconClass,
  arrowClass,
}) {
  return (
    <div className="group flex min-h-[108px] items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
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
          <p className="text-2xl font-bold text-[#102A54]">{value}</p>

          <p className="mt-1 text-sm text-[#50627D]">{label}</p>
        </div>
      </div>

      <ChevronRight
        className={[
          "h-6 w-6 transition group-hover:translate-x-1",
          arrowClass,
        ].join(" ")}
      />
    </div>
  );
}

/* =============================================================
   SECTION HEADER
============================================================= */

function SectionHeader({ icon: Icon, title, link }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-[#123B78]" />

        <h2 className="text-lg font-bold text-[#102A54]">{title}</h2>
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
   REQUEST ROW
============================================================= */

function RequestRow({ job, onAccept, onDecline }) {
  return (
    <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EAF4FF] text-[#1268E8]">
          <Wrench className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="truncate font-semibold text-[#102A54]">
            {job.serviceName}
          </p>

          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {job.city}
              {job.address ? `, ${job.address}` : ""}
            </span>

            <span className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(job.date)}, {formatTime(job.time)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={onAccept}
          className="rounded-lg bg-[#012663] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#023B91]"
        >
          Accept
        </button>

        <button
          type="button"
          onClick={onDecline}
          className="rounded-lg border border-[#C7D5E7] bg-white px-5 py-2.5 text-sm font-semibold text-[#102A54] transition hover:bg-slate-50"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

/* =============================================================
   UPCOMING JOB
============================================================= */

function UpcomingJob({ job, first }) {
  return (
    <div className="flex gap-3 py-3">
      <div className="flex w-[82px] shrink-0 items-start gap-2 pt-1">
        <span
          className={[
            "mt-1 h-3 w-3 rounded-full",
            first ? "bg-[#1268E8]" : "bg-green-500",
          ].join(" ")}
        />

        <span className="text-xs font-semibold text-[#31476A]">
          {formatTime(job.time)}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#1268E8]">
          <Wrench className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#102A54]">
            {job.serviceName}
          </p>

          <p className="mt-1 flex items-center gap-1 truncate text-xs text-slate-500">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {job.address}, {job.city}
          </p>
        </div>

        <span
          className={[
            "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
            job.status === "active"
              ? "bg-green-50 text-green-600"
              : "bg-[#EAF4FF] text-[#1268E8]",
          ].join(" ")}
        >
          {job.status === "active" ? "Confirmed" : "Upcoming"}
        </span>
      </div>
    </div>
  );
}

/* =============================================================
   EARNING ROW
============================================================= */

function EarningRow({ job }) {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF4FF] text-[#1268E8]">
        <Wrench className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#102A54]">
          {job.serviceName}
        </p>

        <p className="mt-1 text-xs text-slate-500">{formatDate(job.date)}</p>
      </div>

      <div className="text-right">
        <p className="text-sm font-bold text-[#102A54]">
          {formatCurrency(job.price || 0)}
        </p>

        <span className="mt-1 inline-flex rounded-full bg-green-50 px-3 py-1 text-[11px] font-medium text-green-600">
          Completed
        </span>
      </div>
    </div>
  );
}

/* =============================================================
   CHECKLIST
============================================================= */

function ChecklistItem({ text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1268E8] text-white">
        <CheckIcon />
      </span>

      <span className="text-sm font-semibold text-[#102A54]">{text}</span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="h-3 w-3"
    >
      <path d="m5 10 3 3 7-7" />
    </svg>
  );
}

/* =============================================================
   DATE / TIME
============================================================= */

function formatToday() {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());
}

function formatDate(value) {
  if (!value) return "Date unavailable";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatTime(value) {
  if (!value) return "Time unavailable";

  const parts = String(value).split(":");

  if (parts.length < 2) {
    return value;
  }

  const hours = Number(parts[0]);
  const minutes = Number(parts[1]);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return value;
  }

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

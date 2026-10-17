import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Play,
  Wrench,
} from "lucide-react";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/dashboard/StatusBadge";
import { ProfessionalPage } from "../../components/professional/ProfessionalPage";
import { useProfessionalJobs } from "../../hooks/useProfessionalJobs";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  formatBookingDate,
  formatBookingTime,
} from "../../utils/bookingFormatters";

const TABS = ["all", "upcoming", "active", "completed", "declined"];
export default function ProfessionalJobs() {
  const { jobs, isPending, isError, refetch, completeJob } =
    useProfessionalJobs();
  const [tab, setTab] = useState("all");
  const [busy, setBusy] = useState(null);
  const all = Array.isArray(jobs) ? jobs : [];
  const filtered =
    tab === "all" ? all : all.filter((job) => job.status === tab);
  async function complete(id) {
    setBusy(id);
    try {
      await completeJob(id);
    } finally {
      setBusy(null);
    }
  }
  return (
    <ProfessionalPage
      title="My Jobs"
      description="Track accepted, active and completed customer jobs from one place."
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {TABS.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${tab === item ? "bg-[#012663] text-white" : "bg-white text-slate-600 hover:bg-slate-100"}`}
          >
            {item}
          </button>
        ))}
      </div>
      {isPending && (
        <div className="rounded-2xl bg-white p-8 text-center text-sm text-slate-500">
          Loading jobs...
        </div>
      )}
      {isError && (
        <div className="rounded-2xl bg-white p-8 text-center">
          <p className="text-red-600">Unable to load jobs.</p>
          <Button className="mt-4" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      )}
      {!isPending && !isError && filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
          No jobs in this category.
        </div>
      )}
      <div className="grid gap-5 lg:grid-cols-2">
        {filtered.map((job) => (
          <article
            key={job.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-[#1268E8]" />
                  <h2 className="font-bold text-[#102A54]">
                    {job.serviceName}
                  </h2>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Customer: {job.customerName}
                </p>
              </div>
              <StatusBadge status={job.status} />
            </div>
            <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <p className="flex gap-2">
                <CalendarDays className="h-4 w-4 text-[#1268E8]" />
                {formatBookingDate(job.date)}
              </p>
              <p className="flex gap-2">
                <Clock3 className="h-4 w-4 text-[#1268E8]" />
                {formatBookingTime(job.time)} · {job.duration}
              </p>
              <p className="flex gap-2 sm:col-span-2">
                <MapPin className="h-4 w-4 text-[#1268E8]" />
                {job.address}, {job.city}
              </p>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <p className="text-xl font-bold text-[#102A54]">
                {formatCurrency(job.price || 0)}
              </p>
              {(job.status === "upcoming" || job.status === "active") && (
                <button
                  disabled={busy === job.id}
                  onClick={() => complete(job.id)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#012663] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#023B91] disabled:opacity-50"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Mark completed
                </button>
              )}
              {job.status === "completed" && (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Completed
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </ProfessionalPage>
  );
}

import { useState } from "react";
import { CalendarDays, Check, MapPin, X, Wrench } from "lucide-react";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/dashboard/StatusBadge";
import { ProfessionalPage } from "../../components/professional/ProfessionalPage";
import { useProfessionalJobs } from "../../hooks/useProfessionalJobs";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  formatBookingDate,
  formatBookingTime,
} from "../../utils/bookingFormatters";

export default function ProfessionalRequests() {
  const { jobs, isPending, isError, refetch, acceptJob, declineJob } =
    useProfessionalJobs();
  const [busy, setBusy] = useState(null);
  const pending = (Array.isArray(jobs) ? jobs : []).filter(
    (job) => job.status === "pending",
  );

  async function run(action, id) {
    setBusy(id);
    try {
      await action(id);
    } finally {
      setBusy(null);
    }
  }

  return (
    <ProfessionalPage
      title="New Requests"
      description="Review incoming service requests and decide which jobs you want to accept."
    >
      {isPending && (
        <div className="rounded-2xl bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
          Loading requests...
        </div>
      )}
      {isError && (
        <div className="rounded-2xl bg-white p-8 text-center">
          <p className="text-sm text-red-600">Unable to load requests.</p>
          <Button className="mt-4" size="sm" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      )}
      {!isPending && !isError && pending.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF4FF] text-[#1268E8]">
            <Check className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-[#102A54]">
            No new requests
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            You are all caught up. New customer requests will appear here.
          </p>
        </div>
      )}
      <div className="grid gap-5 lg:grid-cols-2">
        {pending.map((job) => (
          <article
            key={job.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#1268E8]">
                  <Wrench className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-bold text-[#102A54]">
                    {job.serviceName}
                  </h2>
                  <p className="text-sm text-slate-500">{job.customerName}</p>
                </div>
              </div>
              <StatusBadge status={job.status} />
            </div>
            <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <p className="flex gap-2">
                <CalendarDays className="h-4 w-4 text-[#1268E8]" />
                {formatBookingDate(job.date)}
              </p>
              <p className="flex gap-2">
                <Wrench className="h-4 w-4 text-[#1268E8]" />
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
              <div className="flex gap-2">
                <button
                  disabled={busy === job.id}
                  onClick={() => run(() => declineJob(job.id), job.id)}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                  Decline
                </button>
                <button
                  disabled={busy === job.id}
                  onClick={() => run(() => acceptJob(job.id), job.id)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#012663] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#023B91] disabled:opacity-50"
                >
                  <Check className="h-4 w-4" />
                  Accept
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ProfessionalPage>
  );
}

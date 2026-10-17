import {
  Banknote,
  CalendarDays,
  CircleDollarSign,
  TrendingUp,
} from "lucide-react";
import { ProfessionalPage } from "../../components/professional/ProfessionalPage";
import { useProfessionalJobs } from "../../hooks/useProfessionalJobs";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatBookingDate } from "../../utils/bookingFormatters";

export default function ProfessionalEarnings() {
  const { jobs = [], isPending } = useProfessionalJobs();
  const completed = (Array.isArray(jobs) ? jobs : []).filter(
    (job) => job.status === "completed",
  );
  const total = completed.reduce((sum, job) => sum + Number(job.price || 0), 0);
  const average = completed.length ? total / completed.length : 0;
  return (
    <ProfessionalPage
      title="Earnings"
      description="Review your completed work and current earnings summary."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: CircleDollarSign,
            label: "Total earned",
            value: formatCurrency(total),
          },
          {
            icon: TrendingUp,
            label: "Completed jobs",
            value: completed.length,
          },
          {
            icon: Banknote,
            label: "Average per job",
            value: formatCurrency(average),
          },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#1268E8]">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-2xl font-bold text-[#102A54]">{value}</p>
            <p className="mt-1 text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </div>
      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-bold text-[#102A54]">
            Completed earnings
          </h2>
        </div>
        {isPending ? (
          <p className="p-6 text-sm text-slate-500">Loading...</p>
        ) : completed.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-500">
            No completed jobs yet.
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {completed.map((job) => (
              <div
                key={job.id}
                className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
              >
                <div>
                  <p className="font-semibold text-[#102A54]">
                    {job.serviceName}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <CalendarDays className="h-4 w-4" />
                    {formatBookingDate(job.date)}
                  </p>
                </div>
                <p className="font-bold text-[#102A54]">
                  {formatCurrency(job.price || 0)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </ProfessionalPage>
  );
}

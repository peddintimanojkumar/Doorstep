import { CalendarDays, Clock3, MapPin, Wrench } from "lucide-react";
import StatusBadge from "../../components/dashboard/StatusBadge";
import { ProfessionalPage } from "../../components/professional/ProfessionalPage";
import { useProfessionalJobs } from "../../hooks/useProfessionalJobs";
import {
  formatBookingDate,
  formatBookingTime,
} from "../../utils/bookingFormatters";

export default function ProfessionalSchedule() {
  const { jobs = [], isPending } = useProfessionalJobs();
  const scheduled = (Array.isArray(jobs) ? jobs : [])
    .filter((job) => ["active", "upcoming"].includes(job.status))
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  return (
    <ProfessionalPage
      title="Schedule"
      description="See your upcoming appointments and active service commitments."
    >
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-lg font-bold text-[#102A54]">
            Upcoming schedule
          </h2>
        </div>
        {isPending ? (
          <p className="p-8 text-sm text-slate-500">Loading schedule...</p>
        ) : scheduled.length === 0 ? (
          <p className="p-10 text-center text-sm text-slate-500">
            No upcoming jobs.
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {scheduled.map((job) => (
              <div
                key={job.id}
                className="grid gap-4 px-5 py-5 md:grid-cols-[150px_minmax(0,1fr)_auto] md:items-center"
              >
                <div>
                  <p className="font-semibold text-[#102A54]">
                    {formatBookingDate(job.date)}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <Clock3 className="h-4 w-4" />
                    {formatBookingTime(job.time)}
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-2 font-semibold text-[#102A54]">
                    <Wrench className="h-4 w-4 text-[#1268E8]" />
                    {job.serviceName}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {job.customerName}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="h-4 w-4" />
                    {job.address}, {job.city}
                  </p>
                </div>
                <StatusBadge status={job.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </ProfessionalPage>
  );
}

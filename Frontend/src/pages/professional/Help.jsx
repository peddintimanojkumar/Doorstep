import { useState } from "react";
import {
  ChevronDown,
  CircleHelp,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { ProfessionalPage } from "../../components/professional/ProfessionalPage";

const faqs = [
  [
    "How do I accept a job?",
    "Open Requests, review the details, and select Accept. The request then moves to your upcoming jobs.",
  ],
  [
    "How do I mark a job completed?",
    "Open Jobs and select Mark completed for an active or upcoming job after the service is finished.",
  ],
  [
    "When are earnings updated?",
    "In this frontend demo, earnings are calculated from jobs marked completed. A real payment API can replace this later.",
  ],
  [
    "Where can I update my profile?",
    "Use Profile in the sidebar to update your name, contact details, service area and services offered.",
  ],
];
export default function ProfessionalHelp() {
  const [open, setOpen] = useState(0);
  return (
    <ProfessionalPage
      title="Help & Support"
      description="Find quick answers or choose a support option."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <Support
          icon={MessageCircle}
          title="Chat support"
          text="Get help with bookings and account questions."
        />
        <Support
          icon={Phone}
          title="Call support"
          text="Speak with the Doorstep support team."
        />
        <Support
          icon={Mail}
          title="Email support"
          text="Send a detailed request for assistance."
        />
      </div>
      <section className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5">
          <CircleHelp className="h-5 w-5 text-[#1268E8]" />
          <h2 className="text-lg font-bold text-[#102A54]">
            Frequently asked questions
          </h2>
        </div>
        {faqs.map(([q, a], i) => (
          <div key={q} className="border-b border-slate-100 last:border-0">
            <button
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <span className="font-semibold text-[#102A54]">{q}</span>
              <ChevronDown
                className={`h-5 w-5 text-slate-400 transition ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <p className="px-5 pb-5 text-sm leading-6 text-slate-600">{a}</p>
            )}
          </div>
        ))}
      </section>
    </ProfessionalPage>
  );
}
function Support({ icon: Icon, title, text }) {
  return (
    <button
      type="button"
      onClick={() =>
        alert(`${title} will be connected to the support backend.`)
      }
      className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#1268E8]">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="mt-4 font-bold text-[#102A54]">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-[#1268E8]">
        Contact support →
      </span>
    </button>
  );
}

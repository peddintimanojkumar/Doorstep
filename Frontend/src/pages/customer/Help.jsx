import {
  CircleHelp,
  Mail,
  MessageCircle,
  Phone,
  Search,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

import { usePageMeta } from "../../hooks/usePageMeta";
import brand from "../../config/brand";

const FAQS = [
  {
    question: "How do I book a service?",
    answer:
      "Open the Services page, choose the service you need, select your preferred package and continue through the booking steps.",
  },
  {
    question: "Where can I see my bookings?",
    answer:
      "Open Bookings from the customer dashboard to see your upcoming, active, completed and cancelled bookings.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Eligible upcoming bookings can be cancelled from the Bookings section.",
  },
  {
    question: "How do I update my profile?",
    answer:
      "Open Profile from the customer dashboard and update your personal information.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can use the support options on this page to contact the Doorstep support team.",
  },
];

export default function CustomerHelp() {
  usePageMeta({
    title: `Help & Support — ${brand.name}`,
  });

  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const visibleFaqs = FAQS.filter((faq) =>
    `${faq.question} ${faq.answer}`
      .toLowerCase()
      .includes(search.toLowerCase().trim()),
  );

  return (
    <div className="min-h-full p-5 sm:p-8 lg:p-10">
      <div>
        <p className="text-sm font-semibold text-[#1268E8]">SUPPORT CENTER</p>

        <h1 className="mt-1 text-3xl font-bold text-[#012663]">
          Help & Support
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Find answers and get help with your Doorstep account.
        </p>
      </div>

      {/* Search */}

      <section className="mt-8 rounded-2xl bg-[#012663] p-6 sm:p-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white">How can we help?</h2>

          <p className="mt-2 text-sm text-blue-100">
            Search our frequently asked questions.
          </p>

          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for help..."
              className="h-12 w-full rounded-xl bg-white pl-12 pr-4 text-sm text-[#102A54] outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-white/20"
            />
          </div>
        </div>
      </section>

      {/* Support Cards */}

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <SupportCard
          icon={MessageCircle}
          title="Chat Support"
          description="Get help with bookings and services."
        />

        <SupportCard
          icon={Mail}
          title="Email Support"
          description="Send your questions to our support team."
        />

        <SupportCard
          icon={Phone}
          title="Call Support"
          description="Speak with our support team for assistance."
        />
      </div>

      {/* FAQ */}

      <section className="mt-6 max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
              <CircleHelp className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#102A54]">
                Frequently Asked Questions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Common questions about using Doorstep.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {visibleFaqs.length === 0 ? (
            <div className="p-8 text-center">
              <CircleHelp className="mx-auto h-8 w-8 text-slate-300" />

              <p className="mt-3 font-semibold text-[#102A54]">
                No results found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try searching for something else.
              </p>
            </div>
          ) : (
            visibleFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-5 p-5 text-left hover:bg-slate-50"
                  >
                    <span className="text-sm font-semibold text-[#102A54]">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={[
                        "h-5 w-5 shrink-0 text-slate-400 transition",
                        isOpen ? "rotate-180" : "",
                      ].join(" ")}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5">
                      <p className="text-sm leading-6 text-slate-500">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}

function SupportCard({ icon: Icon, title, description }) {
  return (
    <button
      type="button"
      className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
        <Icon className="h-5 w-5" />
      </div>

      <h2 className="mt-5 font-bold text-[#102A54]">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>

      <span className="mt-4 inline-block text-sm font-semibold text-[#1268E8]">
        Contact support →
      </span>
    </button>
  );
}

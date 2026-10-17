import {
  BookOpen,
  CircleHelp,
  Mail,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

import { usePageMeta } from "../../hooks/usePageMeta";
import brand from "../../config/brand";

const FAQS = [
  {
    question: "How do I manage customer bookings?",
    answer:
      "Open the Bookings section from the admin navigation to view, search and monitor platform-wide bookings.",
  },
  {
    question: "How do I manage professionals?",
    answer:
      "Open Professionals from the admin navigation to review professional information and verification status.",
  },
  {
    question: "How can I check payments?",
    answer:
      "Open Payments to review transactions, payment methods and payment statuses.",
  },
  {
    question: "Where can I view customer reviews?",
    answer:
      "Open Reviews from the admin navigation to monitor customer feedback, ratings and service quality.",
  },
  {
    question: "Where can I see platform analytics?",
    answer:
      "Open Analytics to view booking performance, revenue information and popular services.",
  },
];

export default function AdminHelp() {
  usePageMeta({
    title: `Help & Support — ${brand.name} Admin`,
    description: "Doorstep administrator help and support.",
  });

  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = FAQS.filter((faq) => {
    const text = `${faq.question} ${faq.answer}`.toLowerCase();

    return text.includes(search.toLowerCase().trim());
  });

  return (
    <div className="min-h-screen bg-[#F5F8FC] p-5 sm:p-7 lg:p-10">
      {/* HEADER */}

      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-[#1268E8]">
          Support Center
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#012663]">
          Help & Support
        </h1>

        <p className="mt-2 text-sm text-[#60728D]">
          Find answers, documentation and support for managing Doorstep.
        </p>
      </div>

      {/* SEARCH */}

      <section className="mt-8 rounded-2xl bg-[#012663] p-6 shadow-sm sm:p-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white">
            How can we help you?
          </h2>

          <p className="mt-2 text-sm text-blue-100">
            Search the administrator help center for answers.
          </p>

          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search help articles..."
              className="h-12 w-full rounded-xl border-0 bg-white pl-12 pr-4 text-sm text-[#102A54] outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-white/20"
            />
          </div>
        </div>
      </section>

      {/* SUPPORT OPTIONS */}

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <SupportCard
          icon={BookOpen}
          title="Documentation"
          description="Learn how to manage customers, professionals, bookings and payments."
          action="View documentation"
        />

        <SupportCard
          icon={MessageCircle}
          title="Contact Support"
          description="Need help with something? Send a message to the Doorstep support team."
          action="Contact support"
        />

        <SupportCard
          icon={Phone}
          title="Priority Support"
          description="Get assistance with important platform or administrator issues."
          action="Call support"
        />
      </div>

      {/* FAQ + SECURITY */}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        {/* FAQ */}

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
                <CircleHelp className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#102A54]">
                  Frequently Asked Questions
                </h2>

                <p className="mt-1 text-sm text-[#60728D]">
                  Common questions about the admin dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center">
                <CircleHelp className="mx-auto h-8 w-8 text-slate-300" />

                <p className="mt-3 text-sm font-semibold text-[#31476A]">
                  No results found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Try another search term.
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-[#F8FAFD]"
                    >
                      <span className="text-sm font-semibold text-[#102A54]">
                        {faq.question}
                      </span>

                      <span
                        className={`text-xl text-[#1268E8] transition-transform ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5">
                        <p className="text-sm leading-6 text-[#60728D]">
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

        {/* RIGHT SIDE */}

        <div className="space-y-6">
          {/* CONTACT */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Mail className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-lg font-bold text-[#102A54]">
              Contact Support
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#60728D]">
              Our support team can help with administrator and platform related
              questions.
            </p>

            <a
              href="mailto:support@doorstep.com"
              className="mt-5 block rounded-xl bg-[#012663] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#023B91]"
            >
              Email Support
            </a>
          </section>

          {/* SECURITY */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#1268E8]">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-lg font-bold text-[#102A54]">
              Security & Privacy
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#60728D]">
              Keep your administrator account secure and never share your
              password or authentication information.
            </p>

            <div className="mt-5 rounded-xl bg-[#F7FAFF] p-4">
              <p className="text-xs font-semibold text-[#31476A]">
                Security reminder
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Doorstep support will never ask you to share your password.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function SupportCard({ icon: Icon, title, description, action }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-5 text-lg font-bold text-[#102A54]">{title}</h3>

      <p className="mt-2 min-h-[48px] text-sm leading-6 text-[#60728D]">
        {description}
      </p>

      <button
        type="button"
        className="mt-5 text-sm font-semibold text-[#1268E8] hover:text-[#023B91]"
      >
        {action} →
      </button>
    </div>
  );
}

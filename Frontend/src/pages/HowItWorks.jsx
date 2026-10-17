import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import Button from "../components/common/Button";
import { ROUTES } from "../constants/routes";
import { usePageMeta } from "../hooks/usePageMeta";
import brand from "../config/brand";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Choose a service",
    description:
      "Browse our wide range of home and personal services and select the one that suits your needs.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Select date and time",
    description:
      "Choose a convenient date and time that works best for your schedule.",
  },
  {
    number: "03",
    icon: UserCheck,
    title: "Get a trusted professional",
    description:
      "A suitable professional will handle your service with care and professionalism.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Relax and enjoy",
    description:
      "Sit back and let our professional take care of the work for you.",
  },
];

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Verified professionals",
    description: "We connect you with professionals you can trust.",
  },
  {
    icon: Clock3,
    title: "Convenient scheduling",
    description: "Book services at a date and time that works for you.",
  },
  {
    icon: CheckCircle2,
    title: "Reliable service",
    description:
      "Our goal is to make every service experience simple and dependable.",
  },
];

export default function HowItWorks() {
  usePageMeta({
    title: `How It Works — ${brand.name}`,
    description:
      "Learn how Doorstep makes booking home and personal services simple.",
  });

  return (
    <main className="min-h-screen bg-[#F3f5f6]">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#dbdbdb]">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#EAF2FF]" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#F1F7FF]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-[#EAF2FF] px-4 py-2 text-sm font-semibold text-[#1268E8]">
              Simple. Convenient. Reliable.
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#012663] sm:text-5xl lg:text-6xl">
              How Doorstep Works
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#5A6F90] sm:text-lg">
              Getting the help you need is simple. Choose a service, schedule a
              time, and let a trusted professional take care of the rest.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to={ROUTES.SERVICES} size="lg">
                Explore Services
                <ArrowRight className="h-5 w-5" />
              </Button>

              <Button to={ROUTES.BOOKING} variant="secondary" size="lg">
                Book a Service
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#1268E8]">
            The process
          </span>

          <h2 className="mt-3 text-3xl font-bold text-[#012663] sm:text-4xl">
            Book your service in four easy steps
          </h2>

          <p className="mt-4 text-base leading-7 text-[#5A6F90]">
            We've designed Doorstep to make finding and booking everyday
            services as easy as possible.
          </p>
        </div>

        <div className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line on desktop */}
          <div className="absolute left-[12%] right-[12%] top-[54px] hidden h-px bg-[#C9DCF7] lg:block" />

          {STEPS.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="relative z-10 rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-[#EAF2FF] text-[#1268E8] shadow-sm">
                  <Icon className="h-7 w-7" />
                </div>

                <span className="mt-5 block text-xs font-bold tracking-widest text-[#1268E8]">
                  STEP {step.number}
                </span>

                <h3 className="mt-3 text-xl font-bold text-[#102A54]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#60728D]">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          WHY DOORSTEP
      ===================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-[#1268E8]">
                Why Doorstep
              </span>

              <h2 className="mt-3 text-3xl font-bold text-[#012663] sm:text-4xl">
                Designed around your convenience
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#5A6F90]">
                Doorstep brings everyday services closer to you. Instead of
                spending time searching for the right professional, you can find
                and book services from one convenient platform.
              </p>

              <div className="mt-8 space-y-5">
                {BENEFITS.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <div key={benefit.title} className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#102A54]">
                          {benefit.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-[#60728D]">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="rounded-3xl bg-[#EAF2FF] p-8 sm:p-10">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#012663] text-white">
                      <ShieldCheck className="h-7 w-7" />
                    </div>

                    <div>
                      <p className="font-bold text-[#102A54]">
                        Your service is in good hands
                      </p>

                      <p className="mt-1 text-sm text-[#60728D]">
                        Simple booking. Trusted professionals.
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-4">
                    <ProgressItem number="1" text="Service selected" />

                    <ProgressItem number="2" text="Date & time confirmed" />

                    <ProgressItem number="3" text="Professional assigned" />

                    <ProgressItem number="4" text="Service completed" last />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-[#012663] px-6 py-14 text-center sm:px-10">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-100">
            Find the service you need and book a trusted professional today.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              to={ROUTES.SERVICES}
              variant="secondary"
              size="lg"
              className="border-white bg-white text-[#012663] hover:bg-blue-50"
            >
              Explore Services
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button
              to={ROUTES.BOOKING}
              size="lg"
              className="border border-white/30 bg-[#023B91] hover:bg-[#0348A7]"
            >
              Book Now
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProgressItem({ number, text, last = false }) {
  return (
    <div className="relative flex items-center gap-4">
      {!last && (
        <span className="absolute left-5 top-10 h-7 w-px bg-[#C9DCF7]" />
      )}

      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1268E8] text-sm font-bold text-white">
        {number}
      </span>

      <span className="text-sm font-medium text-[#31476A]">{text}</span>
    </div>
  );
}

import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  IndianRupee,
  ShieldCheck,
  Smartphone,
  Star,
  Users,
} from "lucide-react";

import Button from "../components/common/Button";
import { ROUTES } from "../constants/routes";
import { usePageMeta } from "../hooks/usePageMeta";
import brand from "../config/brand";

const BENEFITS = [
  {
    icon: BriefcaseBusiness,
    title: "Get more work",
    description:
      "Connect with customers looking for services and grow your professional opportunities.",
  },
  {
    icon: CalendarCheck,
    title: "Manage your schedule",
    description:
      "Choose your availability and manage your work around your schedule.",
  },
  {
    icon: IndianRupee,
    title: "Grow your earnings",
    description:
      "Take on suitable service requests and build a steady stream of work.",
  },
  {
    icon: ShieldCheck,
    title: "Build customer trust",
    description:
      "Create a professional profile and build a strong reputation through quality service.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Create your profile",
    description:
      "Tell us about yourself, your experience and the services you provide.",
    icon: Users,
  },
  {
    number: "02",
    title: "Add your services",
    description:
      "Select the services you offer and provide the information customers need.",
    icon: BriefcaseBusiness,
  },
  {
    number: "03",
    title: "Set your availability",
    description:
      "Let customers know when you are available to accept and complete jobs.",
    icon: Clock3,
  },
  {
    number: "04",
    title: "Start receiving requests",
    description:
      "Review suitable requests, accept jobs and provide excellent service.",
    icon: BadgeCheck,
  },
];

const PROFESSIONAL_TYPES = [
  "Home Cleaning Professionals",
  "Plumbers",
  "Electricians",
  "Carpenters",
  "Care Professionals",
  "Pet Care Professionals",
  "Vehicle Service Professionals",
  "Personal Assistants",
];

export default function BecomeProfessional() {
  usePageMeta({
    title: `Become a Professional — ${brand.name}`,
    description:
      "Join Doorstep as a professional, connect with customers and grow your service business.",
  });

  return (
    <main className="min-h-screen bg-[#F5F8FC]">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#dbdbdb]">
        <div className="absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#EAF2FF]" />

        <div className="absolute -bottom-48 -left-40 h-[450px] w-[450px] rounded-full bg-[#F2F7FF]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            {/* LEFT */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF2FF] px-4 py-2 text-sm font-semibold text-[#1268E8]">
                <BadgeCheck className="h-4 w-4" />
                Join Doorstep
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#012663] sm:text-5xl lg:text-6xl">
                Turn your skills into opportunities.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#5A6F90] sm:text-lg">
                Join Doorstep as a service professional, connect with customers
                and grow your work through a simple and convenient platform.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to={ROUTES.PROFESSIONAL_APPLY} size="lg">
                  Join as a Professional
                  <ArrowRight className="h-5 w-5" />
                </Button>

                <Button to={ROUTES.HOW_IT_WORKS} variant="secondary" size="lg">
                  How It Works
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <TrustPoint text="Flexible work" />

                <TrustPoint text="More opportunities" />

                <TrustPoint text="Professional profile" />
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="rounded-[32px] bg-[#EAF2FF] p-5 sm:p-8">
                <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
                  {/* Profile header */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DCEAFF] text-xl font-bold text-[#1268E8]">
                      P
                    </div>

                    <div className="flex-1">
                      <p className="text-lg font-bold text-[#102A54]">
                        Professional Profile
                      </p>

                      <div className="mt-1 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-[#FFB52E] text-[#FFB52E]" />
                        <span className="text-sm font-semibold text-[#31476A]">
                          Build your reputation
                        </span>
                      </div>
                    </div>

                    <BadgeCheck className="h-6 w-6 text-[#1268E8]" />
                  </div>

                  {/* Stats */}
                  <div className="mt-7 grid grid-cols-3 gap-3">
                    <ProfileStat value="Jobs" label="Opportunities" />

                    <ProfileStat value="Time" label="Your schedule" />

                    <ProfileStat value="₹" label="Your earnings" />
                  </div>

                  {/* Profile completion */}
                  <div className="mt-7 rounded-2xl bg-[#F6F9FD] p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#31476A]">
                        Profile setup
                      </span>

                      <span className="text-sm font-bold text-[#1268E8]">
                        Ready to start
                      </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#DCEAFF]">
                      <div className="h-full w-[82%] rounded-full bg-[#1268E8]" />
                    </div>

                    <div className="mt-4 space-y-3">
                      <CheckRow text="Professional information" />

                      <CheckRow text="Services added" />

                      <CheckRow text="Availability configured" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BENEFITS
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#1268E8]">
            Why join Doorstep?
          </span>

          <h2 className="mt-3 text-3xl font-bold text-[#012663] sm:text-4xl">
            Build your work around your goals
          </h2>

          <p className="mt-4 text-base leading-7 text-[#5A6F90]">
            Doorstep gives professionals the tools and opportunities they need
            to manage their service work more easily.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-lg font-bold text-[#102A54]">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#60728D]">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          HOW TO JOIN
      ===================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#1268E8]">
              Getting started
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#012663] sm:text-4xl">
              Start your professional journey in four steps
            </h2>

            <p className="mt-4 text-base leading-7 text-[#5A6F90]">
              Getting started with Doorstep is designed to be simple.
            </p>
          </div>

          <div className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-[54px] hidden h-px bg-[#C9DCF7] lg:block" />

            {STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="relative z-10 rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
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
        </div>
      </section>

      {/* =====================================================
          WHO CAN JOIN
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#1268E8]">
              Built for skilled professionals
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#012663] sm:text-4xl">
              Your skills can make a difference
            </h2>

            <p className="mt-5 text-base leading-7 text-[#5A6F90]">
              Whether you specialise in home services, care, personal assistance
              or other everyday services, Doorstep is built to help you connect
              with customers.
            </p>

            <div className="mt-7">
              <Button to={ROUTES.PROFESSIONAL_APPLY} size="lg">
                Create Professional Profile
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {PROFESSIONAL_TYPES.map((type) => (
              <div
                key={type}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#1268E8]" />

                <span className="text-sm font-medium text-[#31476A]">
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="rounded-3xl bg-[#012663] px-6 py-14 text-center sm:px-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white">
            <Smartphone className="h-8 w-8" />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
            Ready to grow your professional work?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-100">
            Create your professional profile and start exploring opportunities
            through Doorstep.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              to={ROUTES.REGISTER}
              variant="secondary"
              size="lg"
              className="border-white bg-white text-[#012663] hover:bg-blue-50"
            >
              Join Doorstep
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button
              to={ROUTES.CONTACT}
              size="lg"
              className="border border-white/30 bg-[#023B91] hover:bg-[#0348A7]"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =============================================================
   SMALL COMPONENTS
============================================================= */

function TrustPoint({ text }) {
  return (
    <span className="flex items-center gap-2 text-sm font-medium text-[#31476A]">
      <CheckCircle2 className="h-4 w-4 text-[#1268E8]" />
      {text}
    </span>
  );
}

function CheckRow({ text }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2 className="h-4 w-4 text-[#27B979]" />

      <span className="text-sm text-[#31476A]">{text}</span>
    </div>
  );
}

function ProfileStat({ value, label }) {
  return (
    <div className="rounded-xl bg-[#F5F8FC] p-3 text-center">
      <p className="text-sm font-bold text-[#102A54]">{value}</p>

      <p className="mt-1 text-[11px] text-[#60728D]">{label}</p>
    </div>
  );
}

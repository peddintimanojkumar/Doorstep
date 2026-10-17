import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Home,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import Button from "../components/common/Button";
import { ROUTES } from "../constants/routes";
import { usePageMeta } from "../hooks/usePageMeta";
import brand from "../config/brand";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    description:
      "We aim to make finding reliable service professionals easier by putting trust and safety at the centre of the Doorstep experience.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Every part of Doorstep is designed around making everyday service booking simple, convenient and comfortable for customers.",
  },
  {
    icon: Users,
    title: "People & Professionals",
    description:
      "We connect customers with professionals and create opportunities for skilled people to provide useful services in their communities.",
  },
  {
    icon: Sparkles,
    title: "Better Experiences",
    description:
      "We continuously work towards creating a smoother service experience from discovering a service to completing a booking.",
  },
];

const SERVICE_GROUPS = [
  "Home Services",
  "Healthcare",
  "Child & Elder Care",
  "Pet Care",
  "Vehicle Services",
  "Personal Assistance",
];

export default function About() {
  usePageMeta({
    title: `About Us — ${brand.name}`,
    description:
      "Learn more about Doorstep, our purpose and the services we provide.",
  });

  return (
    <main className="min-h-screen bg-[#f3f5f6]">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-dbdbdb">
        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#EAF2FF]" />

        <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#F2F7FF]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Hero content */}
            <div>
              <span className="inline-flex rounded-full bg-[#EAF2FF] px-4 py-2 text-sm font-semibold text-[#1268E8]">
                About Doorstep
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#012663] sm:text-5xl lg:text-6xl">
                Making everyday services easier, one doorstep at a time.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#5A6F90] sm:text-lg">
                Doorstep is built to make finding and booking home and personal
                services simple, convenient and reliable.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#60728D] sm:text-base">
                Whether you need help at home, assistance for your family,
                personal care or everyday support, Doorstep brings services
                together in one convenient platform.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to={ROUTES.SERVICES} size="lg">
                  Explore Services
                  <ArrowRight className="h-5 w-5" />
                </Button>

                <Button to={ROUTES.HOW_IT_WORKS} variant="secondary" size="lg">
                  How It Works
                </Button>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="rounded-[32px] bg-[#EAF2FF] p-5 sm:p-8">
                <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#012663] text-white">
                      <Home className="h-7 w-7" />
                    </div>

                    <div>
                      <p className="text-xl font-bold text-[#102A54]">
                        Doorstep
                      </p>

                      <p className="mt-1 text-sm text-[#60728D]">
                        Services made simple
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-3">
                    {SERVICE_GROUPS.map((service, index) => (
                      <div
                        key={service}
                        className="flex items-center gap-3 rounded-xl border border-slate-100 bg-[#F8FAFD] px-4 py-3"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF] text-xs font-bold text-[#1268E8]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-sm font-medium text-[#31476A]">
                          {service}
                        </span>

                        <CheckCircle2 className="ml-auto h-4 w-4 text-[#27B979]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR STORY
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Visual */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-[32px] bg-[#012663] p-8 sm:p-10">
              <div className="absolute right-6 top-6 h-20 w-20 rounded-full bg-white/10" />

              <div className="absolute bottom-8 right-12 h-12 w-12 rounded-full bg-white/10" />

              <div className="relative">
                <span className="text-sm font-semibold uppercase tracking-wider text-[#88BDF2]">
                  Our purpose
                </span>

                <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Bringing trusted help closer to you.
                </h2>

                <p className="mt-5 text-sm leading-7 text-blue-100 sm:text-base">
                  We believe that getting help for everyday needs should not be
                  complicated. Doorstep brings customers and professionals
                  together through a simple service experience.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/10 p-5">
                    <p className="text-2xl font-bold text-white">30+</p>

                    <p className="mt-1 text-xs text-blue-100">Services</p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5">
                    <p className="text-2xl font-bold text-white">1</p>

                    <p className="mt-1 text-xs text-blue-100">
                      Simple platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#1268E8]">
              Who we are
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#012663] sm:text-4xl">
              A simpler way to manage everyday service needs
            </h2>

            <p className="mt-5 text-base leading-7 text-[#5A6F90]">
              Doorstep brings a variety of services together so customers can
              spend less time searching and more time getting things done.
            </p>

            <p className="mt-4 text-base leading-7 text-[#5A6F90]">
              From home cleaning and repairs to personal assistance, healthcare
              support, pet care and vehicle services, our goal is to make
              service discovery and booking easier.
            </p>

            <div className="mt-7 space-y-4">
              <Feature text="Convenient service discovery" />

              <Feature text="Simple booking experience" />

              <Feature text="Professional-focused service delivery" />

              <Feature text="Designed around customer convenience" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR VALUES
      ===================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#1268E8]">
              What matters to us
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#012663] sm:text-4xl">
              Our values
            </h2>

            <p className="mt-4 text-base leading-7 text-[#5A6F90]">
              The principles that guide the way we build the Doorstep
              experience.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-[#102A54]">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#60728D]">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROFESSIONAL CTA
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-[#EAF2FF]">
          <div className="grid items-center gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[1fr_auto] lg:px-14">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-[#1268E8]">
                Join Doorstep
              </span>

              <h2 className="mt-3 text-3xl font-bold text-[#012663] sm:text-4xl">
                Are you a service professional?
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#5A6F90]">
                Join the Doorstep professional network and connect with
                customers looking for reliable services.
              </p>
            </div>

            <Button to="/professional" size="lg">
              Become a Professional
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="rounded-3xl bg-[#012663] px-6 py-14 text-center sm:px-10">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Your everyday services, all in one place.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-100">
            Discover the service you need and experience a simpler way to get
            things done.
          </p>

          <div className="mt-8">
            <Button
              to={ROUTES.SERVICES}
              variant="secondary"
              size="lg"
              className="border-white bg-white text-[#012663] hover:bg-blue-50"
            >
              Explore Services
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#1268E8]" />

      <span className="text-sm font-medium text-[#31476A]">{text}</span>
    </div>
  );
}

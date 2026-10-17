import { BadgeCheck, IndianRupee, BellRing } from "lucide-react";
import Button from "../common/Button";
import ServiceSearch from "../services/ServiceSearch";
import BookingPreview from "./BookingPreview";
import brand from "../../config/brand";
import { ROUTES } from "../../constants/routes";

const TRUST_POINTS = [
  { icon: BadgeCheck, label: "Verified professionals" },
  { icon: IndianRupee, label: "Transparent pricing" },
  { icon: BellRing, label: "Live status updates" },
];

export default function HeroSection() {
  return (
    <section className="border-b border-stone-200 bg-[#dbdbdb]">
      <div className="container grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:py-24">
        <div className="animate-fade-up lg:col-span-7">
          <h1 className="text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            {brand.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-500">
            {brand.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to={ROUTES.BOOKING} size="lg">
              Book a Service
            </Button>
            <Button to={ROUTES.SERVICES} variant="secondary" size="lg">
              Explore Services
            </Button>
          </div>

          <div className="mt-10 max-w-2xl">
            <ServiceSearch showPopular />
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-500">
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-fern-600" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <BookingPreview />
        </div>
      </div>
    </section>
  );
}

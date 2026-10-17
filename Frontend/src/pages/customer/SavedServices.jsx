import { Heart, Search, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePageMeta } from "../../hooks/usePageMeta";
import { ROUTES } from "../../constants/routes";
import brand from "../../config/brand";

const INITIAL_SERVICES = [
  {
    id: 1,
    name: "Home Cleaning",
    category: "Home Services",
    description: "Professional cleaning for your home.",
    price: "From ₹499",
  },
  {
    id: 2,
    name: "Plumbing",
    category: "Home Services",
    description: "Reliable plumbing assistance at your doorstep.",
    price: "From ₹299",
  },
  {
    id: 3,
    name: "Elder Care",
    category: "Healthcare",
    description: "Trusted assistance for elderly family members.",
    price: "From ₹499",
  },
];

export default function SavedServices() {
  usePageMeta({
    title: `Saved Services — ${brand.name}`,
  });

  const navigate = useNavigate();

  const [services, setServices] = useState(INITIAL_SERVICES);

  function removeService(id) {
    setServices((current) => current.filter((service) => service.id !== id));
  }

  return (
    <div className="min-h-full p-5 sm:p-8 lg:p-10">
      <div>
        <p className="text-sm font-semibold text-[#1268E8]">FAVORITES</p>

        <h1 className="mt-1 text-3xl font-bold text-[#012663]">
          Saved Services
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Your favorite Doorstep services are saved here.
        </p>
      </div>

      {services.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1268E8]">
            <Heart className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#102A54]">
            No saved services
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Save services that you use regularly to book them faster.
          </p>

          <button
            type="button"
            onClick={() => navigate(ROUTES.SERVICES)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#012663] px-5 py-3 text-sm font-semibold text-white hover:bg-[#023B91]"
          >
            <Search className="h-4 w-4" />
            Explore Services
          </button>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1268E8]">
                    <Sparkles className="h-6 w-6" />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeService(service.id)}
                    className="rounded-full p-2 text-red-500 hover:bg-red-50"
                    aria-label={`Remove ${service.name}`}
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </button>
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-[#1268E8]">
                  {service.category}
                </p>

                <h2 className="mt-1 text-lg font-bold text-[#102A54]">
                  {service.name}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {service.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm font-semibold text-[#102A54]">
                    {service.price}
                  </span>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#1268E8]"
                  >
                    View
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate(ROUTES.SERVICES)}
            className="mt-7 inline-flex items-center gap-2 rounded-xl border border-[#012663] px-5 py-3 text-sm font-semibold text-[#012663] hover:bg-[#012663] hover:text-white"
          >
            <Search className="h-4 w-4" />
            Explore More Services
          </button>
        </>
      )}
    </div>
  );
}

import SectionHeading from "../common/SectionHeading";
import { whyChooseUs } from "../../data/home";
import { getIcon } from "../../utils/iconMap";

export default function WhyChooseUsSection() {
  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          title="Why choose us"
          description="Trust, clarity, and convenience built into every booking."
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((feature) => {
            const Icon = getIcon(feature.icon);
            return (
              <li
                key={feature.title}
                className="rounded-card border border-stone-200 bg-white p-6 shadow-rest"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-control bg-fern-50 text-fern-700">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-sans text-base font-semibold text-ink-800">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-ink-500">{feature.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import Button from "../common/Button";
import ServiceCategoryCard from "../services/ServiceCategoryCard";
import { longTermServices } from "../../data/home";
import { ROUTES } from "../../constants/routes";

export default function LongTermSection() {
  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <div className="container grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="text-3xl leading-tight tracking-tight sm:text-4xl">
            Ongoing help for the people, pets, and plants that need it
          </h2>
          <p className="mt-4 text-lg text-ink-500">
            Arrange regular, dependable assistance instead of booking every visit from scratch.
          </p>
          <Button to={`${ROUTES.SERVICES}?type=long-term`} size="lg" className="mt-8">
            Explore Long-Term Services
          </Button>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
          {longTermServices.map((service) => (
            <li key={service.name}>
              <ServiceCategoryCard category={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

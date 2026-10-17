import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";
import SkeletonCard from "../common/SkeletonCard";
import ErrorState from "../common/ErrorState";
import ServiceCard from "../services/ServiceCard";
import { usePopularServices } from "../../hooks/useServices";
import { ROUTES } from "../../constants/routes";

// Six-column grid on large screens: the first two cards span three columns,
// the rest span two, so five services fill two tidy rows.
const spanFor = (index) => (index < 2 ? "lg:col-span-3" : "lg:col-span-2");

export default function PopularServicesSection() {
  const { data: services, isPending, isError, refetch } = usePopularServices();

  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          title="Popular services"
          description="Indicative starting prices — the final price depends on the job."
          action={
            <Link to={ROUTES.SERVICES} className="text-sm font-medium text-fern-700 hover:text-fern-800">
              View all services
            </Link>
          }
        />

        <div className="mt-10">
          {isError ? (
            <ErrorState onRetry={refetch} />
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
              {isPending
                ? Array.from({ length: 5 }, (_, index) => (
                    <li key={index} className={spanFor(index)}>
                      <SkeletonCard />
                    </li>
                  ))
                : services.map((service, index) => (
                    <li key={service.id} className={spanFor(index)}>
                      <ServiceCard service={service} />
                    </li>
                  ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

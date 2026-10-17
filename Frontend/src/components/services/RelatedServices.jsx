import ServiceCard from "./ServiceCard";

/**
 * RelatedServices
 * Grid of other services (usually same category group). Caller decides
 * which services and how many — this just lays them out.
 */
export default function RelatedServices({ services }) {
  if (services.length === 0) return null;

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <li key={service.id}>
          <ServiceCard service={service} />
        </li>
      ))}
    </ul>
  );
}

import ServicePackageCard from "./ServicePackageCard";

/**
 * PricingTable
 * Grid of a service's bookable packages. The middle package (a reasonable,
 * data-free heuristic for "most representative") is highlighted so the
 * grid doesn't read as a flat, undifferentiated list.
 */
export default function PricingTable({ serviceSlug, packages }) {
  const highlightIndex = Math.floor((packages.length - 1) / 2);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg, index) => (
        <ServicePackageCard
          key={pkg.name}
          serviceSlug={serviceSlug}
          pkg={pkg}
          highlight={packages.length > 1 && index === highlightIndex}
        />
      ))}
    </div>
  );
}

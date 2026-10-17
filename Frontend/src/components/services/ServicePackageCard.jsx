import Button from "../common/Button";
import { formatPackagePrice } from "../../utils/formatCurrency";
import { ROUTES } from "../../constants/routes";

/**
 * ServicePackageCard
 * One bookable package/tier within a service (e.g. "Two Rooms" for Home
 * Cleaning). `highlight` marks it as the recommended option.
 */
export default function ServicePackageCard({
  serviceSlug,
  pkg,
  highlight = false,
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-card border p-5 ${
        highlight
          ? "border-fern-400 bg-fern-50/40 shadow-rest"
          : "border-stone-200 bg-white"
      }`}
    >
      {highlight && (
        <span className="mb-2 self-start rounded-full bg-fern-600 px-2.5 py-0.5 text-xs font-medium text-white">
          Most booked
        </span>
      )}
      <p className="font-sans text-base font-semibold text-ink-800">
        {pkg.name}
      </p>
      <p className="mt-2 font-display text-2xl text-ink-800">
        {formatPackagePrice(pkg)}
      </p>
      <p className="mt-1 text-xs text-ink-400">Indicative price</p>
      <Button
        to={`${ROUTES.BOOKING}?service=${serviceSlug}&package=${encodeURIComponent(pkg.name)}`}
        variant={highlight ? "primary" : "secondary"}
        size="sm"
        className="mt-5"
      >
        Book this package
      </Button>
    </div>
  );
}

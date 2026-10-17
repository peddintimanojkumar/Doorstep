import { Link } from "react-router-dom";
import { getIcon } from "../../utils/iconMap";
import { ROUTES } from "../../constants/routes";

/**
 * ServiceCategoryCard
 * Compact icon + name link tile. Needs only { slug, icon, name }, so both
 * full categories and the long-term-assistance list can use it.
 */
export default function ServiceCategoryCard({ category }) {
  const Icon = getIcon(category.icon);

  return (
    <Link
      to={ROUTES.serviceDetails(category.slug)}
      className="group flex h-full items-center gap-3 rounded-card border border-stone-200 bg-white p-4 shadow-rest transition hover:-translate-y-0.5 hover:border-fern-300 hover:shadow-lifted"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-fern-50 text-fern-700 transition-colors group-hover:bg-fern-100">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-sm font-medium text-ink-800">{category.name}</span>
    </Link>
  );
}

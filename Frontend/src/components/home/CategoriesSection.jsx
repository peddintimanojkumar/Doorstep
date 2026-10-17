import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";
import Skeleton from "../common/Skeleton";
import ErrorState from "../common/ErrorState";
import ChipGroup from "../common/ChipGroup";
import ServiceCategoryCard from "../services/ServiceCategoryCard";
import { useCategories } from "../../hooks/useServices";
import { categoryGroups } from "../../data/categories";
import { ROUTES } from "../../constants/routes";

const GROUP_OPTIONS = categoryGroups.map(({ id, label }) => ({
  value: id,
  label,
}));

const GRID =
  "grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

export default function CategoriesSection() {
  const [activeGroup, setActiveGroup] = useState("all");
  const { data: categories, isPending, isError, refetch } = useCategories();

  const visible =
    activeGroup === "all"
      ? categories
      : categories?.filter((category) => category.group === activeGroup);

  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          title="Every kind of help, in one place"
          description="From daily errands to long-term care — find the right professional for the job."
          action={
            <Link
              to={ROUTES.SERVICES}
              className="text-sm font-medium text-fern-700 hover:text-fern-800"
            >
              View all services
            </Link>
          }
        />

        <ChipGroup
          options={GROUP_OPTIONS}
          value={activeGroup}
          onChange={setActiveGroup}
          ariaLabel="Filter services by type"
          className="mt-8"
        />

        <div className="mt-6">
          {isError ? (
            <ErrorState onRetry={refetch} />
          ) : isPending ? (
            <div className={GRID} role="status" aria-label="Loading services">
              {Array.from({ length: 10 }, (_, index) => (
                <Skeleton key={index} className="h-[74px] rounded-card" />
              ))}
            </div>
          ) : (
            <ul className={GRID}>
              {visible.map((category) => (
                <li key={category.id}>
                  <ServiceCategoryCard category={category} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import PageHero from "../components/layout/PageHero";
import Button from "../components/common/Button";
import ChipGroup from "../components/common/ChipGroup";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import SearchField from "../components/common/SearchField";
import Select from "../components/common/Select";
import SkeletonCard from "../components/common/SkeletonCard";
import ActiveFilterTags from "../components/services/ActiveFilterTags";
import ServiceCard from "../components/services/ServiceCard";
// import ServiceFilters from "../components/services/ServiceFilters";
import ServiceFilters from "../components/services/ServiceFilters";
import { useServiceCatalog } from "../hooks/useServices";
// import { useServiceFilters } from "../hooks/useServiceFilters";
import { useServiceFilters } from "../hooks/useServiceFilters";
import { usePageMeta } from "../hooks/usePageMeta";
import {
  categoryOptions,
  sidebarFilters,
  sortOptions,
} from "../data/serviceFilters";
import { filterServices, sortServices } from "../utils/filterServices";
import brand from "../config/brand";

export default function Services() {
  usePageMeta({
    title: `Services — ${brand.name}`,
    description:
      "Browse home, care, and personal assistance services. Filter by type, price, duration, and availability — with indicative starting prices.",
  });

  const {
    filters,
    activeFilters,
    searchInput,
    setSearchInput,
    setFilter,
    clearFilter,
    resetFilters,
  } = useServiceFilters();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { data: catalog, isPending, isError, refetch } = useServiceCatalog();

  const results = useMemo(
    () =>
      catalog
        ? sortServices(
            filterServices(catalog, filters),
            filters.sort,
            Boolean(filters.q),
          )
        : [],
    [catalog, filters],
  );
  const sidebarActiveCount = sidebarFilters.filter(
    (filter) => filters[filter.key],
  ).length;

  return (
    <div className="min-h-screen bg-[#dbdbdb]">
      <PageHero
        title="Services"
        description="Everything from a quick household job to long-term care. Prices shown are indicative starting prices."
      >
        <SearchField
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Search services, e.g. plumber"
          label="Search services"
        />
      </PageHero>

      <main className="container py-10">
        <ChipGroup
          options={categoryOptions}
          value={filters.category}
          onChange={(value) => setFilter("category", value)}
          ariaLabel="Filter by category"
        />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <p role="status" className="text-sm text-ink-500">
              {isPending
                ? "Loading services…"
                : `${results.length} ${
                    results.length === 1 ? "service" : "services"
                  }`}
            </p>

            <Button
              variant="secondary"
              size="sm"
              className="lg:hidden"
              aria-expanded={mobileFiltersOpen}
              aria-controls="service-filters"
              onClick={() => setMobileFiltersOpen((open) => !open)}
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filters
              {sidebarActiveCount > 0 ? ` (${sidebarActiveCount})` : ""}
            </Button>
          </div>

          <Select
            label="Sort by"
            value={filters.sort}
            onChange={(value) => setFilter("sort", value)}
            options={sortOptions}
          />
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside
            id="service-filters"
            aria-label="Service filters"
            className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block`}
          >
            <div className="lg:sticky lg:top-24">
              <ServiceFilters filters={filters} onChange={setFilter} />
            </div>
          </aside>

          <div className="min-w-0 space-y-6">
            <ActiveFilterTags
              tags={activeFilters}
              onRemove={clearFilter}
              onClearAll={resetFilters}
            />

            {isError ? (
              <ErrorState onRetry={refetch} />
            ) : isPending ? (
              <ul className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                {Array.from({ length: 6 }, (_, index) => (
                  <li key={index}>
                    <SkeletonCard />
                  </li>
                ))}
              </ul>
            ) : results.length === 0 ? (
              <EmptyState
                title="No services match your filters"
                description="Try removing a filter or searching with a different word. Some services don’t list a price or duration yet, so they’re hidden while those filters are on."
                action={
                  <Button variant="secondary" onClick={resetFilters}>
                    Clear all filters
                  </Button>
                }
              />
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                {results.map((service) => (
                  <li key={service.id}>
                    <ServiceCard service={service} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

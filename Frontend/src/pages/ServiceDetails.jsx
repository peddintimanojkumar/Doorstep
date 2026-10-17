import { Link, useParams } from "react-router-dom";
import {
  CalendarClock,
  Check,
  ChevronRight,
  Clock,
  ListChecks,
  Zap,
} from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import SectionHeading from "../components/common/SectionHeading";
import Skeleton from "../components/common/Skeleton";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";
import Accordion from "../components/common/Accordion";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import RatingPlaceholder from "../components/services/RatingPlaceholder";
import PricingTable from "../components/services/PricingTable";
import RelatedServices from "../components/services/RelatedServices";
import { useServiceDetails, useServiceCatalog } from "../hooks/useServices";
import { usePageMeta } from "../hooks/usePageMeta";
import { getIcon } from "../utils/iconMap";
import { formatCurrency } from "../utils/formatCurrency";
import { getRequirements } from "../utils/serviceRequirements";
import { categoryGroupLabels } from "../data/categories";
import faq from "../data/faq";
import brand from "../config/brand";
import { ROUTES } from "../constants/routes";

const SERVICE_TYPE_LABELS = {
  "one-time": "One-time visit",
  "long-term": "Ongoing / long-term",
};

const AVAILABILITY_LABELS = {
  "on-demand": "Available on-demand",
  scheduled: "Book in advance",
};

function DetailSkeleton() {
  return (
    <PageContainer className="py-14">
      <Skeleton className="h-4 w-64" />
      <div className="mt-8 flex items-start gap-5">
        <Skeleton className="h-16 w-16 rounded-control" />
        <div className="flex-1">
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="mt-3 h-5 w-full max-w-xl" />
        </div>
      </div>
      <Skeleton className="mt-10 h-40 w-full" />
    </PageContainer>
  );
}

export default function ServiceDetails() {
  const { slug } = useParams();
  const {
    data: service,
    isPending,
    isError,
    refetch,
  } = useServiceDetails(slug);
  const { data: catalog } = useServiceCatalog();

  usePageMeta({
    title: service
      ? `${service.name} — ${brand.name}`
      : `Service — ${brand.name}`,
    description: service?.shortDescription ?? brand.description,
  });

  if (isPending) return <DetailSkeleton />;

  if (isError) {
    return (
      <PageContainer className="py-20">
        <ErrorState onRetry={refetch} />
      </PageContainer>
    );
  }

  if (!service) {
    return (
      <PageContainer className="py-20">
        <EmptyState
          title="We couldn't find that service"
          description="It may have moved or no longer exists. Browse all services instead."
          action={<Button to={ROUTES.SERVICES}>Browse services</Button>}
        />
      </PageContainer>
    );
  }

  const Icon = getIcon(service.icon);
  const hasPrice = service.startingPrice !== null;
  const related = (catalog ?? [])
    .filter(
      (item) => item.group === service.group && item.slug !== service.slug,
    )
    .sort((a, b) => {
      if (a.popularRank == null && b.popularRank == null)
        return a.name.localeCompare(b.name);
      if (a.popularRank == null) return 1;
      if (b.popularRank == null) return -1;
      return a.popularRank - b.popularRank;
    })
    .slice(0, 3);

  return (
    <>
      <section className="border-b border-stone-200 bg-stone-50">
        <PageContainer className="py-12 sm:py-16">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1 text-sm text-ink-500"
          >
            <Link to={ROUTES.HOME} className="hover:text-ink-800">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <Link to={ROUTES.SERVICES} className="hover:text-ink-800">
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <Link
              to={`${ROUTES.SERVICES}?category=${service.group}`}
              className="hover:text-ink-800"
            >
              {categoryGroupLabels[service.group]}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-ink-700">{service.name}</span>
          </nav>

          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-start gap-4">
                {service.image ? (
                  <img
                    src={service.image.src}
                    alt={service.image.alt}
                    className="h-16 w-16 rounded-control object-cover"
                  />
                ) : (
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-control bg-fern-50 text-fern-700">
                    <Icon className="h-8 w-8" aria-hidden="true" />
                  </span>
                )}
                <div>
                  <Badge>{service.category}</Badge>
                  <h1 className="mt-2 text-3xl leading-tight tracking-tight sm:text-4xl">
                    {service.name}
                  </h1>
                </div>
              </div>

              <p className="mt-5 text-lg text-ink-600">
                {service.description || service.shortDescription}
              </p>
              <div className="mt-4">
                <RatingPlaceholder />
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  to={`${ROUTES.BOOKING}?service=${service.slug}`}
                  size="lg"
                >
                  Book Now
                </Button>
                <Button href="#pricing" variant="secondary" size="lg">
                  See pricing
                </Button>
              </div>
            </div>

            <div className="w-full max-w-xs rounded-card border border-stone-200 bg-white p-6 shadow-rest">
              <p className="text-xs text-ink-400">
                {hasPrice ? "Starting from" : "Pricing"}
              </p>
              <p className="font-display text-3xl text-ink-800">
                {hasPrice
                  ? formatCurrency(service.startingPrice)
                  : "On request"}
              </p>
              {!hasPrice && (
                <p className="mt-1 text-xs text-ink-400">
                  Confirmed after you share your requirements
                </p>
              )}
              <dl className="mt-5 space-y-3 border-t border-stone-100 pt-5 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-2 text-ink-500">
                    <Clock className="h-4 w-4" aria-hidden="true" /> Duration
                  </dt>
                  <dd className="text-ink-800">
                    {service.duration?.label ?? "Varies"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-2 text-ink-500">
                    <Zap className="h-4 w-4" aria-hidden="true" /> Availability
                  </dt>
                  <dd className="text-ink-800">
                    {AVAILABILITY_LABELS[service.availability]}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="flex items-center gap-2 text-ink-500">
                    <ListChecks className="h-4 w-4" aria-hidden="true" /> Type
                  </dt>
                  <dd className="text-ink-800">
                    {service.serviceTypes
                      .map((type) => SERVICE_TYPE_LABELS[type])
                      .join(" · ")}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="py-14 sm:py-16">
        <SectionHeading title="What's included" />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm text-ink-600"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-fern-600"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      </PageContainer>

      <section id="pricing" className="scroll-mt-20 bg-stone-50 py-14 sm:py-16">
        <PageContainer>
          <SectionHeading
            title="Pricing & packages"
            description="Indicative pricing — the final price is confirmed before the job begins."
          />
          <div className="mt-8">
            {service.packages.length > 0 ? (
              <PricingTable
                serviceSlug={service.slug}
                packages={service.packages}
              />
            ) : (
              <div className="max-w-sm rounded-card border border-stone-200 bg-white p-6 shadow-rest">
                <p className="text-xs text-ink-400">
                  {hasPrice ? "Starting from" : "Pricing"}
                </p>
                <p className="font-display text-2xl text-ink-800">
                  {hasPrice
                    ? formatCurrency(service.startingPrice)
                    : "On request"}
                </p>
                <Button
                  to={`${ROUTES.BOOKING}?service=${service.slug}`}
                  className="mt-5"
                >
                  Book Now
                </Button>
              </div>
            )}
          </div>
        </PageContainer>
      </section>

      <PageContainer className="py-14 sm:py-16">
        <SectionHeading title="What we'll need from you" />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {getRequirements(service.group).map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm text-ink-600"
            >
              <CalendarClock
                className="mt-0.5 h-4 w-4 shrink-0 text-marigold-500"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </PageContainer>

      <section className="bg-stone-50 py-14 sm:py-16">
        <PageContainer>
          <SectionHeading title="Frequently asked questions" />
          <div className="mt-8 max-w-2xl">
            <Accordion items={faq} />
          </div>
        </PageContainer>
      </section>

      {related.length > 0 && (
        <PageContainer className="py-14 sm:py-16">
          <SectionHeading title="You might also need" />
          <div className="mt-8">
            <RelatedServices services={related} />
          </div>
        </PageContainer>
      )}

      <PageContainer className="pb-16 sm:pb-20">
        <div className="rounded-card bg-fern-800 px-8 py-10 text-white sm:px-12">
          <h2 className="max-w-lg text-2xl leading-snug text-white sm:text-3xl">
            Ready to book {service.name.toLowerCase()}?
          </h2>
          <Button
            to={`${ROUTES.BOOKING}?service=${service.slug}`}
            size="lg"
            className="mt-6"
          >
            Book Now
          </Button>
        </div>
      </PageContainer>
    </>
  );
}

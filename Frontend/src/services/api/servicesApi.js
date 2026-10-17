import apiClient from "./apiClient";
import categories, { categoryGroups } from "../../data/categories";
import serviceDetails from "../../data/services";
import { searchCategories as matchCategories } from "../../utils/searchServices";

const GROUP_LABELS = Object.fromEntries(
  categoryGroups.map((group) => [group.id, group.label]),
);

const DEFAULTS = {
  shortDescription: "",
  description: "",
  image: null,
  startingPrice: null,
  packages: [],
  serviceTypes: ["one-time"],
  availability: "scheduled",
  duration: null,
  popularRank: null,
  features: [],
  requirements: [],
  faqs: [],
};

// Preserve the existing frontend metadata for service cards.
const localCatalog = categories.map((category) => ({
  ...DEFAULTS,
  ...(serviceDetails[category.slug] || {}),
  id: category.id,
  slug: category.slug,
  name: category.name,
  icon: category.icon,
  group: category.group,
  category: GROUP_LABELS[category.group] || "",
  keywords: category.keywords || [],
}));

function mapApiService(service) {
  const localMatch = localCatalog.find(
    (item) =>
      item.name.toLowerCase() === service.name.toLowerCase() ||
      item.slug === service.slug,
  );

  return {
    ...DEFAULTS,
    ...(localMatch || {}),
    id: service.id,
    categoryId: service.categoryId,
    name: service.name,
    slug:
      localMatch?.slug ||
      service.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
        
    shortDescription: service.description || "",
    description: service.description || "",
    image: service.image || localMatch?.image || null,
    startingPrice:
      service.price === null || service.price === undefined
        ? null
        : Number(service.price),
    duration: localMatch?.duration ?? null,
    durationMinutes: service.duration ?? null,
    category: service.category?.name || "",
    isActive: service.isActive,
    icon: localMatch?.icon || null,
    group: localMatch?.group || null,
    keywords: localMatch?.keywords || [],
  };
}

export async function getCategories() {
  const response = await apiClient.get("/categories");

  return response.data.categories.map((apiCategory) => {
    const localMatch = categories.find(
      (item) => item.name.toLowerCase() === apiCategory.name.toLowerCase(),
    );

    return {
      ...apiCategory,
      slug: localMatch?.slug || String(apiCategory.id),
      icon: localMatch?.icon || null,
      group: localMatch?.group || null,
      keywords: localMatch?.keywords || [],
    };
  });
}

export async function getServices() {
  const response = await apiClient.get("/services");
  return response.data.services.map(mapApiService);
}

export async function getPopularServices() {
  const services = await getServices();

  return services
    .filter((service) => service.popularRank != null)
    .sort((a, b) => a.popularRank - b.popularRank);
}

export async function searchCategories(query) {
  const apiCategories = await getCategories();

  if (!query?.trim()) {
    return apiCategories;
  }

  const localMatches = matchCategories(categories, query);
  const matchedNames = new Set(
    localMatches.map((item) => item.name.toLowerCase()),
  );
  const normalizedQuery = query.trim().toLowerCase();

  return apiCategories.filter(
    (item) =>
      matchedNames.has(item.name.toLowerCase()) ||
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.description?.toLowerCase().includes(normalizedQuery),
  );
}

export async function getServiceBySlug(slug) {
  const services = await getServices();

  const service = services.find(
    (item) => item.slug === slug || String(item.id) === String(slug),
  );

  if (!service) {
    throw new Error(`Service not found: ${slug}`);
  }

  return service;
}

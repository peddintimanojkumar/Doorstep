// Pure filter/sort logic for the Services page catalogue — no React, so
// it's easy to reason about (and to reuse behind a real API later).
// Filter keys and value vocab come from data/serviceFilters.js.
import { meaningfulTokens, scoreWord, tokenize } from "./searchServices";

// Shares the hero search's stopword-aware, prefix-tolerant matching (see
// searchServices.js) so a natural-language query like "I need my car
// cleaned" — e.g. arriving via the hero's "See all results" link — matches
// here the same way it does there, instead of requiring every filler word
// ("i", "need", "my") to literally appear in the service's text.
function matchesQuery(service, query) {
  const tokens = meaningfulTokens(query);
  if (tokens.length === 0) return true;

  const haystack = [
    ...tokenize(service.name),
    ...tokenize(service.shortDescription ?? ""),
    ...(service.keywords ?? []).flatMap(tokenize),
  ];

  return tokens.every((token) => haystack.some((word) => scoreWord(token, word) > 0));
}

function matchesCategory(service, category) {
  return !category || service.group === category;
}

function matchesType(service, type) {
  return !type || (service.serviceTypes ?? []).includes(type);
}

function matchesPrice(service, price) {
  const value = service.startingPrice;
  switch (price) {
    case "up-to-200":
      return value != null && value <= 200;
    case "201-500":
      return value != null && value > 200 && value <= 500;
    case "above-500":
      return value != null && value > 500;
    default:
      return true;
  }
}

function matchesDuration(service, duration) {

  if(!duration) return true;
  if(typeof service.duration === "object" && service.duration !== null){
    return service.duration.bucket === duration ;
  } 
  return false;
}

function matchesAvailability(service, availability) {
  return !availability || service.availability === availability;
}

export function filterServices(catalog, filters = {}) {
  const { q = "", category = "", type = "", price = "", duration = "", availability = "" } = filters;
  return catalog.filter(
    (service) =>
      matchesQuery(service, q) &&
      matchesCategory(service, category) &&
      matchesType(service, type) &&
      matchesPrice(service, price) &&
      matchesDuration(service, duration) &&
      matchesAvailability(service, availability)
  );
}

// Services with no known price always sort to the end under either price
// order — there's nothing to compare them by. While a search query is
// active, "recommended" keeps the filtered (relevance) order instead of
// re-sorting by popularity, so the best text match stays first.
export function sortServices(services, sort, hasQuery = false) {
  if (sort === "recommended" && hasQuery) return services;

  const sorted = [...services];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => {
        if (a.startingPrice == null) return 1;
        if (b.startingPrice == null) return -1;
        return a.startingPrice - b.startingPrice;
      });
    case "price-desc":
      return sorted.sort((a, b) => {
        if (a.startingPrice == null) return 1;
        if (b.startingPrice == null) return -1;
        return b.startingPrice - a.startingPrice;
      });
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "recommended":
    default:
      return sorted.sort((a, b) => {
        if (a.popularRank == null && b.popularRank == null) return a.name.localeCompare(b.name);
        if (a.popularRank == null) return 1;
        if (b.popularRank == null) return -1;
        return a.popularRank - b.popularRank;
      });
  }
}

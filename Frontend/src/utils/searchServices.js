const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "at",
  "be",
  "by",
  "can",
  "do",
  "for",
  "from",
  "get",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "need",
  "of",
  "on",
  "please",
  "the",
  "to",
  "want",
  "with",
]);

export function tokenize(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function meaningfulTokens(query = "") {
  return tokenize(query).filter((token) => !STOP_WORDS.has(token));
}

export function scoreWord(queryWord, serviceWord) {
  if (!queryWord || !serviceWord) return 0;

  if (queryWord === serviceWord) {
    return 1;
  }

  if (serviceWord.startsWith(queryWord)) {
    return 0.9;
  }

  if (queryWord.startsWith(serviceWord)) {
    return 0.8;
  }

  if (
    queryWord.length >= 4 &&
    serviceWord.length >= 4 &&
    (queryWord.includes(serviceWord) || serviceWord.includes(queryWord))
  ) {
    return 0.6;
  }

  return 0;
}

function serviceSearchText(service) {
  return [service.name, service.shortDescription, ...(service.keywords ?? [])]
    .filter(Boolean)
    .join(" ");
}

export function searchServices(catalog = [], query = "") {
  const tokens = meaningfulTokens(query);

  if (tokens.length === 0) {
    return catalog;
  }

  return catalog
    .map((service, index) => {
      const words = tokenize(serviceSearchText(service));

      let score = 0;

      for (const token of tokens) {
        const bestScore = Math.max(
          0,
          ...words.map((word) => scoreWord(token, word)),
        );

        score += bestScore;
      }

      return {
        service,
        score,
        index,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      const aRank = a.service.popularRank ?? Infinity;
      const bRank = b.service.popularRank ?? Infinity;

      if (aRank !== bRank) {
        return aRank - bRank;
      }

      return a.index - b.index;
    })
    .map((item) => item.service);
}

export function searchCategories(categories = [], query = "") {
  const tokens = meaningfulTokens(query);

  if (tokens.length === 0) {
    return categories;
  }

  return categories.filter((category) => {
    const words = tokenize(
      [
        category.name,
        category.description,
        category.label,
        ...(category.keywords ?? []),
      ]
        .filter(Boolean)
        .join(" "),
    );

    return tokens.every((token) =>
      words.some((word) => scoreWord(token, word) > 0),
    );
  });
}

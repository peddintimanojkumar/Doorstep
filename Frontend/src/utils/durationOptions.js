// On-site duration options, based on the service's duration bucket
// (see data/services.js). Our own scheduling estimate, not a guaranteed
// job length — the exact time is confirmed with the professional.
const OPTIONS_BY_BUCKET = {
  "up-to-1h": [{ value: "1h", label: "1 hour" }],
  "1-3h": [
    { value: "1h", label: "1 hour" },
    { value: "2h", label: "2 hours" },
    { value: "3h", label: "3 hours" },
  ],
  ongoing: [
    { value: "half-day", label: "Half day (4 hours)" },
    { value: "full-day", label: "Full day (8 hours)" },
    {
      value: "multi-day",
      label: "Multiple days — I'll specify in requirements",
    },
  ],
};

const DEFAULT_BUCKET = "1-3h";

export function getDurationOptions(bucket) {
  return OPTIONS_BY_BUCKET[bucket] ?? OPTIONS_BY_BUCKET[DEFAULT_BUCKET];
}

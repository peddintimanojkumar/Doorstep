import { categoryGroups } from "./categories";

// Filter and sort configuration for the Services page. The UI, URL parsing,
// and active-filter chips are all generated from this — adding a filter
// means adding an entry here (and its test in utils/filterServices.js).
// An empty-string value always means "any" / no filter.

export const categoryOptions = categoryGroups.map(({ id, label }) => ({
  value: id === "all" ? "" : id,
  label,
}));

// Rendered in the filter sidebar. Category is handled by the chip row.
export const sidebarFilters = [
  {
    key: "type",
    label: "Service type",
    options: [
      { value: "", label: "Any" },
      { value: "one-time", label: "One-time" },
      { value: "long-term", label: "Long-term" },
    ],
  },
  {
    key: "price",
    label: "Starting price",
    options: [
      { value: "", label: "Any" },
      { value: "up-to-200", label: "Up to ₹200" },
      { value: "201-500", label: "₹201 – ₹500" },
      { value: "above-500", label: "Above ₹500" },
    ],
  },
  {
    key: "duration",
    label: "Duration",
    options: [
      { value: "", label: "Any" },
      { value: "up-to-1h", label: "Up to 1 hour" },
      { value: "1-3h", label: "1 – 3 hours" },
      { value: "ongoing", label: "Ongoing or multi-day" },
    ],
  },
  {
    key: "availability",
    label: "Availability",
    options: [
      { value: "", label: "Any" },
      { value: "on-demand", label: "On-demand (right now)" },
      { value: "scheduled", label: "Schedule ahead" },
    ],
  },
];

// Short names used in the removable "active filter" tags.
export const filterLabels = {
  category: "Category",
  type: "Type",
  price: "Price",
  duration: "Duration",
  availability: "Availability",
};

export const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A to Z" },
];

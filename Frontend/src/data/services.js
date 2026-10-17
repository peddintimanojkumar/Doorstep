// Per-service details, keyed by category slug. src/data/categories.js
// decides which services exist and owns their name/icon/group/keywords;
// this file adds only what categories.js doesn't have — descriptions,
// pricing, and scheduling metadata — so the two never duplicate each
// other. Consumed by services/api/servicesApi.js, which merges each
// entry onto its category to build the full catalogue.
//
// Fields:
//  - startingPrice / packages: only set where the business requirements
//    actually gave a number. Left unset (null / []), a service shows
//    "On request" instead of an invented price — never a guess.
//  - serviceTypes: ["one-time"] | ["long-term"] — ours to classify, not a
//    supplied fact; used by the Service Type filter.
//  - availability: "on-demand" | "scheduled" — likewise our own
//    classification, used by the Availability filter.
//  - duration: { bucket: "up-to-1h" | "1-3h" | "ongoing", label } | null —
//    a rough, human-facing estimate, not a guaranteed job length.
//  - popularRank: lower shows first under "Recommended"; unset (null)
//    means not featured as popular.

const serviceDetails = {
  instahelp: {
    shortDescription:
      "On-demand help for the everyday tasks that pile up — no long-term commitment.",
    serviceTypes: ["one-time"],
    availability: "on-demand",
    duration: { bucket: "up-to-1h", label: "Under 1 hour" },
  },
  "child-care": {
    shortDescription:
      "Attentive, background-checked care for your children at home.",
    serviceTypes: ["one-time"],
    availability: "scheduled",
    duration: { bucket: "1-3h", label: "A few hours" },
  },
  "elder-care": {
    shortDescription: "Dependable, respectful support for elders at home.",
    startingPrice: 500,
    popularRank: 2,
    serviceTypes: ["one-time"],
    availability: "scheduled",
    duration: { bucket: "1-3h", label: "A few hours" },
  },
  "long-term-care": {
    shortDescription:
      "Ongoing caregiver support for children or elders who need it daily.",
    serviceTypes: ["long-term"],
    availability: "scheduled",
    duration: { bucket: "ongoing", label: "Ongoing" },
  },
  "emergency-home-assistance": {
    shortDescription: "Fast help at home when something urgent comes up.",
    serviceTypes: ["one-time"],
    availability: "on-demand",
    duration: { bucket: "up-to-1h", label: "Under 1 hour" },
  },
  "senior-healthcare-companion": {
    shortDescription:
      "A companion for hospital visits — pickup, registration, and the trip back home.",
    serviceTypes: ["one-time"],
    availability: "scheduled",
    duration: { bucket: "1-3h", label: "A few hours" },
  },
  "nursing-specialized-care": {
    shortDescription:
      "Trained nursing support for specialized or ongoing medical needs.",
    serviceTypes: ["long-term"],
    availability: "scheduled",
    duration: { bucket: "ongoing", label: "Ongoing" },
  },
  "pet-care": {
    shortDescription: "Dog walking and pet sitting while you are busy or away.",
    startingPrice: 200,
    packages: [
      { name: "Dog Walking · 30 min", price: 200 },
      { name: "Dog Walking · 60 min", price: 350 },
      { name: "Pet Sitting · 2 hours", price: 500 },
    ],
    popularRank: 4,
    serviceTypes: ["one-time"],
    availability: "on-demand",
    duration: { bucket: "1-3h", label: "30 minutes to 2 hours" },
  },
  "plantation-gardening": {
    shortDescription: "Planting, lawn work, and general garden setup.",
    serviceTypes: ["one-time"],
    availability: "scheduled",
    duration: { bucket: "1-3h", label: "A few hours" },
  },
  "plant-maintenance": {
    shortDescription:
      "Regular watering and upkeep so your plants stay healthy.",
    serviceTypes: ["long-term"],
    availability: "scheduled",
    duration: { bucket: "ongoing", label: "Recurring visits" },
  },
  "plant-care-15-day": {
    shortDescription:
      "Plant watering and care while you're away for up to 15 days.",
    serviceTypes: ["long-term"],
    availability: "scheduled",
    duration: { bucket: "ongoing", label: "Up to 15 days" },
  },
  "chef-services": {
    shortDescription: "A full-time or part-time chef for home-cooked meals.",
    serviceTypes: ["long-term"],
    availability: "scheduled",
    duration: { bucket: "ongoing", label: "Full-time or part-time" },
  },
  "pre-party-services": {
    shortDescription: "Setup and decoration help ahead of your event.",
    serviceTypes: ["one-time"],
    availability: "scheduled",
    duration: { bucket: "1-3h", label: "A few hours" },
  },
  "post-party-cleaning": {
    shortDescription: "Cleanup after the celebration, so you don't have to.",
    serviceTypes: ["one-time"],
    availability: "on-demand",
    duration: { bucket: "1-3h", label: "A few hours" },
  },
  "home-cleaning": {
    shortDescription:
      "Room-by-room cleaning, from a single room to a full home deep clean.",
    startingPrice: 300,
    packages: [
      { name: "Single Room", price: 300 },
      { name: "Two Rooms", price: 500 },
      { name: "Three Rooms", price: 750 },
      { name: "Full Home", price: 1000 },
      { name: "Deep Cleaning", price: 2000, openEnded: true },
    ],
    popularRank: 1,
    serviceTypes: ["one-time"],
    availability: "scheduled",
    duration: { bucket: "1-3h", label: "A few hours" },
  },
  "bathroom-cleaning": {
    shortDescription: "A thorough clean for bathrooms and washrooms.",
    serviceTypes: ["one-time"],
    availability: "on-demand",
    duration: { bucket: "up-to-1h", label: "Under 1 hour" },
  },
  "kitchen-cleaning": {
    shortDescription: "Deep cleaning for kitchen surfaces, cabinets, and more.",
    serviceTypes: ["one-time"],
    availability: "on-demand",
    duration: { bucket: "up-to-1h", label: "Under 1 hour" },
  },
  "appliance-services": {
    shortDescription:
      "Cleaning and maintenance for fridges, washing machines, and more.",
    serviceTypes: ["one-time"],
    availability: "on-demand",
    duration: { bucket: "up-to-1h", label: "Under 1 hour" },
  },
  plumbing: {
    shortDescription:
      "Visits, minor repairs, and leakage fixes by trained plumbers.",
    startingPrice: 200,
    packages: [
      { name: "Visit", price: 200 },
      { name: "Minor Repair", price: 300 },
      { name: "Leakage Repair", price: 400, openEnded: true },
    ],
    popularRank: 3,
    serviceTypes: ["one-time"],
    availability: "on-demand",
    duration: { bucket: "up-to-1h", label: "Under 1 hour" },
  },
  electrical: {
    shortDescription:
      "Switch, socket, fan, and light work from trained electricians.",
    startingPrice: 200,
    packages: [
      { name: "Visit", price: 200 },
      { name: "Switch/Socket Replacement", price: 250 },
      { name: "Light Installation", price: 250 },
      { name: "Fan Installation", price: 400 },
    ],
    serviceTypes: ["one-time"],
    availability: "on-demand",
    duration: { bucket: "up-to-1h", label: "Under 1 hour" },
  },
  carpenter: {
    shortDescription:
      "Furniture repair and woodwork by experienced carpenters.",
    serviceTypes: ["one-time"],
    availability: "scheduled",
    duration: { bucket: "1-3h", label: "A few hours" },
  },
  "salon-women": {
    shortDescription: "Salon services for women, delivered at home.",
    serviceTypes: ["one-time"],
    availability: "scheduled",
    duration: { bucket: "up-to-1h", label: "Under 1 hour" },
  },
  "salon-men": {
    shortDescription: "Grooming and salon services for men, delivered at home.",
    serviceTypes: ["one-time"],
    availability: "on-demand",
    duration: { bucket: "up-to-1h", label: "Under 1 hour" },
  },
  "spa-wellness": {
    shortDescription: "Relaxing spa and wellness therapies at home.",
    serviceTypes: ["one-time"],
    availability: "scheduled",
    duration: { bucket: "1-3h", label: "A few hours" },
  },
  "vehicle-cleaning": {
    shortDescription:
      "Cleaning for your car and other vehicles, at your doorstep.",
    startingPrice: 150,
    popularRank: 5,
    serviceTypes: ["one-time"],
    availability: "on-demand",
    duration: { bucket: "up-to-1h", label: "Under 1 hour" },
  },
  "emergency-vehicle-assistance": {
    shortDescription: "Help when your vehicle breaks down unexpectedly.",
    serviceTypes: ["one-time"],
    availability: "on-demand",
    duration: { bucket: "up-to-1h", label: "Under 1 hour" },
  },
  "personal-assistance": {
    shortDescription: "An extra pair of hands for errands and daily tasks.",
    serviceTypes: ["one-time"],
    availability: "on-demand",
    duration: { bucket: "up-to-1h", label: "Under 1 hour" },
  },
  "security-services": {
    shortDescription: "Trained security personnel for your home.",
    serviceTypes: ["long-term"],
    availability: "scheduled",
    duration: { bucket: "ongoing", label: "Ongoing" },
  },
  "vacation-home-assistance": {
    shortDescription: "Someone to check on your home while you're travelling.",
    serviceTypes: ["long-term"],
    availability: "scheduled",
    duration: { bucket: "ongoing", label: "Ongoing" },
  },
  "move-in-out-cleaning": {
    shortDescription:
      "A thorough clean before you move in, or after you move out.",
    serviceTypes: ["one-time"],
    availability: "scheduled",
    duration: { bucket: "1-3h", label: "A few hours" },
  },
};

export default serviceDetails;

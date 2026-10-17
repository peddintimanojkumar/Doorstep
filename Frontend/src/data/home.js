// Homepage content. Icons are lucide names resolved via utils/iconMap.js.

export const popularSearches = [
  "I need a plumber",
  "I need someone to take care of my grandfather",
  "I need my car cleaned",
  "I need someone to take care of my plants",
];

export const heroPreview = {
  serviceName: "Home Cleaning",
  packageName: "Two Rooms",
  price: 500,
  steps: [
    { label: "Booking confirmed", state: "done" },
    { label: "Professional assigned", state: "done" },
    { label: "On the way", state: "current" },
    { label: "Completion evidence shared", state: "upcoming" },
  ],
};

export const howItWorksSteps = [
  {
    icon: "Search",
    title: "Choose a Service",
    description: "Browse categories or search for what you need.",
  },
  {
    icon: "ClipboardList",
    title: "Tell Us What You Need",
    description: "Share the details, date, time, and your location.",
  },
  {
    icon: "UserCheck",
    title: "Get Matched",
    description: "We match you with a verified professional near you.",
  },
  {
    icon: "CircleCheck",
    title: "Get It Done",
    description: "Your professional arrives and completes the job.",
  },
];

export const instaHelp = {
  title: "Need Help Right Now?",
  description:
    "InstaHelp is on-demand assistance for the everyday household jobs that pile up — a helping hand when you need one, without a long-term commitment.",
  cta: "Get InstaHelp",
  items: [
    { icon: "HandHelping", label: "General household assistance" },
    { icon: "Truck", label: "Furniture movement" },
    { icon: "ListChecks", label: "Small household tasks" },
    { icon: "Sparkles", label: "Basic cleaning" },
    { icon: "ShoppingBag", label: "Shopping assistance" },
    { icon: "Package", label: "Package collection" },
    { icon: "Wrench", label: "Minor repairs" },
    { icon: "Plug", label: "Appliance assistance" },
  ],
};

// Shaped like categories so they can reuse ServiceCategoryCard.
export const longTermServices = [
  { slug: "child-care", icon: "Baby", name: "Child care" },
  { slug: "elder-care", icon: "HeartHandshake", name: "Elder care" },
  { slug: "long-term-care", icon: "Users", name: "Caregivers" },
  { slug: "plant-maintenance", icon: "Leaf", name: "Plant maintenance" },
  { slug: "pet-care", icon: "PawPrint", name: "Pet care" },
  { slug: "chef-services", icon: "UtensilsCrossed", name: "Part-time chef" },
  { slug: "chef-services", icon: "ChefHat", name: "Full-time chef" },
];

export const healthcareJourney = [
  { icon: "MapPin", title: "Home Pickup" },
  { icon: "Car", title: "Hospital Travel" },
  { icon: "ClipboardList", title: "Registration" },
  { icon: "Stethoscope", title: "Consultation" },
  { icon: "Activity", title: "Tests / Follow-up" },
  { icon: "Home", title: "Return Home" },
  { icon: "MessageCircle", title: "Family Update" },
];

export const healthcareDisclaimer =
  "Medical diagnosis, prescriptions, dosage changes and medical decisions remain with qualified healthcare professionals.";

export const whyChooseUs = [
  {
    icon: "ShieldCheck",
    title: "Verified Professionals",
    description: "Professionals are verified before they can take bookings.",
  },
  {
    icon: "Home",
    title: "Doorstep Services",
    description: "Help comes to you — no travel and no waiting around.",
  },
  {
    icon: "CalendarClock",
    title: "Short-Term & Long-Term Assistance",
    description: "Book a one-time task or arrange ongoing support.",
  },
  {
    icon: "LayoutGrid",
    title: "Multiple Services in One Platform",
    description: "Cleaning, care, repairs, and more — all in one place.",
  },
  {
    icon: "IndianRupee",
    title: "Transparent Pricing",
    description: "See indicative prices up front, before you book.",
  },
  {
    icon: "MapPin",
    title: "Location-Based Matching",
    description: "Get matched with professionals near your address.",
  },
  {
    icon: "BellRing",
    title: "Service Status Updates",
    description: "Follow your booking from confirmation to completion.",
  },
  {
    icon: "Camera",
    title: "Completion Evidence",
    description: "Get proof that the job was done.",
  },
];

// Central route path constants so paths are never hand-typed (and risk
// typos) across Navbar, Footer, redirects, and <Link> usage.

export const ROUTES = {
  HOME: "/",
  SERVICES: "/services",
  SERVICE_DETAILS: "/services/:slug",
  serviceDetails: (slug) => `/services/${slug}`,
  BOOKING: "/booking",
  HOW_IT_WORKS: "/how-it-works",
  ABOUT: "/about",
  CONTACT: "/contact",
  FAQ: "/faq",
  BECOME_PROFESSIONAL: "/become-a-professional",
  LOGIN: "/login",
  REGISTER: "/register",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS: "/terms",

  // Customer
  DASHBOARD: "/dashboard",
  DASHBOARD_BOOKINGS: "/dashboard/bookings",
  DASHBOARD_PROFILE: "/dashboard/profile",

  DASHBOARD_ADDRESSES: "/dashboard/address",
  DASHBOARD_PAYMENT_METHODS: "/dashboard/payment-methods",
  DASHBOARD_SAVED_SERVICES: "/dashboard/saved-services",
  DASHBOARD_SETTINGS: "/dashboard/settings",
  // Backward-compatible alias for older components
  DASHBOARD_SETTING: "/dashboard/settings",
  DASHBOARD_HELP: "/dashboard/help",

  // Professional
  PROFESSIONAL: "/professional",
  PROFESSIONAL_REQUESTS: "/professional/requests",
  PROFESSIONAL_JOBS: "/professional/jobs",
  PROFESSIONAL_EARNINGS: "/professional/earnings",
  PROFESSIONAL_SCHEDULE: "/professional/schedule",
  PROFESSIONAL_PROFILE: "/professional/profile",
  PROFESSIONAL_DOCUMENTS: "/professional/documents",
  PROFESSIONAL_REVIEWS: "/professional/reviews",
  PROFESSIONAL_SETTINGS: "/professional/settings",
  PROFESSIONAL_HELP: "/professional/help",
  PROFESSIONAL_APPLY : "/professional/apply",


  // Admin
  ADMIN: "/admin",
  ADMIN_CUSTOMERS: "/admin/customers",
  ADMIN_PROFESSIONALS: "/admin/professionals",
  ADMIN_SERVICES: "/admin/services",
  ADMIN_BOOKINGS: "/admin/bookings",
  ADMIN_PAYMENTS: "/admin/payments",
  ADMIN_REVIEWS: "/admin/reviews",
  ADMIN_REPORTS: "/admin/reports",
  ADMIN_ANALYTICS: "/admin/analytics",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_HELP: "/admin/help",
};

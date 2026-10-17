import { ROUTES } from "../constants/routes";

// Single source of truth for the primary nav and footer link columns.
// Navbar, MobileMenu, and Footer all read from here — add a link once
// and it shows up everywhere it belongs.

export const mainNav = [
  { label: "Home", to: ROUTES.HOME },
  { label: "Services", to: ROUTES.SERVICES },
  { label: "How It Works", to: ROUTES.HOW_IT_WORKS },
  { label: "About", to: ROUTES.ABOUT },
  { label: "Become a Professional", to: ROUTES.BECOME_PROFESSIONAL },
  { label: "Contact", to: ROUTES.CONTACT },
];

// Items with `to: null` render as inactive text in the footer instead of a
// dead link, for pages that don't exist yet (e.g. a future Careers page).
export const footerNav = {
  company: [
    { label: "About Us", to: ROUTES.ABOUT },
    { label: "How It Works", to: ROUTES.HOW_IT_WORKS },
    { label: "Careers", to: null },
    { label: "Become a Professional", to: ROUTES.BECOME_PROFESSIONAL },
    { label: "Contact", to: ROUTES.CONTACT },
  ],
  services: [
    { label: "Home Services", to: ROUTES.SERVICES },
    { label: "Healthcare", to: ROUTES.SERVICES },
    { label: "Child & Elder Care", to: ROUTES.SERVICES },
    { label: "Pet Care", to: ROUTES.SERVICES },
    { label: "Vehicle Services", to: ROUTES.SERVICES },
    { label: "Personal Assistance", to: ROUTES.SERVICES },
  ],
  support: [
    { label: "Help Center", to: ROUTES.FAQ },
    { label: "FAQs", to: ROUTES.FAQ },
    { label: "Contact Support", to: ROUTES.CONTACT },
    { label: "Cancellation Policy", to: ROUTES.TERMS },
    { label: "Refund Policy", to: ROUTES.TERMS },
  ],
  legal: [
    { label: "Privacy Policy", to: ROUTES.PRIVACY_POLICY },
    { label: "Terms & Conditions", to: ROUTES.TERMS },
  ],
};

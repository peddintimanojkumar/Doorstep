import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Spinner from "../components/common/Spinner";
import { ROUTES } from "../constants/routes";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProfessionalLayout from "../layouts/ProfessionalLayout";
import AdminLayout from "../layouts/AdminLayout";

import CustomerRoute from "./CustomerRoute";
import ProfessionalRoute from "./ProfessionalRoute";
import AdminRoute from "./AdminRoute";
import BookingRoute from "./BookingRoute";

/* =========================================================
   PUBLIC PAGES
========================================================= */

const Home = lazy(() => import("../pages/Home"));
const Services = lazy(() => import("../pages/Services"));
const ServiceDetails = lazy(() => import("../pages/ServiceDetails"));
const Booking = lazy(() => import("../pages/Booking"));
const HowItWorks = lazy(() => import("../pages/HowItWorks"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const FAQ = lazy(() => import("../pages/FAQ"));
const BecomeProfessional = lazy(() => import("../pages/BecomeProfessional"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const Terms = lazy(() => import("../pages/Terms"));
const NotFound = lazy(() => import("../pages/NotFound"));

/* =========================================================
   CUSTOMER PAGES
========================================================= */

const CustomerDashboard = lazy(() => import("../pages/customer/Dashboard"));

const CustomerBookings = lazy(() => import("../pages/customer/Bookings"));

const CustomerProfile = lazy(() => import("../pages/customer/Profile"));

const CustomerAddresses = lazy(() => import("../pages/customer/Addresses"));

const CustomerPaymentMethods = lazy(
  () => import("../pages/customer/PaymentMethods"),
);

const CustomerSavedServices = lazy(
  () => import("../pages/customer/SavedServices"),
);

const CustomerSettings = lazy(() => import("../pages/customer/Settings"));

const CustomerHelp = lazy(() => import("../pages/customer/Help"));

/* =========================================================
   PROFESSIONAL PAGES
========================================================= */

const ProfessionalDashboard = lazy(
  () => import("../pages/professional/Dashboard"),
);
const ProfessionalApplication = lazy(
  () => import("../pages/ProfessionalApplication"),
);
const ProfessionalRequests = lazy(
  () => import("../pages/professional/Requests"),
);

const ProfessionalJobs = lazy(() => import("../pages/professional/Jobs"));

const ProfessionalEarnings = lazy(
  () => import("../pages/professional/Earnings"),
);

const ProfessionalSchedule = lazy(
  () => import("../pages/professional/Schedule"),
);

const ProfessionalProfile = lazy(() => import("../pages/professional/Profile"));

const ProfessionalDocuments = lazy(
  () => import("../pages/professional/Documents"),
);

const ProfessionalReviews = lazy(() => import("../pages/professional/Reviews"));

const ProfessionalSettings = lazy(
  () => import("../pages/professional/Settings"),
);

const ProfessionalHelp = lazy(() => import("../pages/professional/Help"));

/* =========================================================
   ADMIN PAGES
========================================================= */

const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));

const AdminCustomers = lazy(() => import("../pages/admin/Customers"));

const AdminProfessionals = lazy(() => import("../pages/admin/Professionals"));

const AdminServices = lazy(() => import("../pages/admin/Services"));

const AdminBookings = lazy(() => import("../pages/admin/Bookings"));

const AdminPayments = lazy(() => import("../pages/admin/Payments"));

const AdminReports = lazy(() => import("../pages/admin/Reports"));

const AdminReviews = lazy(() => import("../pages/admin/Reviews"));

const Analytics = lazy(() => import("../pages/admin/Analytics"));

const AdminSettings = lazy(() => import("../pages/admin/Settings"));

const AdminHelp = lazy(() => import("../pages/admin/Help"));

const AdminProfessionalApplications = lazy(
  () => import("../pages/admin/ProfessionalApplications"),
);
/* =========================================================
   ROUTE FALLBACK
========================================================= */

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner />
    </div>
  );
}

/* =========================================================
   APP ROUTES
========================================================= */

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* =================================================
            PUBLIC ROUTES
        ================================================= */}

        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />

          <Route path={ROUTES.SERVICES} element={<Services />} />

          <Route path={ROUTES.SERVICE_DETAILS} element={<ServiceDetails />} />

          <Route element={<BookingRoute />}>
            <Route path={ROUTES.BOOKING} element={<Booking />} />
          </Route>

          <Route path={ROUTES.HOW_IT_WORKS} element={<HowItWorks />} />

          <Route path={ROUTES.ABOUT} element={<About />} />

          <Route path={ROUTES.CONTACT} element={<Contact />} />

          <Route path={ROUTES.FAQ} element={<FAQ />} />

          <Route
            path={ROUTES.BECOME_PROFESSIONAL}
            element={<BecomeProfessional />}
          />
          {/* Public application form - no, login required */}
          <Route
            path={ROUTES.PROFESSIONAL_APPLY}
            element={<ProfessionalApplication />}
          />

          <Route path={ROUTES.LOGIN} element={<Login />} />

          <Route path={ROUTES.REGISTER} element={<Register />} />

          <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />

          <Route path={ROUTES.TERMS} element={<Terms />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* =================================================
            CUSTOMER ROUTES
        ================================================= */}

        <Route element={<CustomerRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<CustomerDashboard />} />

            <Route
              path={ROUTES.DASHBOARD_BOOKINGS}
              element={<CustomerBookings />}
            />

            <Route
              path={ROUTES.DASHBOARD_PROFILE}
              element={<CustomerProfile />}
            />

            <Route
              path={ROUTES.DASHBOARD_ADDRESSES}
              element={<CustomerAddresses />}
            />

            <Route
              path={ROUTES.DASHBOARD_PAYMENT_METHODS}
              element={<CustomerPaymentMethods />}
            />

            <Route
              path={ROUTES.DASHBOARD_SAVED_SERVICES}
              element={<CustomerSavedServices />}
            />

            <Route
              path={ROUTES.DASHBOARD_SETTINGS}
              element={<CustomerSettings />}
            />

            <Route path={ROUTES.DASHBOARD_HELP} element={<CustomerHelp />} />
          </Route>
        </Route>

        {/* =================================================
            PROFESSIONAL ROUTES
        ================================================= */}

        <Route element={<ProfessionalRoute />}>
          <Route element={<ProfessionalLayout />}>
            <Route
              path={ROUTES.PROFESSIONAL}
              element={<ProfessionalDashboard />}
            />
            <Route
              path={ROUTES.PROFESSIONAL_REQUESTS}
              element={<ProfessionalRequests />}
            />

            <Route
              path={ROUTES.PROFESSIONAL_JOBS}
              element={<ProfessionalJobs />}
            />

            <Route
              path={ROUTES.PROFESSIONAL_EARNINGS}
              element={<ProfessionalEarnings />}
            />

            <Route
              path={ROUTES.PROFESSIONAL_SCHEDULE}
              element={<ProfessionalSchedule />}
            />

            <Route
              path={ROUTES.PROFESSIONAL_PROFILE}
              element={<ProfessionalProfile />}
            />

            <Route
              path={ROUTES.PROFESSIONAL_DOCUMENTS}
              element={<ProfessionalDocuments />}
            />

            <Route
              path={ROUTES.PROFESSIONAL_REVIEWS}
              element={<ProfessionalReviews />}
            />

            <Route
              path={ROUTES.PROFESSIONAL_SETTINGS}
              element={<ProfessionalSettings />}
            />

            <Route
              path={ROUTES.PROFESSIONAL_HELP}
              element={<ProfessionalHelp />}
            />
          </Route>
        </Route>

        {/* =================================================
            ADMIN ROUTES
        ================================================= */}

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.ADMIN} element={<AdminDashboard />} />

            <Route path={ROUTES.ADMIN_CUSTOMERS} element={<AdminCustomers />} />

            <Route
              path={ROUTES.ADMIN_PROFESSIONALS}
              element={<AdminProfessionals />}
            />

            <Route path={ROUTES.ADMIN_SERVICES} element={<AdminServices />} />

            <Route path={ROUTES.ADMIN_BOOKINGS} element={<AdminBookings />} />

            <Route path={ROUTES.ADMIN_PAYMENTS} element={<AdminPayments />} />

            <Route path={ROUTES.ADMIN_REVIEWS} element={<AdminReviews />} />

            <Route path={ROUTES.ADMIN_REPORTS} element={<AdminReports />} />

            <Route path={ROUTES.ADMIN_ANALYTICS} element={<Analytics />} />

            <Route path={ROUTES.ADMIN_SETTINGS} element={<AdminSettings />} />

            <Route path={ROUTES.ADMIN_HELP} element={<AdminHelp />} />
            <Route
              path="/admin/professional-applications"
              element={<AdminProfessionalApplications />}
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

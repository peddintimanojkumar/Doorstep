import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  CreditCard,
  Heart,
  Home,
  LogOut,
  MapPin,
  Menu,
  Settings,
  UserRound,
  X,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";
import { mainNav } from "../data/navigation";

const NAV_ITEMS = [
  {
    label: "Overview",
    icon: Home,
    to: ROUTES.DASHBOARD,
    end: true,
  },
  {
    label: "Bookings",
    icon: CalendarDays,
    to: ROUTES.DASHBOARD_BOOKINGS,
    end: true,
  },
  {
    label: "Profile",
    icon: UserRound,
    to: ROUTES.DASHBOARD_PROFILE,
    end: true,
  },
];

const ADDITIONAL_ITEMS = [
  {
    label: "Addresses",
    icon: MapPin,
    to: ROUTES.DASHBOARD_ADDRESSES,
    end: true,
  },
  {
    label: "Payment Methods",
    icon: CreditCard,
    to: ROUTES.DASHBOARD_PAYMENT_METHODS,
    end: true,
  },
  {
    label: "Saved Services",
    icon: Heart,
    to: ROUTES.DASHBOARD_SAVED_SERVICES,
    end: true,
  },
  {
    label: "Settings",
    icon: Settings,
    to: ROUTES.DASHBOARD_SETTINGS,
    end: true,
  },
  {
    label: "Help & Support",
    icon: CircleHelp,
    to: ROUTES.DASHBOARD_HELP,
    end: true,
  },
];

function SidebarItem({ item, onNavigate }) {
  const Icon = item.icon;

  if (!item.to) {
    return (
      <button
        type="button"
        onClick={onNavigate}
        className="group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-[15px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#012663]"
      >
        <Icon className="h-5 w-5 shrink-0 text-slate-500 transition group-hover:text-[#012663]" />
        <span>{item.label}</span>
      </button>
    );
  }

  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        [
          "group relative flex items-center gap-4 rounded-xl px-4 py-3 text-[15px] font-medium transition",
          isActive
            ? "bg-[#E5F0FF] text-[#0561D8]"
            : "text-slate-600 hover:bg-slate-50 hover:text-[#012663]",
        ].join(" ")
      }
      onClick={onNavigate}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-[#1268E8]" />
          )}

          <Icon
            className={[
              "h-5 w-5 shrink-0",
              isActive ? "text-[#0561D8]" : "text-slate-500",
            ].join(" ")}
          />

          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { session, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const displayName = session?.name || "Customer";
  const accountType = session?.role || "Customer";

  const initials =
    displayName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  function handleLogout() {
    logout();
    navigate(ROUTES.LOGIN);
  }

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#F5F8FC] text-slate-900">
      {/* =========================================================
          TOP HEADER
      ========================================================= */}
      <header className="fixed inset-x-0 top-0 z-50 h-[72px] border-b border-slate-200 bg-white">
        <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-3"
              onClick={() => navigate(ROUTES.DASHBOARD)}
              aria-label="Go to dashboard"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#012663] text-white shadow-sm">
                <Home className="h-6 w-6" />
              </span>

              <span className="text-[26px] font-bold tracking-tight text-[#012663]">
                Doorstep
              </span>
            </button>
          </div>

          <nav
            className="hidden items-center gap-1 xl:flex"
            aria-label="Main site navigation"
          >
            {mainNav.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === ROUTES.HOME}
                className={({ isActive }) =>
                  [
                    "rounded-lg px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-[#012663] text-white"
                      : "text-slate-600 hover:bg-[#E5F0FF] hover:text-[#012663]",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to={ROUTES.BOOKING}
              className="ml-2 rounded-lg bg-[#012663] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#023B91]"
            >
              Book a Service
            </NavLink>
          </nav>

          {/* Desktop user section */}
          <div className="hidden items-center gap-5 md:flex">
            {/* Notification */}
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#012663] transition hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />

              <span className="absolute right-2 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
            </button>

            <div className="h-8 w-px bg-slate-200" />

            {/* User menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((value) => !value)}
                className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DCEAFF] text-lg font-semibold text-[#012663]">
                  {initials}
                </span>

                <span className="min-w-0 text-left">
                  <span className="block max-w-[160px] truncate text-sm font-semibold text-[#102A54]">
                    {displayName}
                  </span>

                  <span className="block text-sm text-slate-500">
                    {accountType}
                  </span>
                </span>

                <ChevronDown
                  className={[
                    "h-4 w-4 text-slate-500 transition",
                    profileMenuOpen ? "rotate-180" : "",
                  ].join(" ")}
                />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate(ROUTES.DASHBOARD_PROFILE);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <UserRound className="h-4 w-4" />
                    My profile
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#012663] hover:bg-slate-100 md:hidden"
            aria-label="Open dashboard menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* =========================================================
          DESKTOP SIDEBAR
      ========================================================= */}
      <aside className="fixed bottom-0 left-0 top-[72px] hidden w-[288px] border-r border-slate-200 bg-white md:block">
        <div className="flex h-full flex-col px-4 py-7">
          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <SidebarItem key={item.label} item={item} />
            ))}
          </nav>

          <div className="my-5 h-px bg-slate-100" />

          <nav className="space-y-2">
            {ADDITIONAL_ITEMS.map((item) => (
              <SidebarItem key={item.label} item={item} onNavigate={() => {}} />
            ))}
          </nav>

          {/* Logout */}
          <div className="mt-auto border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-[15px] font-semibold text-red-500 transition hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              Log out
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================
          MOBILE SIDEBAR
      ========================================================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          />

          <aside className="absolute bottom-0 left-0 top-[72px] w-[290px] overflow-y-auto bg-white shadow-2xl">
            <div className="p-4">
              <nav className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <SidebarItem
                    key={item.label}
                    item={item}
                    onNavigate={closeMobileMenu}
                  />
                ))}
              </nav>

              <div className="my-5 h-px bg-slate-100" />

              <nav className="space-y-2">
                {ADDITIONAL_ITEMS.map((item) => (
                  <SidebarItem
                    key={item.label}
                    item={item}
                    onNavigate={closeMobileMenu}
                  />
                ))}
              </nav>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left font-semibold text-red-500 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  Log out
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <main className="min-h-screen pt-[72px] md:pl-[288px]">
        <Outlet />
      </main>
    </div>
  );
}

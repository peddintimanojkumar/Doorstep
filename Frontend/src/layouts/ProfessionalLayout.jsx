import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  // CreditCard,
  FileText,
  HandCoins,
  Home,
  LogOut,
  Menu,
  Settings,
  Star,
  UserRound,
  X,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { useProfessionalJobs } from "../hooks/useProfessionalJobs";
import { ROUTES } from "../constants/routes";

const NAV_ITEMS = [
  {
    label: "Overview",
    icon: Home,
    to: ROUTES.PROFESSIONAL,
  },
  {
    label: "Requests",
    icon: ClipboardList,
    to: ROUTES.PROFESSIONAL_REQUESTS,
    badge: 2,
  },
  {
    label: "Jobs",
    icon: BriefcaseBusiness,
    to: ROUTES.PROFESSIONAL_JOBS,
  },
  {
    label: "Earnings",
    icon: HandCoins,
    to: ROUTES.PROFESSIONAL_EARNINGS,
  },
  {
    label: "Schedule",
    icon: CalendarDays,
    to: ROUTES.PROFESSIONAL_SCHEDULE,
  },
  {
    label: "Profile",
    icon: UserRound,
    to: ROUTES.PROFESSIONAL_PROFILE,
  },
  {
    label: "Documents",
    icon: FileText,
    to: ROUTES.PROFESSIONAL_DOCUMENTS,
  },
  {
    label: "Reviews",
    icon: Star,
    to: ROUTES.PROFESSIONAL_REVIEWS,
  },
  {
    label: "Settings",
    icon: Settings,
    to: ROUTES.PROFESSIONAL_SETTINGS,
  },
  {
    label: "Help & Support",
    icon: CircleHelp,
    to: ROUTES.PROFESSIONAL_HELP,
  },
];

function ProfessionalNavItem({ item, onNavigate, pendingCount = 0 }) {
  const Icon = item.icon;

  return (
    <NavLink
      end={item.to === ROUTES.PROFESSIONAL}
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          "group relative flex min-h-[52px] items-center gap-4 rounded-xl px-4 text-[15px] font-medium transition-all",
          isActive
            ? "bg-[#E6F0FF] text-[#0561D8]"
            : "text-[#31476A] hover:bg-slate-50 hover:text-[#012663]",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-[#1268E8]" />
          )}

          <Icon
            className={[
              "h-5 w-5 shrink-0",
              isActive
                ? "text-[#1268E8]"
                : "text-[#50627D] group-hover:text-[#012663]",
            ].join(" ")}
          />

          <span className="flex-1">{item.label}</span>

          {item.label === "Requests" && pendingCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white">
              {pendingCount}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

export default function ProfessionalLayout() {
  const navigate = useNavigate();
  const { session, logout } = useAuth();
  const { jobs = [] } = useProfessionalJobs();
  const pendingCount = Array.isArray(jobs)
    ? jobs.filter((job) => job.status === "pending").length
    : 0;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const displayName = session?.name || "Professional";

  const initials =
    displayName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "P";

  function handleLogout() {
    logout();
    navigate(ROUTES.LOGIN);
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="fixed inset-x-0 top-0 z-50 h-[64px] border-b border-slate-200 bg-white">
        <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate(ROUTES.PROFESSIONAL)}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#012663] text-white">
              <Home className="h-6 w-6" />
            </div>

            <div className="text-[25px] font-bold tracking-tight">
              <span className="text-[#102A54]">Doorstep</span>
              <span className="text-[#1268E8]"> Pro</span>
            </div>
          </button>

          {/* Desktop profile */}
          <div className="hidden items-center gap-5 md:flex">
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#012663] hover:bg-slate-100"
            >
              <Bell className="h-6 w-6" />

              <span className="absolute right-1.5 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
            </button>

            <div className="h-8 w-px bg-slate-200" />

            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((value) => !value)}
                className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-slate-50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E0EBF9] text-lg font-semibold text-[#123B78]">
                  {initials}
                </span>

                <span className="text-left">
                  <span className="block max-w-[170px] truncate text-sm font-semibold text-[#102A54]">
                    {displayName}
                  </span>

                  <span className="block text-xs text-slate-500">
                    Professional
                  </span>
                </span>

                <ChevronDown
                  className={[
                    "h-4 w-4 text-slate-500 transition",
                    profileOpen ? "rotate-180" : "",
                  ].join(" ")}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.PROFESSIONAL_PROFILE)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <UserRound className="h-4 w-4" />
                    My Profile
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#012663] hover:bg-slate-100 md:hidden"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}
      <aside className="fixed bottom-0 left-0 top-[64px] hidden w-[294px] border-r border-slate-200 bg-white md:block">
        <div className="flex h-full flex-col px-3 py-6">
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <ProfessionalNavItem
                key={item.label}
                item={item}
                pendingCount={pendingCount}
              />
            ))}
          </nav>

          <div className="mt-auto border-t border-slate-100 pt-5">
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

      {/* =====================================================
          MOBILE SIDEBAR
      ===================================================== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-slate-900/40"
            aria-label="Close menu"
          />

          <aside className="absolute bottom-0 left-0 top-[64px] w-[290px] overflow-y-auto bg-white shadow-2xl">
            <div className="p-4">
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <ProfessionalNavItem
                    key={item.label}
                    item={item}
                    onNavigate={() => setMobileOpen(false)}
                    pendingCount={pendingCount}
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

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <main className="min-h-screen pt-[64px] md:pl-[294px]">
        <Outlet />
      </main>
    </div>
  );
}

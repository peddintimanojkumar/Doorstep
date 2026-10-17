import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  // ChevronRight,
  CircleHelp,
  CreditCard,
  FileCheck,
  FileText,
  Home,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Users,
  UserRound,
  // BriefcaseBusiness,
  X,
  Wrench,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: Home,
    to: "/admin",
  },
  {
    label: "Bookings",
    icon: CalendarDays,
    to: "/admin/bookings",
  },
  {
    label: "Customers",
    icon: Users,
    to: "/admin/customers",
  },
  {
    label: "Professionals",
    icon: UserRound,
    to: "/admin/professionals",
  },

  {
    label: "Professional Applications",
    icon: FileCheck,
    to: "/admin/professional-applications",
  },

  {
    label: "Services",
    icon: Wrench,
    to: "/admin/services",
  },

  {
    label: "Payments",
    icon: CreditCard,
    to: "/admin/payments",
  },
  {
    label: "Reviews",
    icon: ShieldCheck,
    to: "/admin/reviews",
  },
  {
    label: "Reports",
    icon: FileText,
    to: "/admin/reports",
    expandable: true,
  },
  {
    label: "Analytics",
    icon: BarChart3,
    to: "/admin/analytics",
  },
  {
    label: "Settings",
    icon: Settings,
    to: "/admin/settings",
    expandable: true,
  },
];
const HELP_ITEM = {
  label: "Help & Support",
  icon: CircleHelp,
  to: "/admin/help",
};

export default function AdminLayout() {
  const navigate = useNavigate();
  const { session, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const displayName = session?.name || "Manupeddinti";

  const initials =
    displayName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "A";

  function handleLogout() {
    logout();
    navigate(ROUTES.LOGIN);
  }

  function handleSearch(event) {
    if (event.key === "Enter") {
      const value = search.trim();

      if (value) {
        console.log("Admin search:", value);
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#E5E7EB]">
      {/* =====================================================
          TOP HEADER
      ===================================================== */}
      <header className="fixed inset-x-0 top-0 z-50 h-[64px] border-b border-slate-200 bg-white">
        <div className="flex h-full items-center">
          {/* Logo section */}
          <div className="flex h-full w-auto shrink-0 items-center border-r border-slate-200 px-3 sm:px-5 md:w-[286px] md:px-7">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#012663] text-white">
                <Home className="h-6 w-6" />
              </span>

              <span className="text-[25px] font-bold tracking-tight text-[#102A54]">
                Doorstep
              </span>

              <span className=" hidden rounded-md bg-[#1268E8] px-2 py-1 text-xs font-bold text-white">
                Admin
              </span>
            </button>
          </div>

          {/* Search */}
          <div className="flex min-w-0 flex-1 items-center gap-4 px-5 lg:px-8">
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="flex h=10 w-10 shrink-0 items-center justify-center rounded-lg text-[#123B78] hover:bg-slate-100 md:flex"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="relative hidden w-full max-w-[500px] sm:block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search customers, bookings, professionals..."
                className="h-10 w-full rounded-xl border border-transparent bg-[#F1F4F9] pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#B9D3F7] focus:bg-white focus:ring-4 focus:ring-[#1268E8]/10"
              />
            </div>
          </div>

          {/* Right header */}
          <div className="flex items-center gap-4 px-4 sm:px-6">
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#102A54] hover:bg-slate-100"
            >
              <Bell className="h-5 w-5" />

              <span className="absolute right-1.5 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
            </button>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((value) => !value)}
                className="flex items-center gap-3 rounded-xl px-1.5 py-1 transition hover:bg-slate-50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DCEAFF] text-lg font-semibold text-[#123B78]">
                  {initials}
                </span>

                <span className="hidden text-left lg:block">
                  <span className="block max-w-[150px] truncate text-sm font-semibold text-[#102A54]">
                    {displayName}
                  </span>

                  <span className="block text-xs text-slate-500">
                    Administrator
                  </span>
                </span>

                <ChevronDown className="hidden h-4 w-4 text-slate-500 lg:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/admin/settings");
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
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
        </div>
      </header>
      {/* =====================================================
    DESKTOP SIDEBAR
===================================================== */}

      <aside className="fixed bottom-0 left-0 top-[64px] z-40 hidden w-[286px] bg-[#102A46] md:block">
        <div className="flex h-full min-h-0 flex-col px-3 py-5">
          {/* MAIN NAVIGATION */}

          <nav className="min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === "/admin"}
                  className={({ isActive }) =>
                    [
                      "group relative flex h-[47px] shrink-0 items-center gap-4 rounded-xl px-4 text-sm font-medium transition",
                      isActive
                        ? "bg-[#1268E8] text-white shadow-sm"
                        : "text-[#D5DFEC] hover:bg-white/10 hover:text-white",
                    ].join(" ")
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={[
                          "h-5 w-5 shrink-0",
                          isActive ? "text-white" : "text-[#C2D0E2]",
                        ].join(" ")}
                        aria-hidden="true"
                      />

                      <span className="flex-1">{item.label}</span>

                      {item.expandable && (
                        <ChevronDown
                          className={[
                            "h-4 w-4 shrink-0",
                            isActive ? "text-white" : "text-[#AABBD0]",
                          ].join(" ")}
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* =================================================
        BOTTOM NAVIGATION
    ================================================= */}

          <div className="mt-4 shrink-0 border-t border-white/10 pt-4">
            {/* HELP & SUPPORT */}

            <NavLink
              to={HELP_ITEM.to}
              className={({ isActive }) =>
                [
                  "group flex h-[47px] items-center gap-4 rounded-xl px-4 text-sm font-medium transition",
                  isActive
                    ? "bg-[#1268E8] text-white shadow-sm"
                    : "text-[#D5DFEC] hover:bg-white/10 hover:text-white",
                ].join(" ")
              }
              onClick={() => setMobileOpen(false)}
            >
              {({ isActive }) => {
                const Icon = HELP_ITEM.icon;

                return (
                  <>
                    <Icon
                      className={[
                        "h-5 w-5 shrink-0",
                        isActive ? "text-white" : "text-[#C2D0E2]",
                      ].join(" ")}
                      aria-hidden="true"
                    />

                    <span className="flex-1">{HELP_ITEM.label}</span>
                  </>
                );
              }}
            </NavLink>

            {/* LOG OUT */}

            <div className="mt-2 border-t border-white/10 pt-3">
              <button
                type="button"
                onClick={handleLogout}
                className="flex h-[47px] w-full items-center gap-4 rounded-xl px-4 text-left text-sm font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />

                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
      {/* =====================================================
          MOBILE SIDEBAR
      ===================================================== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/40"
            aria-label="Close sidebar"
          />

          <aside className="absolute bottom-0 left-0 top-0 w-[286px] bg-[#102A46] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <span className="text-xl font-bold text-white">Doorstep</span>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-1.5 px-3 py-5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    end={item.to === "/admin"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      [
                        "flex h-[47px] items-center gap-4 rounded-xl px-4 text-sm font-medium",
                        isActive
                          ? "bg-[#1268E8] text-white"
                          : "text-[#D5DFEC] hover:bg-white/10",
                      ].join(" ")
                    }
                  >
                    <Icon className="h-5 w-5 shrink-0" />

                    <span>{item.label}</span>
                  </NavLink>
                );
              })}

              {/* Mobile Help */}

              <div className="my-4 border-t border-white/10 pt-4">
                <NavLink
                  to={HELP_ITEM.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    [
                      "flex h-[47px] items-center gap-4 rounded-xl px-4 text-sm font-medium",
                      isActive
                        ? "bg-[#1268E8] text-white"
                        : "text-[#D5DFEC] hover:bg-white/10",
                    ].join(" ")
                  }
                >
                  <HELP_ITEM.icon className="h-5 w-5 shrink-0" />

                  <span>{HELP_ITEM.label}</span>
                </NavLink>
              </div>

              {/* Mobile Logout */}

              <button
                type="button"
                onClick={handleLogout}
                className="flex h-[47px] w-full items-center gap-4 rounded-xl px-4 text-left text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
              >
                <LogOut className="h-5 w-5 shrink-0" />

                <span>Log out</span>
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}
      <main className="min-h-screen pt-[64px] md:pl-[286px]">
        <Outlet />
      </main>
    </div>
  );
}

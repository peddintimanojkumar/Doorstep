import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, ChevronDown, LogOut, UserRound } from "lucide-react";

import Button from "../common/Button";
import MobileMenu from "./MobileMenu";
import brand from "../../config/brand";
import { ROUTES } from "../../constants/routes";
import { mainNav } from "../../data/navigation";
import { useAuth } from "../../hooks/useAuth";
/**
 * Navbar
 * Sticky site header with animated navigation and CTA buttons.
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const navigate = useNavigate();
  const { session, isAuthenticated, logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const displayName = session?.name || "My account";

  function handleLogout() {
    logout();
    setProfileMenuOpen(false);
    setMobileOpen(false);
    navigate(ROUTES.LOGIN, { replace: true });
  }

  function handleProfile() {
    setProfileMenuOpen(false);

    if (session?.role === "customer") {
      navigate(ROUTES.DASHBOARD);
    } else if (session?.role === "professional") {
      navigate(ROUTES.PROFESSIONAL);
    } else if (session?.role === "admin") {
      navigate(ROUTES.ADMIN);
    } else {
      navigate(ROUTES.LOGIN);
    }
  }

  return (
    <>
      <header
        className="
        sticky
        top-0
        z-40
        border-b
        border-stone-200
        bg-[#F3F4F6]
        backdrop-blur
      "
      >
        <div className="container flex h-16 items-center justify-between gap-6">
          {/* Logo / Brand */}
          <NavLink
            to={ROUTES.HOME}
            className="
            group
            flex
            shrink-0
            items-center
            gap-2
            transition-all
            duration-300
            ease-out
            hover:-translate-y-0.5
          "
          >
            <img
              src={brand.logo.iconSrc}
              alt={brand.logo.alt}
              className="
              h-8
              w-8
              transition-transform
              duration-300
              ease-out
              group-hover:scale-110
            "
            />

            <span
              className="
              font-display
              text-xl
              text-ink-800
              transition-colors
              duration-300
              group-hover:text-[#012663]
            "
            >
              {brand.name}
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {mainNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === ROUTES.HOME}
                className={({ isActive }) =>
                  `
                  group
                  relative
                  inline-flex
                  items-center
                  rounded-control
                  px-4
                  py-2
                  text-sm
                  transition-all
                  duration-300
                  ease-out
                  hover:-translate-y-1
                  hover:scale-105

                  ${
                    isActive
                      ? "bg-[#012663] font-semibold text-white shadow-rest"
                      : "text-ink-600 hover:bg-[#012663] hover:text-white hover:shadow-rest"
                  }
                `
                }
              >
                {item.label}

                <span
                  className="
                  absolute
                  bottom-0
                  left-1/2
                  h-0.5
                  w-0
                  -translate-x-1/2
                  rounded-full
                  bg-white
                  transition-all
                  duration-300
                  group-hover:w-3/4
                "
                />
              </NavLink>
            ))}
          </nav>

          {/* Desktop Buttons */}
     
{/* Desktop Buttons */}
<div className="hidden items-center gap-2 lg:flex">
  {isAuthenticated ? (
    <div className="relative">
      <button
        type="button"
        onClick={() => setProfileMenuOpen((open) => !open)}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-[#012663] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50"
        aria-expanded={profileMenuOpen}
        aria-haspopup="menu"
      >
        <UserRound className="h-5 w-5" aria-hidden="true" />

        <span className="max-w-36 truncate text-sm font-semibold">
          {displayName}
        </span>

        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </button>

      {profileMenuOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-stone-200 bg-white py-2 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleProfile}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-[#012663] hover:bg-blue-50"
          >
            <UserRound className="h-4 w-4" aria-hidden="true" />
            My profile
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Log out
          </button>
        </div>
      )}
    </div>
  ) : (
    <Button
      to={ROUTES.LOGIN}
      variant="ghost"
      size="sm"
      className="text-[#012663] transition-all duration-300 hover:-translate-y-1 hover:bg-[#012663] hover:text-white"
    >
      Log in
    </Button>
  )}

  <Button
    to={ROUTES.BOOKING}
    size="sm"
    className="bg-[#012663] text-white shadow-rest transition-all duration-300 hover:-translate-y-1 hover:bg-[#023B91] hover:scale-105"
  >
    Book a Service
  </Button>
</div>


          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="
            rounded-control
            p-2
            text-ink-600
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-[#F3F4F6]
            hover:text-white
            lg:hidden
          "
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* IMPORTANT:
        MobileMenu must be OUTSIDE the header */}
      {mobileOpen && (
        <MobileMenu
          onClose={() => setMobileOpen(false)}
          triggerRef={menuButtonRef}
        />
      )}
    </>
  );
}

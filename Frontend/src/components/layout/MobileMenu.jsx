import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import Button from "../common/Button";
import brand from "../../config/brand";
import { ROUTES } from "../../constants/routes";
import { mainNav } from "../../data/navigation";

/**
 * MobileMenu
 * Full-screen slide-in drawer for the primary nav on small screens. Only
 * mounted while open, so its effects run for exactly the drawer's lifetime:
 * it locks page scroll, moves focus to the close button, returns focus to
 * whatever triggered it on close, and closes on Escape or a backdrop click.
 *
 * Props:
 *  - onClose: () => void
 *  - triggerRef: ref to the button that opened the menu, so focus returns
 *    there when the drawer closes
 */
export default function MobileMenu({ onClose, triggerRef }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef?.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-[100] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-ink-900/40"
        onClick={onClose}
      />

      <div className="relative ml-auto flex h-full w-full max-w-sm flex-col bg-white shadow-lifted">
        <div className="flex h-16 items-center justify-between border-b border-stone-200 px-6">
          <span className="font-display text-lg text-ink-800">
            {brand.name}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-control p-2 text-ink-500 hover:bg-stone-100 hover:text-ink-800"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
          {mainNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === ROUTES.HOME}
              onClick={onClose}
              className={({ isActive }) =>
                `rounded-control px-3 py-3 text-base ${
                  isActive
                    ? "bg-fern-50 font-medium text-fern-700"
                    : "text-ink-600 hover:bg-stone-50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-3 border-t border-stone-200 p-4">
          <Button
            to={ROUTES.LOGIN}
            variant="secondary"
            onClick={onClose}
            className="w-full"
          >
            Log in
          </Button>
          <Button to={ROUTES.BOOKING} onClick={onClose} className="w-full">
            Book a Service
          </Button>
        </div>
      </div>
    </div>
  );
}

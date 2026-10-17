
import { timeSlots } from "./timeSlots";

/** Format a booking date from the backend or a date-only value. */
export function formatBookingDate(value) {
  if (!value) return "—";

  // Accept both "2026-11-04" and full ISO dates from the backend.
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const date = dateOnly
    ? new Date(`${value}T00:00:00`)
    : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date not available";
  }

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

/** "14:00" -> "2:00 PM" */

/** Format a time from a booking timestamp or a time-slot value. */
export function formatBookingTime(value) {
  if (!value) return "Time not available";

  // Full ISO timestamp returned by the backend
  if (typeof value === "string" && value.includes("T")) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Time not available";
    }

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  }

  // Existing time-slot values, such as "14:00"
  return timeSlots.find((slot) => slot.value === value)?.label ?? value;
}


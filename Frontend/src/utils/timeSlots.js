// Hourly booking slots, 8 AM to 8 PM. A mock schedule — real availability
// will come from professional scheduling data once that exists.
export const timeSlots = Array.from({ length: 13 }, (_, index) => {
  const hour24 = 8 + index;
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = ((hour24 + 11) % 12) + 1;
  return {
    value: `${String(hour24).padStart(2, "0")}:00`,
    label: `${hour12}:00 ${period}`,
  };
});

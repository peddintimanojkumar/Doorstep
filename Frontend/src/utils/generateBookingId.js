/** Mock booking reference — a real backend would issue this. */
export function generateBookingId() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `DR-${random}`;
}

/** "n days from today" as an ISO date string ("YYYY-MM-DD"). Negative n is in the past. */
export function isoDaysFromNow(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

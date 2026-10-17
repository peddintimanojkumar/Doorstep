/**
 * Turns a login identifier into a plausible display name for the mock
 * session — there's no real account to look up yet.
 * "jane.doe82@example.com" -> "Jane Doe"; a phone number -> "There".
 */
export function deriveNameFromIdentifier(identifier) {
  const emailMatch = identifier.match(/^([^@]+)@/);
  const base = emailMatch ? emailMatch[1] : identifier;
  const cleaned = base.replace(/[^a-zA-Z]+/g, " ").trim();
  if (!cleaned) return "There";
  return cleaned.replace(/\b\w/g, (char) => char.toUpperCase());
}

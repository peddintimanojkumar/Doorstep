const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** formatCurrency(2000) -> "₹2,000" */
export function formatCurrency(amount) {
  return formatter.format(amount);
}

/** Package prices marked `openEnded` render as "₹2,000+" (final price varies). */
export function formatPackagePrice(pkg) {
  const base = formatCurrency(pkg.price);
  return pkg.openEnded ? `${base}+` : base;
}

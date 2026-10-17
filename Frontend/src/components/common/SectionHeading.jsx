/**
 * SectionHeading
 * Left-aligned section title + description, with an optional `action`
 * node (usually a link) aligned to the right on wider screens.
 */
export default function SectionHeading({
  title,
  description,
  action,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}
    >
      <div className="max-w-2xl">
        <h2 className="text-3xl leading-tight tracking-tight sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-lg text-ink-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

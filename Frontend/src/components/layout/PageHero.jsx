/**
 * PageHero
 * Title band for inner pages. `children` (optional) renders below the
 * description, e.g. a search field.
 */
export default function PageHero({ title, description, children }) {
  return (
    <section className="border-b border-stone-200 bg-stone-50">
      <div className="container py-12 sm:py-16">
        <h1 className="text-4xl leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-ink-500">{description}</p>
        )}
        {children && <div className="mt-8 max-w-xl">{children}</div>}
      </div>
    </section>
  );
}

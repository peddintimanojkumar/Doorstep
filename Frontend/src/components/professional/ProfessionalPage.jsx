import { usePageMeta } from "../../hooks/usePageMeta";
import brand from "../../config/brand";

export function ProfessionalPage({ title, description, children, actions }) {
  usePageMeta({ title: `${title} — ${brand.name} Pro` });
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#102A54]">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}

import { Star } from "lucide-react";
import { ProfessionalPage } from "../../components/professional/ProfessionalPage";
import { professionalReviews } from "../../data/professionalReviews";

export default function ProfessionalReviews() {
  const average =
    professionalReviews.reduce((sum, r) => sum + r.rating, 0) /
    professionalReviews.length;
  return (
    <ProfessionalPage
      title="Customer Reviews"
      description="See what customers are saying about your service quality."
    >
      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-5xl font-bold text-[#102A54]">
            {average.toFixed(1)}
          </p>
          <div className="mt-2 flex justify-center gap-1 text-orange-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-5 w-5 ${s <= Math.round(average) ? "fill-current" : ""}`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Based on {professionalReviews.length} reviews
          </p>
        </section>
        <section className="space-y-4">
          {professionalReviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold text-[#102A54]">
                    {review.customerName}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {review.serviceName} · {review.date}
                  </p>
                </div>
                <div className="flex gap-1 text-orange-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${s <= review.rating ? "fill-current" : ""}`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {review.comment}
              </p>
            </article>
          ))}
        </section>
      </div>
    </ProfessionalPage>
  );
}

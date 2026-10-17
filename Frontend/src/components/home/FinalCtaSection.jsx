import Button from "../common/Button";
import { ROUTES } from "../../constants/routes";

export default function FinalCtaSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <div className="rounded-card bg-marigold-50 px-8 py-12 sm:px-12 sm:py-16">
          <h2 className="max-w-xl text-3xl leading-tight tracking-tight sm:text-4xl">
            Need help at home?
          </h2>
          <p className="mt-3 max-w-xl text-lg text-ink-600">
            Tell us what you need and we’ll match you with a verified
            professional.
          </p>
          <Button to={ROUTES.BOOKING} size="lg" className="mt-8">
            Book a Service
          </Button>
        </div>
      </div>
    </section>
  );
}

import { Info } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import StepList from "../common/StepList";
import { healthcareJourney, healthcareDisclaimer } from "../../data/home";

export default function HealthcareSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          title="Healthcare Companion"
          description="Someone dependable by your family’s side — from the front door to the hospital and back."
        />

        <div className="mt-12">
          <StepList steps={healthcareJourney} columns={7} />
        </div>

        <div className="mt-12 flex items-start gap-3 rounded-card border border-marigold-200 bg-marigold-50 p-5">
          <Info
            className="mt-0.5 h-5 w-5 shrink-0 text-marigold-600"
            aria-hidden="true"
          />
          <p className="text-sm text-ink-600">{healthcareDisclaimer}</p>
        </div>
      </div>
    </section>
  );
}

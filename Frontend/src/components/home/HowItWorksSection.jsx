import SectionHeading from "../common/SectionHeading";
import StepList from "../common/StepList";
import { howItWorksSteps } from "../../data/home";

export default function HowItWorksSection() {
  return (
    <section className="bg-stone-50 py-16 sm:py-20 bg-[#F3F4F6] border-b border-stone-200">
      <div className="container">
        <SectionHeading
          title="How it works"
          description="Getting help takes four simple steps."
        />
        <div className="mt-12">
          <StepList steps={howItWorksSteps} columns={4} showNumbers />
        </div>
      </div>
    </section>
  );
}

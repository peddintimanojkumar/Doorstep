import HeroSection from "../components/home/HeroSection";
import CategoriesSection from "../components/home/CategoriesSection";
import InstaHelpSection from "../components/home/InstaHelpSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import PopularServicesSection from "../components/home/PopularServicesSection";
import LongTermSection from "../components/home/LongTermSection";
import HealthcareSection from "../components/home/HealthcareSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import FinalCtaSection from "../components/home/FinalCtaSection";
import { usePageMeta } from "../hooks/usePageMeta";
import brand from "../config/brand";

export default function Home() {
  usePageMeta({
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
  });

  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <InstaHelpSection />
      <HowItWorksSection />
      <PopularServicesSection />
      <LongTermSection />
      <HealthcareSection />
      <WhyChooseUsSection />
      <FinalCtaSection />
    </>
  );
}

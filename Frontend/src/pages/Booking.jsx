import PageContainer from "../components/layout/PageContainer";
import { usePageMeta } from "../hooks/usePageMeta";
import BookingStepper from "../components/bookings/BookingStepper";
import brand from "../config/brand";

export default function Booking() {
  usePageMeta({
    title: `Book a service — ${brand.name}`,
    description: "Book a verified professional in a few simple steps.",
  });

  return (
    <section className="py-12 sm:py-16">
      <PageContainer className="max-w-3xl">
        <h1 className="sr-only">Book a service</h1>
        <BookingStepper />
      </PageContainer>
    </section>
  );
}

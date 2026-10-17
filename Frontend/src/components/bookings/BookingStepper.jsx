import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useServiceCatalog } from "../../hooks/useServices";
import { useBooking } from "../../hooks/useBooking";
import { useBookings } from "../../hooks/useBookings";
import Skeleton from "../common/Skeleton";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";
import ServiceSelector from "./ServiceSelector";
import PackageSelector from "./PackageSelector";
import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";
import DurationSelector from "./DurationSelector";
import LocationSelector from "./LocationSelector";
import RequirementForm from "./RequirementForm";
import BookingSummary from "./BookingSummary";
import BookingConfirmation from "./BookingConfirmation";

function buildSteps(hasPackages) {
  const steps = [{ id: "service", label: "Service" }];
  if (hasPackages) steps.push({ id: "package", label: "Package" });
  steps.push(
    { id: "date", label: "Date" },
    { id: "time", label: "Time" },
    { id: "duration", label: "Duration" },
    { id: "location", label: "Location" },
    { id: "requirements", label: "Requirements" },
    { id: "review", label: "Review" },
  );
  return steps;
}

/**
 * BookingStepper
 * Orchestrates the multi-step booking flow: computes the step list for the
 * currently-selected service, renders the active step, and shows a
 * progress indicator. Navigation is one step at a time (Back/Continue) —
 * see useBooking.js for why that keeps step indices always valid.
 */
export default function BookingStepper() {
  const { addBooking } = useBookings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [searchParams] = useSearchParams();
  const { data: catalog, isPending, isError, refetch } = useServiceCatalog();

  const booking = useBooking({
    serviceSlug: searchParams.get("service") ?? "",
    packageName: searchParams.get("package") ?? "",
  });
  const {
    draft,
    updateDraft,
    selectService,
    stepIndex,
    goNext,
    goBack,
    confirmation,
    setConfirmation,
  } = booking;

  const selectedService =
    catalog?.find((service) => service.slug === draft.serviceSlug) ?? null;
  async function handleConfirm() {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      if (!selectedService?.id) {
        throw new Error("Please select a valid service.");
      }

      if (!draft.addressId) {
        throw new Error("Please select a saved address.");
      }

      if (!draft.date || !draft.time) {
        throw new Error("Please select a booking date and time.");
      }

      // The booking API expects a valid date-time.
      const timeMatch = draft.time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);

      if (!timeMatch) {
        throw new Error("Please select a valid booking time.");
      }

      let hours = Number(timeMatch[1]);
      const minutes = Number(timeMatch[2]);
      const period = timeMatch[3]?.toUpperCase();

      if (period) {
        if (hours < 1 || hours > 12) {
          throw new Error("Please select a valid booking time.");
        }

        hours = hours % 12;

        if (period === "PM") hours += 12;
      }

      const [year, month, day] = draft.date.split("-").map(Number);

      const bookingDate = new Date(year, month - 1, day, hours, minutes);

      if (Number.isNaN(bookingDate.getTime())) {
        throw new Error("Please select a valid booking date and time.");
      }

      if (bookingDate <= new Date()) {
        throw new Error("Please select a future booking date and time.");
      }

      const savedBooking = await addBooking({
        serviceId: selectedService.id,
        addressId: draft.addressId,
        bookingDate: bookingDate.toISOString(),
        notes: draft.notes || "",
      });

      setConfirmation({
        ...savedBooking,
        id: savedBooking.id,
        createdAt: savedBooking.createdAt,
      });
    } catch (error) {
      setSubmitError(
        error.response?.data?.message ||
          error.message ||
          "Unable to create your booking. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  const steps = useMemo(
    () => buildSteps(Boolean(selectedService?.packages?.length)),
    [selectedService],
  );
  const currentStep = steps[Math.min(stepIndex, steps.length - 1)];

  if (isPending) {
    return <Skeleton className="h-[28rem] w-full" />;
  }

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  if (!catalog || catalog.length === 0) {
    return (
      <EmptyState
        title="No services available"
        description="Please check back shortly."
      />
    );
  }

  if (confirmation) {
    return (
      <BookingConfirmation
        confirmation={confirmation}
        service={selectedService}
        draft={draft}
      />
    );
  }

  return (
    <div>
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-3">
        {steps.map((step, index) => {
          const state =
            index < stepIndex
              ? "done"
              : index === stepIndex
                ? "current"
                : "upcoming";
          return (
            <li key={step.id} className="flex items-center">
              <span className="flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${
                    state === "done"
                      ? "bg-fern-600 text-white"
                      : state === "current"
                        ? "bg-fern-100 text-fern-800 ring-2 ring-fern-500"
                        : "bg-stone-100 text-ink-400"
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`text-xs ${state === "upcoming" ? "text-ink-400" : "text-ink-700"}`}
                >
                  {step.label}
                </span>
              </span>
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="mx-2 h-px w-4 bg-stone-200 sm:w-8"
                />
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-8">
        {currentStep.id === "service" && (
          <ServiceSelector
            catalog={catalog}
            value={draft.serviceSlug}
            onSelect={selectService}
          />
        )}

        {currentStep.id === "package" && selectedService && (
          <PackageSelector
            service={selectedService}
            value={draft.packageName}
            onNext={(packageName) => {
              updateDraft({ packageName });
              goNext();
            }}
            onBack={goBack}
          />
        )}

        {currentStep.id === "date" && (
          <DateSelector
            value={draft.date}
            onNext={(date) => {
              updateDraft({ date });
              goNext();
            }}
            onBack={goBack}
          />
        )}

        {currentStep.id === "time" && (
          <TimeSelector
            value={draft.time}
            onNext={(time) => {
              updateDraft({ time });
              goNext();
            }}
            onBack={goBack}
          />
        )}

        {currentStep.id === "duration" && selectedService && (
          <DurationSelector
            service={selectedService}
            value={draft.duration}
            onNext={(duration) => {
              updateDraft({ duration });
              goNext();
            }}
            onBack={goBack}
          />
        )}

        {currentStep.id === "location" && (
          <LocationSelector
            value={{
              address: draft.addressId,
              // eslint-disable-next-line no-dupe-keys
              address: draft.address,

              city: draft.city,
              state : draft.state,
              pincode: draft.pincode,
              landmark: draft.landmark,
            }}
            onNext={(location) => {
              updateDraft(location);
              goNext();
            }}
            onBack={goBack}
          />
        )}

        {currentStep.id === "requirements" && (
          <RequirementForm
            value={draft.notes}
            onNext={(notes) => {
              updateDraft({ notes });
              goNext();
            }}
            onBack={goBack}
          />
        )}

        {currentStep.id === "review" && selectedService && (
          <>
            <BookingSummary
              service={selectedService}
              draft={draft}
              onBack={goBack}
              onConfirm={handleConfirm}
              isSubmitting={isSubmitting}
            />
            {submitError && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                {submitError}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

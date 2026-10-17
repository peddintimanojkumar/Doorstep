import { useMemo, useState } from "react";

export function useBooking(initialValues = {}) {
  const [draft, setDraft] = useState({
    serviceSlug: initialValues.serviceSlug || "",
    packageName: initialValues.packageName || "",
    date: initialValues.date || "",
    time: initialValues.time || "",
    duration: initialValues.duration || "",
    address: initialValues.address || "",
    city: initialValues.city || "",
    pincode: initialValues.pincode || "",
    landmark: initialValues.landmark || "",
    notes: initialValues.notes || "",
  });

  const [stepIndex, setStepIndex] = useState(0);

  const [confirmation, setConfirmation] = useState(null);

  const updateDraft = (values = {}) => {
    setDraft((current) => ({
      ...current,
      ...values,
    }));
  };

  const selectService = (serviceSlug) => {
    setDraft((current) => ({
      ...current,
      serviceSlug,
      packageName: "",
    }));

    // Service is the first step.
    // Move to the next step after selecting a service.
    setStepIndex(1);
  };

  const goNext = () => {
    setStepIndex((current) => current + 1);
  };

  const goBack = () => {
    setStepIndex((current) => Math.max(0, current - 1));
  };

  const resetBooking = () => {
    setDraft({
      serviceSlug: "",
      packageName: "",
      date: "",
      time: "",
      duration: "",
      address: "",
      city: "",
      pincode: "",
      landmark: "",
      notes: "",
    });

    setStepIndex(0);
    setConfirmation(null);
  };

  const bookingData = useMemo(
    () => ({
      ...draft,
    }),
    [draft],
  );

  return {
    draft,
    updateDraft,
    selectService,

    stepIndex,
    setStepIndex,

    goNext,
    goBack,

    confirmation,
    setConfirmation,

    bookingData,

    resetBooking,
  };
}

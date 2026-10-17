import apiClient from "./apiClient";

function mapBooking(booking) {
  const statusMap = {
    PENDING: "upcoming",
    CONFIRMED: "upcoming",
    ASSIGNED: "upcoming",
    IN_PROGRESS: "active",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
  };
  const address = booking.address;

  return {
    ...booking,

    status: statusMap[booking.status] || booking.status?.toLowerCase(),

    // The backend uses bookingDate, not date/time.
    date: booking.date || booking.bookingDate || null,
    time: booking.time || booking.bookingDate || null,

    // The service details route accepts a service ID as well as a slug.
    serviceSlug:
      booking.service?.slug || booking.serviceId || booking.service?.id || null,

    serviceName: booking.service?.name || booking.serviceName || "Service",

    // Convert the backend Address object into displayable text.
    address:
      address && typeof address === "object"
        ? [address.addressLine1, address.addressLine2]
            .filter(Boolean)
            .join(", ")
        : address || "",

    city:
      (address && typeof address === "object" ? address.city : null) ||
      booking.city ||
      "",

    state:
      (address && typeof address === "object" ? address.state : null) || "",

    pincode:
      (address && typeof address === "object" ? address.pincode : null) || "",

    createdAt: booking.createdAt || null,
  };
}

export async function getBookings() {
  const response = await apiClient.get("/bookings");

  return (response.data.bookings || []).map(mapBooking);
}

export async function createBooking(booking) {
  const { serviceId, addressId, bookingDate, professionalId, notes } = booking;

  if (!serviceId || !addressId || !bookingDate) {
    throw new Error("Service, saved address, and booking date are required.");
  }

  const response = await apiClient.post("/bookings", {
    serviceId: Number(serviceId),
    addressId: Number(addressId),
    bookingDate,
    ...(professionalId ? { professionalId: Number(professionalId) } : {}),
    notes: notes || null,
  });

  return mapBooking(response.data.booking);
}

export async function updateBookingStatus(id, status) {
  if (status !== "cancelled") {
    throw new Error("Only booking cancellation is supported here.");
  }

  const response = await apiClient.patch(`/bookings/${id}/cancel`, {
    cancelReason: "Cancelled by customer",
  });

  return mapBooking(response.data.booking);
}

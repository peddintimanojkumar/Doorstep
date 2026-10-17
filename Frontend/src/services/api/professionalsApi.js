
import apiClient from "./apiClient";

function mapBooking(booking) {
  const statusMap = {
    PENDING: "pending",
    ASSIGNED: "pending",
    CONFIRMED: "upcoming",
    IN_PROGRESS: "active",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
    DECLINED: "declined",
  };

  return {
    ...booking,
    id: booking.id,
    serviceName: booking.service?.name || "Service booking",
    price: Number(booking.price ?? 0),
    status:
      statusMap[booking.status] ||
      booking.status?.toLowerCase() ||
      "unknown",

    city: booking.address?.city || "",

    address: [
      booking.address?.addressLine1,
      booking.address?.addressLine2,
      booking.address?.city,
    ]
      .filter(Boolean)
      .join(", "),

    date: booking.bookingDate
      ? new Date(booking.bookingDate).toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        })
      : "Date not available",

    time: booking.bookingDate
      ? new Date(booking.bookingDate).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      : "Time not available",

    customerName:
      [booking.user?.firstName, booking.user?.lastName]
        .filter(Boolean)
        .join(" ") || "Customer",
  };
}

export async function getProfessionalJobs() {
  const response = await apiClient.get(
    "/bookings/professional/my-bookings"
  );

  return (response.data.bookings || []).map(mapBooking);
}

export async function acceptJob(id) {
  const response = await apiClient.patch(
    `/bookings/professional/${id}/accept`
  );

  return mapBooking(response.data.booking);
}

export async function declineJob(id) {
  const response = await apiClient.patch(
    `/bookings/professional/${id}/decline`
  );

  return mapBooking(response.data.booking);
}

export async function startJob(id) {
  const response = await apiClient.patch(
    `/bookings/professional/${id}/status`,
    { status: "IN_PROGRESS" }
  );

  return mapBooking(response.data.booking);
}

export async function completeJob(id) {
  const response = await apiClient.patch(
    `/bookings/professional/${id}/status`,
    { status: "COMPLETED" }
  );

  return mapBooking(response.data.booking);
}

import { useCallback, useEffect, useState } from "react";
import {
  getBookings,
  createBooking,
  updateBookingStatus,
} from "../services/api/bookingsApi";

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadBookings = useCallback(async () => {
    try {
      setIsPending(true);
      setIsError(false);

      const data = await getBookings();

      // Always keep bookings as an array
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load bookings:", error);
      setBookings([]);
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const addBooking = useCallback(
    async (booking) => {
      try {
        const createdBooking = await createBooking(booking);
        await loadBookings();

        return createdBooking;
      } catch (error) {
        console.error("Failed to create booking:", error);
        throw error;
      }
    },
    [loadBookings],
  );

  const cancelBooking = useCallback(async (bookingId) => {
    try {
      const updatedBooking = await updateBookingStatus(bookingId, "cancelled");

      setBookings((current) =>
        (Array.isArray(current) ? current : []).map((booking) =>
          booking.id === bookingId ? updatedBooking : booking,
        ),
      );

      return updatedBooking;
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      throw error;
    }
  }, []);

  return {
    bookings: Array.isArray(bookings) ? bookings : [],
    isPending,
    isError,
    refetch: loadBookings,
    addBooking,
    cancelBooking,
  };
}

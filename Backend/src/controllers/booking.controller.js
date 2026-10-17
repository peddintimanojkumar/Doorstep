const prisma = require("../config/prisma");

const createBooking = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { serviceId, professionalId, addressId, bookingDate, notes } =
      req.body;

    // Validate required fields
    if (
      !serviceId === undefined ||
      serviceId === null ||
      serviceId === "" ||
      addressId === undefined ||
      addressId === null ||
      addressId === "" ||
      bookingDate === undefined ||
      bookingDate === null ||
      bookingDate === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Service, address and booking date are required",
      });
    }
    // Validate service ID
    const parsedServiceId = Number(serviceId);

    if (!Number.isInteger(parsedServiceId) || parsedServiceId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Service ID must be a positive integer",
      });
    }

    // Validate address ID
    const parsedAddressId = Number(addressId);

    if (!Number.isInteger(parsedAddressId) || parsedAddressId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Address ID must be a positive integer",
      });
    }

    // Validate booking date
    const parsedBookingDate = new Date(bookingDate);

    if (Number.isNaN(parsedBookingDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid booking date",
      });
    }

    // Require a future booking date
    if (parsedBookingDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Booking date must be in the future",
      });
    }

    // Check service
    const service = await prisma.service.findFirst({
      where: {
        id: parsedServiceId,
        isActive: true,
      },
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found or inactive",
      });
    }

    // Check address belongs to logged-in user
    const address = await prisma.address.findFirst({
      where: {
        id: parsedAddressId,
        userId,
        isActive: true,
      },
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    let parsedProfessionalId = null;

    if (
      professionalId !== undefined &&
      professionalId !== null &&
      professionalId !== ""
    ) {
      parsedProfessionalId = Number(professionalId);

      if (
        !Number.isInteger(parsedProfessionalId) ||
        parsedProfessionalId <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Professional ID must be a positive integer",
        });
      }
    }
    // Check professional if provided
    let professional = null;

    if (parsedProfessionalId != null) {
      professional = await prisma.professional.findFirst({
        where: {
          id: Number(professionalId),
          isActive: true,
          isVerified: true,
          user: {
            isActive: true,
            role: "PROFESSIONAL",
          },
        },
      });

      if (!professional) {
        return res.status(404).json({
          success: false,
          message: "Professional not found or inactive",
        });
      }
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        serviceId: parsedServiceId,
        professionalId: professional ? professional.id : null,
        addressId: parsedAddressId,
        bookingDate: parsedBookingDate,
        status: "PENDING",
        price: service.price,
        notes: notes || null,
      },
      include: {
        service: true,
        professional: true,
        address: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create booking",
    });
  }
};
const getBookings = async (req, res) => {
  try {
    const userId = req.user.userId;

    const bookings = await prisma.booking.findMany({
      where: {
        userId,
      },
      include: {
        service: true,
        professional: true,
        address: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};
const getBookingById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookingId = Number(req.params.id);

    if (!Number.isInteger(bookingId) || bookingId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        userId,
      },
      include: {
        service: true,
        professional: true,
        address: true,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Get booking by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
    });
  }
};
const cancelBooking = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookingId = Number(req.params.id);
    const { cancelReason } = req.body;

    if (Number.isNaN(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        userId,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const cancellableStatuses = ["PENDING", "CONFIRMED", "ASSIGNED"];

    if (!cancellableStatuses.includes(booking.status)) {
      return res.status(400).json({
        success: false,
        message: `Booking cannot be cancelled because its current status is ${booking.status}`,
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "CANCELLED",
        cancelReason: cancelReason || null,
      },
    });

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Cancel booking error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
    });
  }
};

const assignProfessional = async (req, res) => {
  try {
    const bookingId = Number(req.params.id);
    const { professionalId } = req.body;

    // Validate booking ID
    if (!Number.isInteger(bookingId) || bookingId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    // Validate professional ID
    if (
      professionalId === undefined ||
      professionalId === null ||
      professionalId === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Professional ID is required",
      });
    }

    const parsedProfessionalId = Number(professionalId);

    if (!Number.isInteger(parsedProfessionalId) || parsedProfessionalId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Professional ID must be a positive integer",
      });
    }

    // Find booking
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Allow assignment only for pending or confirmed bookings
    const assignableStatuses = ["PENDING", "CONFIRMED"];

    if (!assignableStatuses.includes(booking.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot assign a professional when booking status is ${booking.status}`,
      });
    }

    // Find an active, verified professional
    const professional = await prisma.professional.findFirst({
      where: {
        id: parsedProfessionalId,
        isActive: true,
        isVerified: true,
        user: {
          isActive: true,
          role: "PROFESSIONAL",
        },
      },
    });

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: "Professional not found, inactive, or not verified",
      });
    }

    // Assign professional
    const updatedBooking = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        professionalId: professional.id,
        status: "ASSIGNED",
      },
      include: {
        service: true,
        professional: true,
        address: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Professional assigned successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Assign professional error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to assign professional",
    });
  }
};

// Get bookings assigned to the logged-in professional
const getMyProfessionalBookings = async (req, res) => {
  try {
    const userId = req.user.userId;

    const professional = await prisma.professional.findUnique({
      where: { userId },
    });

    if (!professional || !professional.isActive) {
      return res.status(404).json({
        success: false,
        message: "Active professional profile not found",
      });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        professionalId: professional.id,
      },
      include: {
        service: true,
        address: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get professional bookings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve professional bookings",
    });
  }
};

// Update the status of the logged-in professional's booking
const updateProfessionalBookingStatus = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookingId = Number(req.params.id);
    const { status } = req.body;
    // Validate Booking ID

    if (!Number.isInteger(bookingId) || bookingId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }
    // Validate requested status

    if (!["IN_PROGRESS", "COMPLETED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be IN_PROGRESS or COMPLETED",
      });
    }
    // Find the logged-in-professional's eligible profile
    const professional = await prisma.professional.findFirst({
      where: {
        userId,
        isActive: true,
        isVerified: true,
        user: {
          isActive: true,
          role: "PROFESSIONAL",
        },
      },
    });

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: "Active professional profile not found",
      });
    }

    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        professionalId: professional.id,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found for this professional",
      });
    }
    // Allow only valid status trasitions

    const allowedNextStatuses = {
      ASSIGNED: "IN_PROGRESS",
      CONFIRMED :"IN_PROGRESS",
      IN_PROGRESS: "COMPLETED",
    };

    if (allowedNextStatuses[booking.status] !== status) {
      return res.status(400).json({
        success: false,
        message: `Cannot change booking status from ${booking.status} to ${status}`,
      });
    }
    // Update only if the booking still has its expected status
    // This prevents overwriting a concurrent cancellations or update
    const updateResults = await prisma.booking.updateMany({
      where: {
        id: bookingId,
        professionalId: professional.id,
        status: booking.status,
      },
      data: {
        status,
      },
    });
    if (updateResults.count === 0) {
      return res.status(409).json({
        success: false,
        message: "Booking status has changed, Refresh and try again ",
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      include: {
        service: true,
        address: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Update professional booking status error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update booking status",
    });
  }
};

const acceptProfessionalBooking = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookingId = Number(req.params.id);

    if (!Number.isInteger(bookingId) || bookingId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const professional = await prisma.professional.findFirst({
      where: {
        userId,
        isActive: true,
        isVerified: true,
        user: {
          isActive: true,
          role: "PROFESSIONAL",
        },
      },
    });

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: "Active verified professional profile not found",
      });
    }

    const result = await prisma.booking.updateMany({
      where: {
        id: bookingId,
        professionalId: professional.id,
        status: "ASSIGNED",
      },
      data: {
        status: "CONFIRMED",
      },
    });

    if (result.count === 0) {
      return res.status(409).json({
        success: false,
        message:
          "Booking is not assigned to you or is no longer available to accept",
      });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        service: true,
        professional: true,
        address: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Booking accepted successfully",
      booking,
    });
  } catch (error) {
    console.error("Accept professional booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to accept booking",
    });
  }
};

const declineProfessionalBooking = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookingId = Number(req.params.id);

    if (!Number.isInteger(bookingId) || bookingId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const professional = await prisma.professional.findFirst({
      where: {
        userId,
        isActive: true,
        isVerified: true,
        user: {
          isActive: true,
          role: "PROFESSIONAL",
        },
      },
    });

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: "Active verified professional profile not found",
      });
    }

    const result = await prisma.booking.updateMany({
      where: {
        id: bookingId,
        professionalId: professional.id,
        status: "ASSIGNED",
      },
      data: {
        status: "DECLINED",
      },
    });

    if (result.count === 0) {
      return res.status(409).json({
        success: false,
        message:
          "Booking is not assigned to you or is no longer available to decline",
      });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        service: true,
        professional: true,
        address: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Booking declined successfully",
      booking,
    });
  } catch (error) {
    console.error("Decline professional booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to decline booking",
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  cancelBooking,
  assignProfessional,
  getMyProfessionalBookings,
  updateProfessionalBookingStatus,
  acceptProfessionalBooking,
  declineProfessionalBooking,
};

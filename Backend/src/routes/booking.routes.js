const express = require("express");

const {
  createBooking,
  getBookings,
  getBookingById,
  cancelBooking,
  assignProfessional,
  getMyProfessionalBookings,
  updateProfessionalBookingStatus,
  acceptProfessionalBooking,
  declineProfessionalBooking,
} = require("../controllers/booking.controller");

const authenticateUser = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

router.post("/", authenticateUser, createBooking);
router.get("/", authenticateUser, getBookings);
router.get("/:id", authenticateUser, getBookingById);
router.patch("/:id/cancel", authenticateUser, cancelBooking);
router.patch(
  "/:id/assign",
  authenticateUser,
  authorizeRoles("ADMIN"),
  assignProfessional,
);
router.get(
  "/professional/my-bookings",
  authenticateUser,
  authorizeRoles("PROFESSIONAL"),
  getMyProfessionalBookings,
);
router.patch(
  "/professional/:id/status",
  authenticateUser,
  authorizeRoles("PROFESSIONAL"),
  updateProfessionalBookingStatus,
);
router.patch(
  "/professional/:id/accept",
  authenticateUser,
  authorizeRoles("PROFESSIONAL"),
  acceptProfessionalBooking,
);

router.patch(
  "/professional/:id/decline",
  authenticateUser,
  authorizeRoles("PROFESSIONAL"),
  declineProfessionalBooking,
);

module.exports = router;

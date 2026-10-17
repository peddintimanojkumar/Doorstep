const express = require("express");

const {
  getDashboardSummary,
  getRecentBookings,
  getAllBookings,
  getDashboardAnalytics,
  getAllUsers,
  updateUserStatus,
  getAllCategories,
  createCategory,
  updateCategory,
  updateCategoryStatus,
  getAllServices,
  createService,
  updateService,
  updateServiceStatus,
  getAllProfessionals,
  updateProfessionalVerification,
  updateProfessionalStatus,
  getProfessionalBookings,
  getProfessionalApplications,
  reviewProfessionalApplication,
} = require("../controllers/admin.controller");

const authenticateUser = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

// All admin dashboard routes require admin authentication
router.use(authenticateUser, authorizeRoles("ADMIN"));

// Dashboard summary counts
router.get("/dashboard/summary", getDashboardSummary);

// Latest 10 bookings
router.get("/dashboard/recent-bookings", getRecentBookings);

// Get all bookings with search, filters, and pagination
router.get("/bookings", getAllBookings);
router.get("/dashboard/analytics", getDashboardAnalytics);
router.get("/users", getAllUsers);
router.patch("/users/:id/status", updateUserStatus);
router.get("/categories", getAllCategories);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.patch("/categories/:id/status", updateCategoryStatus);
router.get("/services", getAllServices);
router.post("/services", createService);
router.put("/services/:id", updateService);
router.patch("/services/:id/status", updateServiceStatus);
router.get("/professionals", getAllProfessionals);
router.patch("/professionals/:id/verification", updateProfessionalVerification);
router.patch("/professionals/:id/status", updateProfessionalStatus);
router.get("/professionals/:id/bookings", getProfessionalBookings);
// Professional application review
router.get("/professional-applications", getProfessionalApplications);

router.patch(
  "/professional-applications/:id/review",
  reviewProfessionalApplication,
);

module.exports = router;

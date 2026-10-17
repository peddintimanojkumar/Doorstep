const express = require("express");

const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  getAllServicesForAdmin,
} = require("../controllers/service.controller");

const authenticateUser = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

router.post("/", authenticateUser, authorizeRoles("ADMIN"), createService);
router.get("/", getServices);
router.get("/:id", getServiceById);
router.get(
  "/admin/all",
  authenticateUser,
  authorizeRoles("ADMIN"),
  getAllServicesForAdmin,
); 

router.put("/:id", authenticateUser, authorizeRoles("ADMIN"), updateService);
router.delete("/:id", authenticateUser, authorizeRoles("ADMIN"), deleteService);

module.exports = router;

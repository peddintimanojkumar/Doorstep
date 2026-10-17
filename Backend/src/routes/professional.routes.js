const express = require("express");

const {
  createProfessional,
  getProfessionalById,
  getProfessionals,
  updateProfessional,
  deleteProfessional,
} = require("../controllers/professional.controller");

const authenticateUser = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeRoles("PROFESSIONAL"),
  createProfessional,
);

router.get("/:id", getProfessionalById);

router.get("/", getProfessionals);

router.put(
  "/:id",
  authenticateUser,
  authorizeRoles("PROFESSIONAL"),
  updateProfessional,
);
router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("PROFESSIONAL"),
  deleteProfessional,
);

module.exports = router;

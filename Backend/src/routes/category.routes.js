const express = require("express");

const {
  createCategory, //ADMIN
  getCategories, //PUBLIC
  getCategoryById, //PUBLIC
  updateCategory, //ADMIN
  deleteCategory, //ADMIN
} = require("../controllers/category.controller");

const authenticateUser = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

router.post("/", authenticateUser, authorizeRoles("ADMIN"), createCategory);

router.get("/", getCategories);
router.get("/:id", getCategoryById);

router.put("/:id", authenticateUser, authorizeRoles("ADMIN"), updateCategory);

router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("ADMIN"),
  deleteCategory,
);
module.exports = router;

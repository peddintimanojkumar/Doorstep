const express = require("express");

const {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require("../controllers/address.controller");

const authenticateUser = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authenticateUser, createAddress);
router.get("/", authenticateUser, getAddresses);
router.get("/:id", authenticateUser, getAddressById);
router.put("/:id", authenticateUser, updateAddress);
router.delete("/:id", authenticateUser, deleteAddress);
module.exports = router;

const express = require("express");
const multer = require("multer");
const os = require("os");
const path = require("path");
const fs = require("fs");

const {
  submitProfessionalApplication,
} = require("../controllers/professionalApplication.controller");

const router = express.Router();

// Temporary files are stored outside the public frontend/backend folders.
const tempUploadDir = path.join(os.tmpdir(), "doorstep-application-temp");

fs.mkdirSync(tempUploadDir, { recursive: true });

const allowedMimeTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
]);

const upload = multer({
  dest: tempUploadDir,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 3,
    fields: 12,
    fieldSize: 10 * 1024,
  },
  fileFilter: (req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      return callback(
        new Error("Only PDF, JPG, and PNG documents are allowed"),
      );
    }

    callback(null, true);
  },
});

router.post(
  "/",
  upload.fields([
    { name: "identityDocument", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
  ]),
  submitProfessionalApplication,
);

module.exports = router;

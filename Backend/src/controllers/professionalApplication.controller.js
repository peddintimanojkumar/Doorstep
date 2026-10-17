const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");

const PRIVATE_UPLOAD_DIR = path.resolve(
  process.env.PRIVATE_UPLOAD_DIR || "../doorstep-private-uploads",
);

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
]);

const cleanText = (value) => (typeof value === "string" ? value.trim() : "");

const splitFullName = (fullName) => {
  const parts = cleanText(fullName).split(/\s+/).filter(Boolean);

  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ") || null,
  };
};

const submitProfessionalApplication = async (req, res) => {
  const uploadedFiles = Object.values(req.files || {}).flat();
  const storedFiles = [];

  try {
    const {
      fullName,
      email,
      phone,
      serviceCategory,
      experience,
      serviceArea,
      skills,
      availability,
      description,
      password,
      confirmPassword,
    } = req.body || {};

    const requiredFields = {
      fullName,
      email,
      phone,
      serviceCategory,
      experience,
      serviceArea,
      skills,
      availability,
      description,
      password,
      confirmPassword,
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (!cleanText(value)) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const normalizedEmail = cleanText(email).toLowerCase();
    const normalizedPhone = cleanText(phone);
    const normalizedName = cleanText(fullName);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address",
      });
    }

    const experienceYears = Number(experience);

    if (
      !Number.isInteger(experienceYears) ||
      experienceYears < 0 ||
      experienceYears > 60
    ) {
      return res.status(400).json({
        success: false,
        message: "Experience must be a whole number between 0 and 60",
      });
    }

    // Documents are optional. Validate any files that were supplied.
    for (const file of uploadedFiles) {
      if (file.size > MAX_FILE_SIZE || !ALLOWED_MIME_TYPES.has(file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Each document must be a PDF, JPG, or PNG up to 5 MB",
        });
      }
    }

    // Check for existing accounts before saving files or creating records.
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: normalizedEmail }, { phone: normalizedPhone }],
      },
      select: {
        id: true,
        email: true,
        phone: true,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          existingUser.email === normalizedEmail
            ? "An account with this email already exists. Please log in instead."
            : "This phone number is already registered.",
      });
    }

    const existingApplication = await prisma.professionalApplication.findFirst({
      where: {
        email: normalizedEmail,
        status: "PENDING",
      },
      select: { id: true },
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You already have a pending application with this email.",
      });
    }

    await fs.mkdir(PRIVATE_UPLOAD_DIR, { recursive: true });

    const storeFile = async (file) => {
      if (!file) return null;

      const extensionByMime = {
        "application/pdf": ".pdf",
        "image/jpeg": ".jpg",
        "image/png": ".png",
      };

      const filename = `${crypto.randomUUID()}${
        extensionByMime[file.mimetype]
      }`;

      const destination = path.join(PRIVATE_UPLOAD_DIR, filename);

      await fs.rename(file.path, destination);
      storedFiles.push(destination);

      return destination;
    };

    const identityDocumentPath = await storeFile(
      req.files?.identityDocument?.[0],
    );

    const addressProofPath = await storeFile(req.files?.addressProof?.[0]);

    const certificatePath = await storeFile(req.files?.certificate?.[0]);

    const passwordHash = await bcrypt.hash(password, 12);
    const { firstName, lastName } = splitFullName(normalizedName);

    const application = await prisma.$transaction(async (tx) => {
      // Create the account so the applicant can log in while pending.
      const user = await tx.user.create({
        data: {
          firstName,
          lastName,
          email: normalizedEmail,
          phone: normalizedPhone,
          password: passwordHash,
          role: "PROFESSIONAL",
          isActive: true,
        },
      });

      // Keep the profile available but unverified until admin approval.
      await tx.professional.create({
        data: {
          userId: user.id,
          bio: cleanText(description),
          experienceYears,
          isVerified: false,
          isActive: true,
        },
      });

      // Do not store a second copy of the password hash here.
      return tx.professionalApplication.create({
        data: {
          fullName: normalizedName,
          email: normalizedEmail,
          phone: normalizedPhone,
          serviceCategory: cleanText(serviceCategory),
          experienceYears,
          serviceArea: cleanText(serviceArea),
          skills: cleanText(skills),
          availability: cleanText(availability),
          description: cleanText(description),
          identityDocumentPath,
          addressProofPath,
          certificatePath,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          serviceCategory: true,
          status: true,
          createdAt: true,
        },
      });
    });

    return res.status(201).json({
      success: true,
      message:
        "Application submitted successfully. You can log in while your profile is awaiting verification.",
      application,
    });
  } catch (error) {
    // Remove privately stored files if the database transaction failed.
    await Promise.all(
      storedFiles.map(async (filePath) => {
        try {
          await fs.unlink(filePath);
        } catch {
          // Preserve the original error.
        }
      }),
    );

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "An account with this email or phone already exists.",
      });
    }

    console.error("Professional application submission failed:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit your application right now",
    });
  } finally {
    // Clean up temporary Multer files not already moved.
    await Promise.all(
      uploadedFiles.map(async (file) => {
        try {
          await fs.unlink(file.path);
        } catch {
          // The temporary file may already have been moved.
        }
      }),
    );
  }
};

module.exports = { submitProfessionalApplication };

const prisma = require("../config/prisma");

const isValidExperience = (value) => {
  if (typeof value !== "number" && typeof value !== "string") {
    return false;
  }
  if (typeof value === "string" && value.trim() === "") {
    return false;
  }
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 && number <= 60;
};

const createProfessional = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bio, experienceYears } = req.body || {};

    if (
      experienceYears !== undefined &&
      experienceYears !== null &&
      !isValidExperience(experienceYears)
    ) {
      return res.status(400).json({
        success: false,
        message: "Experience must be a whole Number Between 0 to 60",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "PROFESSIONAL") {
      return res.status(403).json({
        success: false,
        message: "Only professional users can create a professional profile",
      });
    }

    const existingProfessional = await prisma.professional.findUnique({
      where: {
        userId,
      },
    });

    if (existingProfessional) {
      return res.status(409).json({
        success: false,
        message: "Professional profile already exists",
      });
    }

    const professional = await prisma.professional.create({
      data: {
        userId,
        bio,
        experienceYears:
          experienceYears !== undefined && experienceYears !== null
            ? Number(experienceYears)
            : null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Professional profile created successfully",
      professional,
    });
  } catch (error) {
    console.error("Create professional error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the professional profile",
    });
  }
};

const getProfessionalById = async (req, res) => {
  try {
    const professionalId = Number(req.params.id);

    if (!Number.isInteger(professionalId) || professionalId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid professional ID",
      });
    }

    const professional = await prisma.professional.findFirst({
      where: {
        id: professionalId,
        isActive: true,
        isVerified: true,
        user: {
          isActive: true,
          role: "PROFESSIONAL",
        },
      },
      select: {
        id: true,
        bio: true,
        experienceYears: true,
        profileImage: true,
        isVerified: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: "Professional not found",
      });
    }

    return res.status(200).json({
      success: true,
      professional,
    });
  } catch (error) {
    console.error("Get professional error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the professional",
    });
  }
};

const getProfessionals = async (req, res) => {
  try {
    const professionals = await prisma.professional.findMany({
      where: {
        isActive: true,
        isVerified: true,
        user: {
          isActive: true,
          role: "PROFESSIONAL",
        },
      },
      select: {
        id: true,
        bio: true,
        experienceYears: true,
        profileImage: true,
        isVerified: true,
        createdAt: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: professionals.length,
      professionals,
    });
  } catch (error) {
    console.error("Get professionals error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching professionals",
    });
  }
};

const updateProfessional = async (req, res) => {
  try {
    const professionalId = Number(req.params.id);
    const userId = req.user.userId;
    const { bio, experienceYears, profileImage } = req.body || {};

    if (
      experienceYears !== undefined &&
      experienceYears !== null &&
      !isValidExperience(experienceYears)
    ) {
      return res.status(400).json({
        success: false,
        message: "Experience must be a whole number 0 and 60",
      });
    }

    if (Number.isNaN(professionalId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid professional ID",
      });
    }

    const professional = await prisma.professional.findUnique({
      where: {
        id: professionalId,
      },
    });

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: "Professional not found",
      });
    }

    if (professional.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this profile",
      });
    }

    const updatedProfessional = await prisma.professional.update({
      where: {
        id: professionalId,
      },
      data: {
        ...(bio !== undefined && {
          bio,
        }),
        ...(experienceYears !== undefined && {
          experienceYears:
            experienceYears === null ? null : Number(experienceYears),
        }),
        ...(profileImage !== undefined && {
          profileImage,
        }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Professional profile updated successfully",
      professional: updatedProfessional,
    });
  } catch (error) {
    console.error("Update professional error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the professional profile",
    });
  }
};
const deleteProfessional = async (req, res) => {
  try {
    const professionalId = Number(req.params.id);
    const userId = req.user.userId;

    if (Number.isNaN(professionalId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid professional ID",
      });
    }

    const professional = await prisma.professional.findUnique({
      where: {
        id: professionalId,
      },
    });

    if (!professional) {
      return res.status(404).json({
        success: false,
        message: "Professional not found",
      });
    }

    if (professional.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to deactivate this profile",
      });
    }

    const deletedProfessional = await prisma.professional.update({
      where: {
        id: professionalId,
      },
      data: {
        isActive: false,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Professional profile deactivated successfully",
      professional: deletedProfessional,
    });
  } catch (error) {
    console.error("Delete professional error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while deactivating the professional profile",
    });
  }
};

module.exports = {
  createProfessional,
  getProfessionalById,
  getProfessionals,
  updateProfessional,
  deleteProfessional,
};

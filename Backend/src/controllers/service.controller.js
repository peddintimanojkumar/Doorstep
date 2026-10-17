const prisma = require("../config/prisma");

const createService = async (req, res) => {
  try {
    const { categoryId, name, description, image, price, duration } = req.body;

    // Validate required fields
    if (!categoryId || !name) {
      return res.status(400).json({
        success: false,
        message: "Category ID and service name are required",
      });
    }

    // Check category
    const category = await prisma.category.findUnique({
      where: {
        id: Number(categoryId),
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check duplicate service name
    const existingService = await prisma.service.findFirst({
      where: {
        name,
        categoryId: Number(categoryId),
      },
    });

    if (existingService) {
      return res.status(409).json({
        success: false,
        message: "Service already exists in this category",
      });
    }

    // Create service
    const service = await prisma.service.create({
      data: {
        categoryId: Number(categoryId),
        name,
        description,
        image,
        price: price !== undefined ? Number(price) : null,
        duration: duration !== undefined ? Number(duration) : null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("Create service error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the service",
    });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      where: {
        isActive: true,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get services error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching services",
    });
  }
};
const getServiceById = async (req, res) => {
  try {
    const serviceId = Number(req.params.id);

    if (Number.isNaN(serviceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const service = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!service || !service.isActive) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Get service by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the service",
    });
  }
};

const updateService = async (req, res) => {
  try {
    const serviceId = Number(req.params.id);

    if (Number.isNaN(serviceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const { categoryId, name, description, image, price, duration, isActive } =
      req.body;

    if (categoryId !== undefined) {
      const category = await prisma.category.findUnique({
        where: { id: Number(categoryId) },
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        ...(categoryId !== undefined && {
          categoryId: Number(categoryId),
        }),
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
        ...(price !== undefined && { price: Number(price) }),
        ...(duration !== undefined && { duration: Number(duration) }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    console.error("Update service error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the service",
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const serviceId = Number(req.params.id);

    if (Number.isNaN(serviceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const deletedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        isActive: false,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      service: deletedService,
    });
  } catch (error) {
    console.error("Delete service error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the service",
    });
  }
};

const getAllServicesForAdmin = async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get admin services error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch services",
    });
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  getAllServicesForAdmin
};

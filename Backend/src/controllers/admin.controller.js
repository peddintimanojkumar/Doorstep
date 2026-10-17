const prisma = require("../config/prisma");

// Get admin dashboard summary counts
const getDashboardSummary = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProfessionals,
      totalServices,
      totalBookings,
      pendingBookings,
      completedBookings,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.professional.count({
        where: { isActive: true },
      }),
      prisma.service.count({
        where: { isActive: true },
      }),
      prisma.booking.count(),
      prisma.booking.count({
        where: { status: "PENDING" },
      }),
      prisma.booking.count({
        where: { status: "COMPLETED" },
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Dashboard summary retrieved successfully",
      summary: {
        totalUsers,
        totalProfessionals,
        totalServices,
        totalBookings,
        pendingBookings,
        completedBookings,
      },
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard summary",
    });
  }
};

// Get the 10 most recent bookings
const getRecentBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        service: true,
        professional: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        address: true,
      },
    });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Recent bookings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve recent bookings",
    });
  }
};
// Get bookings with search, filters, and pagination
const getAllBookings = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { status, search, dateFrom, dateTo } = req.query;

    // Validate pagination
    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Page must be positive and limit must be between 1 and 100",
      });
    }

    // Validate booking status
    const allowedStatuses = [
      "PENDING",
      "ASSIGNED",
      "IN_PROGRESS",
      "COMPLETED",
      "CANCELLED",
    ];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    // Build database filters
    const where = {};

    if (status) {
      where.status = status;
    }

    // Filter by scheduled booking date
    if (dateFrom || dateTo) {
      where.bookingDate = {};

      if (dateFrom) {
        const from = new Date(`${dateFrom}T00:00:00.000Z`);

        if (
          !/^\d{4}-\d{2}-\d{2}$/.test(dateFrom) ||
          Number.isNaN(from.getTime()) ||
          from.toISOString().slice(0, 10) !== dateFrom
        ) {
          return res.status(400).json({
            success: false,
            message: "dateFrom must be a valid YYYY-MM-DD date",
          });
        }

        where.bookingDate.gte = from;
      }

      if (dateTo) {
        const to = new Date(`${dateTo}T00:00:00.000Z`);

        if (
          !/^\d{4}-\d{2}-\d{2}$/.test(dateTo) ||
          Number.isNaN(to.getTime()) ||
          to.toISOString().slice(0, 10) !== dateTo
        ) {
          return res.status(400).json({
            success: false,
            message: "dateTo must be a valid YYYY-MM-DD date",
          });
        }

        // Include the entire dateTo day
        to.setUTCDate(to.getUTCDate() + 1);
        where.bookingDate.lt = to;
      }

      if (
        where.bookingDate.gte &&
        where.bookingDate.lt &&
        where.bookingDate.gte >= where.bookingDate.lt
      ) {
        return res.status(400).json({
          success: false,
          message: "dateFrom must be on or before dateTo",
        });
      }
    }

    // Search by booking ID, customer email, or service name
    if (search && search.trim()) {
      const searchTerm = search.trim();
      const searchConditions = [
        {
          user: {
            is: {
              email: {
                contains: searchTerm,
              },
            },
          },
        },
        {
          service: {
            is: {
              name: {
                contains: searchTerm,
              },
            },
          },
        },
      ];

      const bookingId = Number(searchTerm);

      if (Number.isInteger(bookingId) && bookingId > 0) {
        searchConditions.push({ id: bookingId });
      }

      where.OR = searchConditions;
    }

    const skip = (page - 1) * limit;

    const [totalBookings, bookings] = await Promise.all([
      prisma.booking.count({ where }),

      prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
          service: true,
          professional: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          address: true,
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      pagination: {
        page,
        limit,
        totalBookings,
        totalPages: Math.ceil(totalBookings / limit),
      },
      filters: {
        status: status || null,
        search: search || null,
        dateFrom: dateFrom || null,
        dateTo: dateTo || null,
      },
      bookings,
    });
  } catch (error) {
    console.error("Admin bookings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve bookings",
    });
  }
};

// Get admin dashboard analytics
const getDashboardAnalytics = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const year =
      req.query.year === undefined ? currentYear : Number(req.query.year);

    if (!Number.isInteger(year) || year < 2000 || year > 2100) {
      return res.status(400).json({
        success: false,
        message: "Year must be a valid year between 2000 and 2100",
      });
    }

    const startDate = new Date(Date.UTC(year, 0, 1));
    const endDate = new Date(Date.UTC(year + 1, 0, 1));

    // Count bookings grouped by status
    const statusGroups = await prisma.booking.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
    });

    const bookingStatus = {
      PENDING: 0,
      ASSIGNED: 0,
      IN_PROGRESS: 0,
      COMPLETED: 0,
      CANCELLED: 0,
    };

    statusGroups.forEach((item) => {
      bookingStatus[item.status] = item._count._all;
    });

    // Retrieve bookings scheduled during the selected year
    const yearlyBookings = await prisma.booking.findMany({
      where: {
        bookingDate: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: {
        bookingDate: true,
        status: true,
        price: true,
      },
    });

    const monthlyData = Array.from({ length: 12 }, (_, index) => ({
      month: index + 1,
      bookings: 0,
      completedBookings: 0,
      revenue: 0,
    }));

    yearlyBookings.forEach((booking) => {
      const monthIndex = booking.bookingDate.getUTCMonth();
      const month = monthlyData[monthIndex];

      month.bookings += 1;

      if (booking.status === "COMPLETED") {
        month.completedBookings += 1;
        month.revenue += Number(booking.price);
      }
    });

    const analytics = {
      year,
      totalBookings: yearlyBookings.length,
      totalCompletedBookings: monthlyData.reduce(
        (total, month) => total + month.completedBookings,
        0,
      ),
      totalRevenue: Number(
        monthlyData
          .reduce((total, month) => total + month.revenue, 0)
          .toFixed(2),
      ),
      bookingStatus,
      monthlyData: monthlyData.map((month) => ({
        ...month,
        revenue: Number(month.revenue.toFixed(2)),
      })),
    };

    return res.status(200).json({
      success: true,
      message: "Dashboard analytics retrieved successfully",
      analytics,
    });
  } catch (error) {
    console.error("Dashboard analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard analytics",
    });
  }
};

// Get users with search, role filter, status filter, and pagination
const getAllUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { search, role, isActive } = req.query;

    // Validate pagination
    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Page must be positive and limit must be between 1 and 100",
      });
    }

    // Validate role
    const allowedRoles = ["CUSTOMER", "PROFESSIONAL", "ADMIN"];

    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    // Validate active status
    if (isActive !== undefined && !["true", "false"].includes(isActive)) {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    const where = {};

    if (role) {
      where.role = role;
    }

    if (isActive !== undefined) {
      where.isActive = isActive === "true";
    }

    // Search by first name, last name, email, or phone
    if (search && search.trim()) {
      const term = search.trim();

      where.OR = [
        {
          firstName: {
            contains: term,
          },
        },
        {
          lastName: {
            contains: term,
          },
        },
        {
          email: {
            contains: term,
          },
        },
        {
          phone: {
            contains: term,
          },
        },
      ];
    }

    const skip = (page - 1) * limit;

    const [totalUsers, users] = await Promise.all([
      prisma.user.count({ where }),

      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,

          _count: {
            select: {
              bookings: true,
            },
          },
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      pagination: {
        page,
        limit,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
      },
      filters: {
        search: search || null,
        role: role || null,
        isActive: isActive ?? null,
      },
      users,
    });
  } catch (error) {
    console.error("Admin users error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
    });
  }
};
// Activate or deactivate a user account
const updateUserStatus = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { isActive } = req.body;

    // Validate user ID
    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Require a true Boolean value
    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    // Find the target user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent an admin from deactivating their own account
    if (userId === req.user.userId && isActive === false) {
      return res.status(400).json({
        success: false,
        message: "You cannot deactivate your own account",
      });
    }

    // Prevent deactivating the last active admin
    if (user.role === "ADMIN" && user.isActive === true && isActive === false) {
      const activeAdminCount = await prisma.user.count({
        where: {
          role: "ADMIN",
          isActive: true,
        },
      });

      if (activeAdminCount <= 1) {
        return res.status(400).json({
          success: false,
          message: "Cannot deactivate the last active admin",
        });
      }
    }

    // Update account status
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: isActive
        ? "User account activated successfully"
        : "User account deactivated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user status",
    });
  }
};

// Get categories with search, status filter, and pagination
const getAllCategories = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { search, isActive } = req.query;

    // Validate pagination
    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Page must be positive and limit must be between 1 and 100",
      });
    }

    // Validate active status
    if (isActive !== undefined && !["true", "false"].includes(isActive)) {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    const where = {};

    if (isActive !== undefined) {
      where.isActive = isActive === "true";
    }

    if (search && search.trim()) {
      where.name = {
        contains: search.trim(),
      };
    }

    const skip = (page - 1) * limit;

    const [totalCategories, categories] = await Promise.all([
      prisma.category.count({ where }),

      prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          _count: {
            select: {
              services: true,
            },
          },
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      pagination: {
        page,
        limit,
        totalCategories,
        totalPages: Math.ceil(totalCategories / limit),
      },
      filters: {
        search: search || null,
        isActive: isActive ?? null,
      },
      categories,
    });
  } catch (error) {
    console.error("Admin categories error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve categories",
    });
  }
};

const getAllServices = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { search, isActive, categoryId } = req.query;

    // Validate pagination
    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Page must be positive and limit must be between 1 and 100",
      });
    }

    // Validate active status
    if (isActive !== undefined && !["true", "false"].includes(isActive)) {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    // Validate category ID
    let parsedCategoryId;

    if (categoryId !== undefined) {
      parsedCategoryId = Number(categoryId);

      if (!Number.isInteger(parsedCategoryId) || parsedCategoryId < 1) {
        return res.status(400).json({
          success: false,
          message: "categoryId must be a positive integer",
        });
      }
    }

    const where = {};

    if (isActive !== undefined) {
      where.isActive = isActive === "true";
    }

    if (parsedCategoryId !== undefined) {
      where.categoryId = parsedCategoryId;
    }

    if (search && search.trim()) {
      where.OR = [
        { name: { contains: search.trim() } },
        { description: { contains: search.trim() } },
      ];
    }

    const skip = (page - 1) * limit;

    const [totalServices, services] = await Promise.all([
      prisma.service.count({ where }),

      prisma.service.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      pagination: {
        page,
        limit,
        totalServices,
        totalPages: Math.ceil(totalServices / limit),
      },
      filters: {
        search: search || null,
        isActive: isActive ?? null,
        categoryId: parsedCategoryId ?? null,
      },
      services,
    });
  } catch (error) {
    console.error("Admin services error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve services",
    });
  }
};

// Create a new service category
const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    // Validate category name
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const categoryName = name.trim();

    // Check for an existing category name
    const existingCategory = await prisma.category.findUnique({
      where: {
        name: categoryName,
      },
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "A category with this name already exists",
      });
    }

    // Validate optional fields
    if (
      description !== undefined &&
      description !== null &&
      typeof description !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Description must be a string",
      });
    }

    if (image !== undefined && image !== null && typeof image !== "string") {
      return res.status(400).json({
        success: false,
        message: "Image must be a string",
      });
    }

    const category = await prisma.category.create({
      data: {
        name: categoryName,
        description: description?.trim() || null,
        image: image?.trim() || null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Create category error:", error);

    // Handle duplicate-name conflicts safely
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A category with this name already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create category",
    });
  }
};
// Update category details
const updateCategory = async (req, res) => {
  try {
    const categoryId = Number(req.params.id);
    const { name, description, image } = req.body;

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    // Require at least one field to update
    if (
      name === undefined &&
      description === undefined &&
      image === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update",
      });
    }

    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const data = {};

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Category name cannot be empty",
        });
      }

      data.name = name.trim();
    }

    if (description !== undefined) {
      if (description !== null && typeof description !== "string") {
        return res.status(400).json({
          success: false,
          message: "Description must be a string or null",
        });
      }

      data.description = description?.trim() || null;
    }

    if (image !== undefined) {
      if (image !== null && typeof image !== "string") {
        return res.status(400).json({
          success: false,
          message: "Image must be a string or null",
        });
      }

      data.image = image?.trim() || null;
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data,
    });

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Update category error:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A category with this name already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update category",
    });
  }
};
// Activate or deactivate a category
const updateCategoryStatus = async (req, res) => {
  try {
    const categoryId = Number(req.params.id);
    const { isActive } = req.body;

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const category = await prisma.category.update({
      where: { id: categoryId },
      data: { isActive },
    });

    return res.status(200).json({
      success: true,
      message: isActive
        ? "Category activated successfully"
        : "Category deactivated successfully",
      category,
    });
  } catch (error) {
    console.error("Update category status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update category status",
    });
  }
};

const createService = async (req, res) => {
  try {
    const { categoryId, name, description, image, price, duration } = req.body;

    // Validate category ID
    const parsedCategoryId = Number(categoryId);

    if (
      categoryId === undefined ||
      categoryId === null ||
      categoryId === "" ||
      !Number.isInteger(parsedCategoryId) ||
      parsedCategoryId < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "A valid categoryId is required",
      });
    }

    // Validate service name
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Service name is required",
      });
    }

    // Validate optional text fields
    if (
      description !== undefined &&
      description !== null &&
      typeof description !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Description must be a string",
      });
    }

    if (image !== undefined && image !== null && typeof image !== "string") {
      return res.status(400).json({
        success: false,
        message: "Image must be a string",
      });
    }

    // Validate price
    let parsedPrice = null;

    if (price !== undefined && price !== null && price !== "") {
      if (
        (typeof price !== "number" && typeof price !== "string") ||
        !Number.isFinite(Number(price)) ||
        Number(price) < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Price must be a valid non-negative number",
        });
      }

      parsedPrice = Number(price);

      if (!/^\d+(\.\d{1,2})?$/.test(String(price).trim())) {
        return res.status(400).json({
          success: false,
          message: "Price can have a maximum of two decimal places",
        });
      }

      if (parsedPrice > 99999999.99) {
        return res.status(400).json({
          success: false,
          message: "Price exceeds the allowed limit",
        });
      }
    }

    // Validate duration in minutes
    let parsedDuration = null;

    if (duration !== undefined && duration !== null && duration !== "") {
      parsedDuration = Number(duration);

      if (
        !Number.isInteger(parsedDuration) ||
        parsedDuration < 1 ||
        parsedDuration > 2147483647
      ) {
        return res.status(400).json({
          success: false,
          message: "Duration must be a positive whole number of minutes",
        });
      }
    }

    // Confirm the category exists and is active
    const category = await prisma.category.findFirst({
      where: {
        id: parsedCategoryId,
        isActive: true,
      },
    });

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category does not exist or is inactive",
      });
    }

    // Create the service
    const service = await prisma.service.create({
      data: {
        categoryId: parsedCategoryId,
        name: name.trim(),
        description: description?.trim() || null,
        image: image?.trim() || null,
        price: parsedPrice,
        duration: parsedDuration,
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

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("Create service error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create service",
    });
  }
};

const updateService = async (req, res) => {
  try {
    const serviceId = Number(req.params.id);

    if (!Number.isInteger(serviceId) || serviceId < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const { categoryId, name, description, image, price, duration } = req.body;

    // Ensure at least one field was supplied
    const allowedFields = [
      "categoryId",
      "name",
      "description",
      "image",
      "price",
      "duration",
    ];

    const suppliedFields = allowedFields.filter((field) =>
      Object.prototype.hasOwnProperty.call(req.body, field),
    );

    if (suppliedFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update",
      });
    }

    // Check whether the service exists
    const existingService = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const data = {};

    // Validate and update category
    if (categoryId !== undefined) {
      const parsedCategoryId = Number(categoryId);

      if (
        categoryId === null ||
        categoryId === "" ||
        !Number.isInteger(parsedCategoryId) ||
        parsedCategoryId < 1
      ) {
        return res.status(400).json({
          success: false,
          message: "categoryId must be a positive integer",
        });
      }

      const category = await prisma.category.findFirst({
        where: {
          id: parsedCategoryId,
          isActive: true,
        },
      });

      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Category does not exist or is inactive",
        });
      }

      data.categoryId = parsedCategoryId;
    }

    // Validate and update name
    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Service name cannot be empty",
        });
      }

      data.name = name.trim();
    }

    // Validate and update description
    if (description !== undefined) {
      if (description !== null && typeof description !== "string") {
        return res.status(400).json({
          success: false,
          message: "Description must be a string or null",
        });
      }

      data.description = description?.trim() || null;
    }

    // Validate and update image
    if (image !== undefined) {
      if (image !== null && typeof image !== "string") {
        return res.status(400).json({
          success: false,
          message: "Image must be a string or null",
        });
      }

      data.image = image?.trim() || null;
    }

    // Validate and update price
    if (price !== undefined) {
      if (price === null || price === "") {
        data.price = null;
      } else {
        if (
          (typeof price !== "number" && typeof price !== "string") ||
          !Number.isFinite(Number(price)) ||
          Number(price) < 0 ||
          !/^\d+(\.\d{1,2})?$/.test(String(price).trim()) ||
          Number(price) > 99999999.99
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Price must be non-negative with at most two decimal places",
          });
        }

        data.price = Number(price);
      }
    }

    // Validate and update duration in minutes
    if (duration !== undefined) {
      if (duration === null || duration === "") {
        data.duration = null;
      } else {
        const parsedDuration = Number(duration);

        if (
          !Number.isInteger(parsedDuration) ||
          parsedDuration < 1 ||
          parsedDuration > 2147483647
        ) {
          return res.status(400).json({
            success: false,
            message: "Duration must be a positive whole number of minutes",
          });
        }

        data.duration = parsedDuration;
      }
    }

    const service = await prisma.service.update({
      where: { id: serviceId },
      data,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Update service error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update service",
    });
  }
};

const updateServiceStatus = async (req, res) => {
  try {
    const serviceId = Number(req.params.id);
    const { isActive } = req.body;

    // Validate service ID
    if (!Number.isInteger(serviceId) || serviceId < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    // Validate status
    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    // Check whether the service exists
    const existingService = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Update service status
    const service = await prisma.service.update({
      where: {
        id: serviceId,
      },
      data: {
        isActive,
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

    return res.status(200).json({
      success: true,
      message: isActive
        ? "Service activated successfully"
        : "Service deactivated successfully",
      service,
    });
  } catch (error) {
    console.error("Update service status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update service status",
    });
  }
};

const getAllProfessionals = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { search, isActive, isVerified } = req.query;

    // Validate pagination
    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Page must be positive and limit must be between 1 and 100",
      });
    }

    // Validate filters
    if (isActive !== undefined && !["true", "false"].includes(isActive)) {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    if (isVerified !== undefined && !["true", "false"].includes(isVerified)) {
      return res.status(400).json({
        success: false,
        message: "isVerified must be true or false",
      });
    }

    const where = {};

    if (isActive !== undefined) {
      where.isActive = isActive === "true";
    }

    if (isVerified !== undefined) {
      where.isVerified = isVerified === "true";
    }

    if (search && search.trim()) {
      const term = search.trim();

      where.user = {
        is: {
          OR: [
            { firstName: { contains: term } },
            { lastName: { contains: term } },
            { email: { contains: term } },
            { phone: { contains: term } },
          ],
        },
      };
    }

    const skip = (page - 1) * limit;

    const [totalProfessionals, professionals] = await Promise.all([
      prisma.professional.count({ where }),

      prisma.professional.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              role: true,
              isActive: true,
              createdAt: true,
            },
          },
          _count: {
            select: {
              bookings: true,
            },
          },
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      pagination: {
        page,
        limit,
        totalProfessionals,
        totalPages: Math.ceil(totalProfessionals / limit),
      },
      filters: {
        search: search || null,
        isActive: isActive ?? null,
        isVerified: isVerified ?? null,
      },
      professionals,
    });
  } catch (error) {
    console.error("Admin professionals error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve professionals",
    });
  }
};

const updateProfessionalVerification = async (req, res) => {
  try {
    const professionalId = Number(req.params.id);
    const { isVerified } = req.body;

    if (!Number.isInteger(professionalId) || professionalId < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid professional ID",
      });
    }

    if (typeof isVerified !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isVerified must be true or false",
      });
    }

    const existingProfessional = await prisma.professional.findUnique({
      where: {
        id: professionalId,
      },
      select: {
        id: true,
        userId: true,
        user: {
          select: {
            role: true,
          },
        },
      },
    });

    if (!existingProfessional) {
      return res.status(404).json({
        success: false,
        message: "Professional not found",
      });
    }

    if (existingProfessional.user.role !== "PROFESSIONAL") {
      return res.status(400).json({
        success: false,
        message: "The associated user is not a professional",
      });
    }

    const professional = await prisma.$transaction(async (tx) => {
      await tx.professional.update({
        where: {
          id: professionalId,
        },
        data: {
          isVerified,
          isActive: isVerified,
        },
      });

      await tx.user.update({
        where: {
          id: existingProfessional.userId,
        },
        data: {
          isActive: isVerified,
        },
      });

      return tx.professional.findUnique({
        where: {
          id: professionalId,
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true,
              isActive: true,
            },
          },
        },
      });
    });

    return res.status(200).json({
      success: true,
      message: isVerified
        ? "Professional approved and activated successfully"
        : "Professional verification revoked and profile deactivated",
      professional,
    });
  } catch (error) {
    console.error("Update professional verification error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update professional verification",
    });
  }
};

const updateProfessionalStatus = async (req, res) => {
  try {
    const professionalId = Number(req.params.id);
    const { isActive } = req.body;

    if (!Number.isInteger(professionalId) || professionalId < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid professional ID",
      });
    }

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    const existingProfessional = await prisma.professional.findUnique({
      where: { id: professionalId },
    });

    if (!existingProfessional) {
      return res.status(404).json({
        success: false,
        message: "Professional not found",
      });
    }

    // Update both profile and associated user account status.
    const professional = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: existingProfessional.userId },
        data: { isActive },
      });

      return tx.professional.update({
        where: { id: professionalId },
        data: { isActive },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true,
              isActive: true,
            },
          },
        },
      });
    });

    return res.status(200).json({
      success: true,
      message: isActive
        ? "Professional account activated successfully"
        : "Professional account deactivated successfully",
      professional,
    });
  } catch (error) {
    console.error("Update professional status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update professional status",
    });
  }
};

const getProfessionalBookings = async (req, res) => {
  try {
    const professionalId = Number(req.params.id);

    if (!Number.isInteger(professionalId) || professionalId < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid professional ID",
      });
    }

    const professional = await prisma.professional.findUnique({
      where: { id: professionalId },
      select: {
        id: true,
        userId: true,
        bio: true,
        experienceYears: true,
        isVerified: true,
        isActive: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
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

    const bookings = await prisma.booking.findMany({
      where: {
        professionalId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        service: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        address: true,
      },
    });

    return res.status(200).json({
      success: true,
      professional,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Admin professional bookings error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve professional bookings",
    });
  }
};
const getProfessionalApplications = async (req, res) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 10),
    );

    const status = String(req.query.status || "").toUpperCase();
    const search = String(req.query.search || "").trim();

    if (status && !["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const where = {};

    if (status && status !== "ALL") {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { serviceCategory: { contains: search } },
      ];
    }
    console.log("Professional application filters :",{
      status,search,page,limit,where
    });
    console.log("peding application count :", await prisma.professionalApplication.count({
      where : {status: "pending"},
    }),);

    const [total, applications] = await Promise.all([
      prisma.professionalApplication.count({ where }),
      prisma.professionalApplication.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          serviceCategory: true,
          experienceYears: true,
          serviceArea: true,
          skills: true,
          availability: true,
          description: true,
          status: true,
          reviewNotes: true,
          reviewedAt: true,
          createdAt: true,
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      applications,
    });
  } catch (error) {
    console.error("Get professional applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve professional applications",
    });
  }
};

const reviewProfessionalApplication = async (req, res) => {
  try {
    const applicationId = Number(req.params.id);
    const status = String(req.body.status || "").toUpperCase();
    const reviewNotes =
      typeof req.body.reviewNotes === "string"
        ? req.body.reviewNotes.trim()
        : null;

    if (!Number.isInteger(applicationId) || applicationId < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be APPROVED or REJECTED",
      });
    }

    const application = await prisma.professionalApplication.findUnique({
      where: { id: applicationId },
      select: {
        id: true,
        email: true,
        status: true,
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Professional application not found",
      });
    }

    if (application.status !== "PENDING") {
      return res.status(409).json({
        success: false,
        message: "This application has already been reviewed",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: application.email },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user || user.role !== "PROFESSIONAL") {
      return res.status(409).json({
        success: false,
        message:
          "The applicant's professional account could not be found. Verify the application-to-account connection first.",
      });
    }

    const professional = await prisma.professional.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!professional && status === "APPROVED") {
      return res.status(409).json({
        success: false,
        message:
          "A professional profile must exist before this application can be approved.",
      });
    }

    const reviewedApplication = await prisma.$transaction(async (tx) => {
      if (professional) {
        await tx.professional.update({
          where: { id: professional.id },
          data: {
            isVerified: status === "APPROVED",
            isActive: status === "APPROVED",
          },
        });
      }

      const updatedApplication = await tx.professionalApplication.update({
        where: { id: applicationId },
        data: {
          status,
          reviewNotes,
          reviewedAt: new Date(),
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          serviceCategory: true,
          status: true,
          reviewNotes: true,
          reviewedAt: true,
        },
      });

      return updatedApplication;
    });

    return res.status(200).json({
      success: true,
      message:
        status === "APPROVED"
          ? "Professional application approved successfully"
          : "Professional application rejected",
      application: reviewedApplication,
    });
  } catch (error) {
    console.error("Review professional application error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to review professional application",
    });
  }
};

module.exports = {
  getDashboardSummary,
  getRecentBookings,
  getAllBookings,
  getDashboardAnalytics,
  getAllUsers,
  updateUserStatus,
  getAllCategories,
  getAllServices,
  createCategory,
  updateCategory,
  updateCategoryStatus,
  createService,
  updateService,
  updateServiceStatus,
  getAllProfessionals,
  updateProfessionalVerification,
  updateProfessionalStatus,
  getProfessionalBookings,
  getProfessionalApplications,
  reviewProfessionalApplication,
};

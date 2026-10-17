const prisma = require("../config/prisma");

const createAddress = async (req, res) => {
  try {
    const {
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      landmark,
      isDefault,
    } = req.body;

    if (!addressLine1 || !city || !state || !pincode) {
      return res.status(400).json({
        success: false,
        message: "Address line 1, city, state and pincode are required",
      });
    }

    const userId = req.user.userId;

    if (isDefault === true) {
      await prisma.address.updateMany({
        where: {
          userId,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const address = await prisma.address.create({
      data: {
        userId,
        addressLine1,
        addressLine2: addressLine2 || null,
        city,
        state,
        pincode,
        landmark: landmark || null,
        isDefault: isDefault === true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Address created successfully",
      address,
    });
  } catch (error) {
    console.error("Create address error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create address",
    });
  }
};
const getAddresses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const addresses = await prisma.address.findMany({
      where: {
        userId,
        isActive: true,
      },
      orderBy: {
        isDefault: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: addresses.length,
      addresses,
    });
  } catch (error) {
    console.error("Get addresses error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch addresses",
    });
  }
};
const getAddressById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addressId = Number(req.params.id);

    if (Number.isNaN(addressId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address ID",
      });
    }

    const address = await prisma.address.findFirst({
      where: {
        id: addressId,
        userId,
        isActive: true,
      },
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    console.error("Get address by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch address",
    });
  }
};
const updateAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addressId = Number(req.params.id);

    if (Number.isNaN(addressId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address ID",
      });
    }

    const existingAddress = await prisma.address.findFirst({
      where: {
        id: addressId,
        userId,
      },
    });

    if (!existingAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    const {
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      landmark,
      isDefault,
    } = req.body;

    if (isDefault === true) {
      await prisma.address.updateMany({
        where: {
          userId,
          id: {
            not: addressId,
          },
        },
        data: {
          isDefault: false,
        },
      });
    }

    const address = await prisma.address.update({
      where: {
        id: addressId,
      },
      data: {
        addressLine1: addressLine1 ?? existingAddress.addressLine1,
        addressLine2: addressLine2 ?? existingAddress.addressLine2,
        city: city ?? existingAddress.city,
        state: state ?? existingAddress.state,
        pincode: pincode ?? existingAddress.pincode,
        landmark: landmark ?? existingAddress.landmark,
        isDefault: isDefault ?? existingAddress.isDefault,
      },
    });

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.error("Update address error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update address",
    });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addressId = Number(req.params.id);

    if (Number.isNaN(addressId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address ID",
      });
    }

    const existingAddress = await prisma.address.findFirst({
      where: {
        id: addressId,
        userId,
        isActive: true,
      },
    });

    if (!existingAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    await prisma.address.update({
      where: {
        id: addressId,
      },
      data: {
        isActive: false,
      },
    });

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Delete address error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete address",
    });
  }
};

module.exports = {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};

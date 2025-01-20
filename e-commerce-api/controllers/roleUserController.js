const User = require("../models/user");
const Role = require("../models/roles");
const UserRole = require("../models/userRoles");

const assignRoleToUser = async (req, res) => {
  const { userId, roleId } = req.body;

  try {
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      return res.status(404).json({
        status: "error",
        message: "User or Role not found",
      });
    }

    const isExit = await UserRole.findOne({
      where: { user_id: userId, role_id: roleId },
    });
    if (isExit) {
      return res.status(400).json({
        status: "error",
        message: "Role already assigned to user",
      });
    }

    await UserRole.create({ user_id: userId, role_id: roleId });

    return res.status(200).json({
      status: "success",
      message: "Role assigned to user successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to assign role",
      error: error.message,
    });
  }
};

// Remove a role from a user
const removeRoleFromUser = async (req, res) => {
  const { userId, roleId } = req.body;

  try {
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      return res.status(404).json({
        status: "error",
        message: "User or Role not found",
      });
    }
    const fineItem = await UserRole.findOne({
      where: { user_id: userId, role_id: roleId },
    });

    if (!fineItem) {
      return res.status(404).json({
        status: "error",
        message: "Role not found for the user",
      });
    }

    await fineItem.destroy();

    return res.status(200).json({
      status: "success",
      message: "Role removed from user successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to remove role",
      error: error.message,
    });
  }
};

// Fetch roles assigned to a user
const getUserRoles = async (req, res) => {
  const { userId } = req.params;

  try {
    const fineItem = await UserRole.findAll({
      where: { user_id: userId },
      include: [
        { model: User, attributes: ["id", "name"] },
        { model: Role, attributes: ["id", "name"] },
      ],
    });

    if (fineItem.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "User & Role not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: fineItem,
    });
  } catch (error) {
    console.error("Error fetching user roles:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch user roles",
      error: error.message,
    });
  }
};

module.exports = {
  assignRoleToUser,
  removeRoleFromUser,
  getUserRoles,
};

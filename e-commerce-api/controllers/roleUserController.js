const { User, Role, UserRole } = require("../models");
const { handleValidationErrors } = require("../utils/lib");

const assignRoleToUser = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return validationError;

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
  const validationError = handleValidationErrors(req, res);
  if (validationError) return validationError;

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
      include: [{ model: Role, as: "role", attributes: ["id", "name"] }],
    });

    if (fineItem.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "User & Role not found",
      });
    }

    const transformedData = fineItem.reduce((acc, item) => {
      let existingUser = acc.find((u) => u.user_id === item.user_id);
      if (!existingUser) {
        existingUser = {
          id: item.id,
          user_id: item.user_id,
          roles: [],
        };
        acc.push(existingUser);
      }
      existingUser.roles.push(item.role);
      return acc;
    }, []);

    return res.status(200).json({
      status: "success",
      data: transformedData,
    });
  } catch (error) {
    // console.error("Error fetching user roles:", error);
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

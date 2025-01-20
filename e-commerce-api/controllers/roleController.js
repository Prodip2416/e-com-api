const Role = require("../models/roles");
const { handleValidationErrors } = require("../utils/lib");

// Create a new role
const createRole = async (req, res) => {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    const { name, description } = req.body;
    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return res
        .status(400)
        .json({ status: "error", message: "Role already exists" });
    }

    const newRole = await Role.create({ name, description });
    return res.status(201).json({
      message: "Role created successfully.",
      data: newRole,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Failed to create role" });
  }
};

// Update an existing role
const updateRole = async (req, res) => {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    const { name, description, id } = req.body;
    const role = await Role.findByPk(id);
    if (!role) {
      return res
        .status(404)
        .json({ status: "error", message: "Role not found" });
    }

    // Update role
    role.name = name || role.name;
    role.description = description || role.description;
    await role.save();

    return res.status(200).json({
      message: "Role updated successfully.",
      data: role,
    });
  } catch (error) {
    console.error("Error updating role:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to update role" });
  }
};

// Get all roles
const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    return res
      .status(200)
      .json({ message: "Data fetch Successfully.", data: roles });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch roles" });
  }
};

// Get a single role by ID
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({
        status: "error",
        message: "Role not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Role fetched successfully",
      data: role,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch role",
      error: error?.message,
    });
  }
};

// Delete a role
const deleteRole = async (req, res) => {
  try {
    const { id } = req?.body;
    const role = await Role.findByPk(id);
    if (!role) {
      return res
        .status(404)
        .json({ status: "error", message: "Role not found" });
    }
    await role.destroy();
    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Failed to delete role" });
  }
};

module.exports = {
  createRole,
  updateRole,
  getRoles,
  getRoleById,
  deleteRole,
};

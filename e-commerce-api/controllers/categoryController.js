const { Category } = require("../models");
const { handleValidationErrors } = require("../utils/lib");

// Create a new Category
const createCategory = async (req, res) => {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    const { name, description } = req.body;
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res
        .status(400)
        .json({ status: "error", message: "Category already exists" });
    }

    const newCategory = await Category.create({ name, description });
    return res.status(201).json({
      message: "Category created successfully.",
      data: newCategory,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Failed to create Category" });
  }
};

// Update an existing Category
const updateCategory = async (req, res) => {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    const { name, description, id } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res
        .status(404)
        .json({ status: "error", message: "Category not found" });
    }

    // Update role
    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();

    return res.status(200).json({
      message: "Category updated successfully.",
      data: category,
    });
  } catch (error) {
    // console.error("Error updating Category:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to update Category" });
  }
};

// Get all Category
const getCategories = async (req, res) => {
  try {
    const categorys = await Category.findAll();
    return res
      .status(200)
      .json({ message: "Data fetch Successfully.", data: categorys });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch Categorys" });
  }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch Category",
      error: error?.message,
    });
  }
};

// Delete a role
const deleteCategory = async (req, res) => {
  try {
    const { id } = req?.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res
        .status(404)
        .json({ status: "error", message: "Category not found" });
    }
    await category.destroy();
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Failed to delete Category" });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
};

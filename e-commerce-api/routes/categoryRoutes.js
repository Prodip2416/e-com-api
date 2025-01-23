const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const {
  createCategory,
  updateCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
} = require("../controllers/categoryController");
const {
  createCategoryValidation,
  getByIdValidation,
  updateCategoryValidation,
} = require("../validations/categoryValidation");

const router = express.Router();

// Route to get list of users (protected by JWT)
router.get("/categories", authenticate, getCategories);
router.get("/category/:id", authenticate, getByIdValidation, getCategoryById);
router.post(
  "/category",
  authenticate,
  createCategoryValidation,
  createCategory
);
router.put("/category", authenticate, updateCategoryValidation, updateCategory);
router.delete("/category", authenticate, deleteCategory);

module.exports = router;

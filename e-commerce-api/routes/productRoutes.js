const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  createProductValidation,
  updateProductValidation,
  getByIdValidation,
} = require("../validations/productValidation");
const fileUpload = require("../middleware/fileUploadMiddleware");
const isAdmin = require("../middleware/isAdminMiddleware");

const router = express.Router();

// Route to get list of users (protected by JWT)
router.get("/products", authenticate, getAllProduct);
router.get("/product/:id", authenticate, isAdmin, getProductById);
router.post(
  "/product",
  authenticate,
  isAdmin,
  fileUpload.array("files", 5),
  createProductValidation,
  createProduct
);
router.put(
  "/product",
  authenticate,
  isAdmin,
  fileUpload.array("files", 5),
  updateProductValidation,
  updateProduct
);
router.delete(
  "/product/:id",
  authenticate,
  isAdmin,
  getByIdValidation,
  deleteProduct
);

module.exports = router;

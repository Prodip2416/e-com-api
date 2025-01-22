const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const {
  deleteCart,
  getCartByUser,
  createCart,
} = require("../controllers/cartController");
const { validateCart } = require("../validations/cartValidation");

const router = express.Router();

// Route to get list of users (protected by JWT)
router.get("/cart", authenticate, getCartByUser);
router.post("/cart", authenticate, validateCart, createCart);
router.delete("/cart", authenticate, deleteCart);

module.exports = router;

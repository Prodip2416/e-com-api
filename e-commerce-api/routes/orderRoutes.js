const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const {
  validateCreateOrder,
  cancelOrderValidation,
} = require("../validations/orderValidation");
const {
  createOrder,
  cancelOrder,
  getAllOrders,
} = require("../controllers/orderController");

const router = express.Router();

// Route to get list of users (protected by JWT)
router.post("/order", authenticate, validateCreateOrder, createOrder);
router.get("/orders", authenticate, getAllOrders);
router.put("/cancel-order", authenticate, cancelOrderValidation, cancelOrder);

module.exports = router;

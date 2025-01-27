const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const {
  validateCreateOrder,
  updateStatusOrderValidation,
} = require("../validations/orderValidation");
const {
  createOrder,
  getAllOrders,
  updateStatus,
} = require("../controllers/orderController");
const isAdmin = require("../middleware/isAdminMiddleware");

const router = express.Router();

// Route to get list of users (protected by JWT)
router.post("/order", authenticate, validateCreateOrder, createOrder);
router.get("/orders", authenticate, getAllOrders);
router.put(
  "/status-change",
  authenticate,
  isAdmin,
  updateStatusOrderValidation,
  updateStatus
);

module.exports = router;

const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const { createPayment } = require("../controllers/paymentController");
const { validateCreatePayment } = require("../validations/paymentValidation");

const router = express.Router();

// Route to get list of users (protected by JWT)
router.post(
  "/create-payment",
  authenticate,
  validateCreatePayment,
  createPayment
);

module.exports = router;

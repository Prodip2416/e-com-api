const { body } = require("express-validator");

const validateCreateOrder = [
  body("cart_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("cart_id must be a positive integer"),
];
const updateStatusOrderValidation = [
  body("order_id")
    .notEmpty()
    .withMessage("order_id is not empty")
    .isInt({ min: 1 })
    .withMessage("order_id must be a positive integer"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Pending", "Shipped", "Delivered", "Canceled"])
    .withMessage(
      "Invalid status. Allowed values are: Pending, Shipped, Delivered, Canceled"
    ),
];

module.exports = { validateCreateOrder, updateStatusOrderValidation };

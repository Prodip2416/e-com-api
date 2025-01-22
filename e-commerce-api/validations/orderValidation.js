const { body } = require("express-validator");

const validateCreateOrder = [
  body("cart_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("cart_id must be a positive integer"),
];
const cancelOrderValidation = [
  body("order_id")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("order_id must be a positive integer"),
];

module.exports = { validateCreateOrder, cancelOrderValidation };

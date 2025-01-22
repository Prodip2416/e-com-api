const { body } = require("express-validator");

const validateCreatePayment = [
  // Validate order_id
  body("order_id")
    .isInt({ gt: 0 })
    .withMessage("order_id must be a positive integer"),

  // Validate amount
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("amount must be a positive number"),

  // Validate currency
  body("currency")
    .isString()
    .withMessage("currency must be a string")
    .isIn(["BDT", "USD", "EUR"])
    .withMessage("currency must be one of: BDT, USD, EUR"),
];

module.exports = { validateCreatePayment };

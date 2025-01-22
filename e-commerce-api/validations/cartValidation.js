const { body, validationResult } = require("express-validator");

const validateCart = [
  // Validate that `cart` is an array
  body("cart")
    .isArray({ min: 1 })
    .withMessage("cart must be a non-empty array"),

  // Validate each cart item
  body("cart.*.product_id")
    .isInt({ min: 1 })
    .withMessage("product_id must be a positive integer"),
  body("cart.*.quantity")
    .isInt({ min: 1 })
    .withMessage("quantity must be at least 1"),
  body("cart.*.price")
    .isFloat({ min: 0.01 })
    .withMessage("price must be a positive number greater than 0"),
];

module.exports = { validateCart };

// src/validations/roleValidation.js
const { body, param } = require("express-validator");

const createProductValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),
  body("description")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Description cannot be more than 255 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isInt({ min: 1 })
    .withMessage("Price must be a positive number"),
  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 1 })
    .withMessage("Stock must be a positive number"),
];
const updateProductValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),
  body("description")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Description cannot be more than 255 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isInt({ min: 1 })
    .withMessage("Price must be a positive number"),
  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 1 })
    .withMessage("Stock must be a positive number"),
];

const getByIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isInt({ min: 1 })
    .withMessage("Product ID must be a positive integer"),
];

module.exports = {
  createProductValidation,
  updateProductValidation,
  getByIdValidation,
};

// src/validations/roleValidation.js
const { body, param } = require("express-validator");

const createCategoryValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),
  body("description")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Description cannot be more than 255 characters"),
];
const updateCategoryValidation = [
  body("id")
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt({ min: 1 })
    .withMessage("Category ID must be a positive integer"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),
  body("description")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Description cannot be more than 255 characters"),
];

const getByIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt({ min: 1 })
    .withMessage("Category ID must be a positive integer"),
];

module.exports = {
  createCategoryValidation,
  updateCategoryValidation,
  getByIdValidation,
};

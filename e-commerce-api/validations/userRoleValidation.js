// src/validations/roleValidation.js
const { body, param } = require("express-validator");

const createUserRoleValidation = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isNumeric()
    .withMessage("User ID must be a number")
    .custom((value) => value > 0)
    .withMessage("User ID must be greater than 0"),
  body("roleId")
    .notEmpty()
    .withMessage("Role ID is required")
    .isNumeric()
    .withMessage("Role ID must be a number")
    .custom((value) => value > 0)
    .withMessage("Role ID must be greater than 0"),
];

const removeRoleValidation = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isNumeric()
    .withMessage("User ID must be a number")
    .custom((value) => value > 0)
    .withMessage("User ID must be greater than 0"),
  body("roleId")
    .notEmpty()
    .withMessage("Role ID is required")
    .isNumeric()
    .withMessage("Role ID must be a number")
    .custom((value) => value > 0)
    .withMessage("Role ID must be greater than 0"),
];

module.exports = {
  createUserRoleValidation,
  removeRoleValidation,
};

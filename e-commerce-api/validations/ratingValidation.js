const { body } = require("express-validator");

const validateCreateRating = [
  body("product_id")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("product_id must be a positive integer"),
  body("rating")
    .notEmpty()
    .isFloat({ min: 1, mmax: 5 })
    .withMessage("raing must be a positive integer"),
];
const validateGetRating = [
  body("product_id")
    .notEmpty()
    .withMessage('product_id is not empty')
    .isInt({ min: 1 })
    .withMessage("product_id must be a positive integer"),
];

module.exports = { validateGetRating, validateCreateRating };

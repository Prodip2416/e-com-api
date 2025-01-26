const { body } = require("express-validator");

const validateforCreateDeleteWishlist = [
  body("product_id")
    .notEmpty()
    .withMessage("product_id is not empty")
    .isInt({ min: 1 })
    .withMessage("Product Id must be a positive integer"),
  body("user_id")
    .notEmpty()
    .withMessage("user_id is not empty")
    .isInt({ min: 1 })
    .withMessage("User ID must be a positive integer"),
];

module.exports = { validateforCreateDeleteWishlist };

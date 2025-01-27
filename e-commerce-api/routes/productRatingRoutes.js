const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const { addRating, getRating } = require("../controllers/productRatingController");
const { validateCreateRating, validateGetRating } = require("../validations/ratingValidation");

const router = express.Router();

// Route to get list of users (protected by JWT)
router.post("/rating", authenticate, validateCreateRating, addRating);
router.get("/rating", authenticate, validateGetRating, getRating);

module.exports = router;

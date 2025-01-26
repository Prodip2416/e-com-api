const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishListController");
const {
  validateforCreateDeleteWishlist,
} = require("../validations/wishListValidation");

const router = express.Router();

// Route to get list of users (protected by JWT)
router.post(
  "/wishlist",
  authenticate,
  validateforCreateDeleteWishlist,
  addToWishlist
);
router.get("/wishlist", authenticate, getWishlist);
router.delete(
  "/wishlist",
  authenticate,
  validateforCreateDeleteWishlist,
  removeFromWishlist
);

module.exports = router;

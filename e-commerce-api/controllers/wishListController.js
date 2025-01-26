const { Wishlist, Product } = require("../models");
const { handleValidationErrors } = require("../utils/lib");

const addToWishlist = async (req, res) => {
  const { user_id, product_id } = req.body;

  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    const findProduct = await Product.findByPk(product_id);
    if (!findProduct) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
    // Check if the product is already in the user's wishlist
    const existingWishlistItem = await Wishlist.findOne({
      where: { user_id: user_id, product_id: product_id },
    });

    if (existingWishlistItem) {
      return res.status(400).json({
        status: "error",
        message: "This Product is already in the wishlist",
      });
    }

    // Add the product to the wishlist
    const wishlistItem = await Wishlist.create({
      user_id: user_id,
      product_id: product_id,
    });

    res.status(201).json({
      message: "Product added to wishlist successfully",
      data: wishlistItem,
    });
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to add product to wishlist" });
  }
};

const getWishlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    // Fetch wishlist items for the user
    const wishlist = await Wishlist.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "price", "description"],
        },
      ],
    });

    res.status(200).json({
      message: "Wishlist fetched successfully",
      data: wishlist,
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch wishlist" });
  }
};

const removeFromWishlist = async (req, res) => {
  const { user_id, product_id } = req.body;

  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    // Find and delete the product from the wishlist
    const deleted = await Wishlist.destroy({
      where: { user_id, product_id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    res.status(200).json({
      message: "Product removed from wishlist successfully",
    });
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to remove product from wishlist",
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};

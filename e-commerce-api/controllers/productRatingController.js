const { User, Product, ProductRating } = require("../models");
const { handleValidationErrors } = require("../utils/lib");

const addRating = async (req, res) => {
  const validationError = handleValidationErrors(req, res);
  if (validationError) return validationError;

  const { product_id, rating, feedback } = req.body;

  try {
    const user = await User.findByPk(req.user.id);
    const product = await Product.findByPk(product_id);

    if (!user || !product) {
      return res.status(404).json({
        status: "error",
        message: "User or Product not found",
      });
    }

    await ProductRating.create({
      user_id: req.user.id,
      product_id: product_id,
      rating: rating,
      feedback: feedback || null,
    });

    return res.status(200).json({
      status: "success",
      message: "Product rating added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to added rating",
      error: error.message,
    });
  }
};

// Fetch roles assigned to a user
const getRating = async (req, res) => {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    const { product_id } = req.body;
    const fineItem = await ProductRating.findAll({
      where: { product_id: product_id },
    });

    if (fineItem.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Product Rating not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: fineItem,
    });
  } catch (error) {
    // console.error("Error fetching user roles:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch product rating",
      error: error.message,
    });
  }
};

module.exports = {
  addRating,
  getRating,
};

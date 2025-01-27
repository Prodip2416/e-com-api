const { Cart, CartItem, Product } = require("../models");
const { handleValidationErrors } = require("../utils/lib");

const getDashboardData = async (req, res) => {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;
    // Get user_id from the decoded token
   
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardData
};

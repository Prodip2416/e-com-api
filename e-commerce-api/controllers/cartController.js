const { Cart, CartItem, Product } = require("../models");
const { handleValidationErrors } = require("../utils/lib");

const createCart = async (req, res) => {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;
    // Get user_id from the decoded token
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not found in token" });
    }

    // Extract cart data from the request body
    const { cart } = req.body;
    if (!Array.isArray(cart) || cart.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Cart data is invalid or empty" });
    }

    // Find or create a cart for the user
    let userCart = await Cart.findOne({ where: { user_id: userId } });
    if (!userCart) {
      userCart = await Cart.create({ user_id: userId });
    }

    // Process cart items
    for (const item of cart) {
      const { product_id, quantity, price } = item;

      // Validate product existence
      const product = await Product.findByPk(product_id);
      if (!product) {
        return res.status(404).json({
          status: "error",
          message: `Product with ID ${product_id} not found`,
        });
      }

      // Check if the item already exists in the cart
      const existingItem = await CartItem.findOne({
        where: { cart_id: userCart.id, product_id },
      });

      if (existingItem) {
        // Update the quantity and price of the existing item
        existingItem.quantity = quantity;
        existingItem.price = price;
        await existingItem.save();
      } else {
        // Add new item to the cart
        await CartItem.create({
          cart_id: userCart.id,
          product_id,
          quantity,
          price,
        });
      }
    }

    res.status(200).json({
      message: "Cart data updated successfully",
      data: userCart,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getCartByUser = async (req, res) => {
  try {
    const carts = await Cart.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: CartItem,
          as: "items",
          attributes: ["product_id", "quantity", "price", "created_at"],
        },
      ],
    });
    return res
      .status(200)
      .json({ message: "Data fetch Successfully.", data: carts });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch roles" });
  }
};

// Get a single role by ID
const getCartByID = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({
        status: "error",
        message: "Role not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Role fetched successfully",
      data: role,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch role",
      error: error?.message,
    });
  }
};

// Delete a role
const deleteCart = async (req, res) => {
  try {
    // Get user ID from the decoded token
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: User not found in token",
      });
    }

    // Find the cart for the user
    const cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) {
      return res
        .status(404)
        .json({ status: "error", message: "Cart not found for the user" });
    }

    // Delete all cart items associated with the cart
    await CartItem.destroy({ where: { cart_id: cart.id } });

    // Delete the cart
    await Cart.destroy({ where: { id: cart.id } });

    res.status(200).json({
      message: "Cart and all associated items deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createCart,
  getCartByUser,
  getCartByID,
  deleteCart,
};

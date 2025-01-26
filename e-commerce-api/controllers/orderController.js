const {
  Order,
  OrderDetail,
  Cart,
  CartItem,
  Product,
  sequelize,
} = require("../models");
const { handleValidationErrors, sendEmail } = require("../utils/lib");

const createOrder = async (req, res) => {
  const transaction = await sequelize.transaction(); // Use transactions for atomicity
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: User not found in token",
      });
    }

    // Extract order data
    const { cart_id, total_price } = req.body;

    let orderDetailsToCreate = [];

    // If cart_id is provided, move items from the cart to the order
    if (cart_id) {
      const cart = await Cart.findOne({
        where: { id: cart_id, user_id: userId },
        include: { model: CartItem, as: "items" },
      });

      if (!cart || !cart.items || cart.items.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "Cart not found or empty" });
      }

      orderDetailsToCreate = cart.items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }));

      // Optionally clear the cart after moving items
      await CartItem.destroy({ where: { cart_id: cart.id }, transaction });
      await Cart.destroy({ where: { id: cart.id }, transaction });
    }

    if (orderDetailsToCreate.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Order details are empty" });
    }

    // Validate product availability and stock
    for (const detail of orderDetailsToCreate) {
      const product = await Product.findByPk(detail.product_id, {
        transaction,
      });
      if (!product) {
        throw new Error(`Product with ID ${detail.product_id} not found`);
      }
      if (product.stock < detail.quantity) {
        return res
          .status(400)
          .json({ status: "error", message: "Insufficient stock for product" });
      }

      // Deduct stock
      product.stock -= detail.quantity;
      await product.save({ transaction });
    }

    // Create the order
    const order = await Order.create(
      {
        user_id: userId,
        order_id: `ORDER_ID_${Date.now()}`,
        total_price: total_price,
        status: "pending", // Default status
      },
      { transaction }
    );

    // Create order details
    for (const detail of orderDetailsToCreate) {
      await OrderDetail.create(
        {
          order_id: order.id,
          product_id: detail.product_id,
          quantity: detail.quantity,
          price: detail.price,
        },
        { transaction }
      );
    }

    await transaction.commit(); // Commit transaction

    // Send email or notification
    if (order && req.user.email) {
      const emailText = `Hi ${req?.user?.name},\n\nWe are excited to let you know that your order has been successfully completed!\n\nHere are the details of your order:\n\nOrder ID: ${order?.order_id}\n\nIf you have any questions or need further assistance, please don't hesitate to contact our support team.\n\nThank you for choosing us for your purchase!\n\nBest regards,\n[Aushomapto]`;

      const emailResponse = await sendEmail(
        req.user.email,
        "Order Confirmation Deatils",
        emailText
      );
      if (!emailResponse.success) {
        console.log(emailResponse.error);
      }
    }
    res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    await transaction.rollback(); // Rollback transaction on failure
    console.error("Error creating order:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create order",
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: User not found in token",
      });
    }

    // Find the cart for the user
    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: OrderDetail,
          as: "details",
          attributes: ["order_id", "product_id", "quantity", "price"],
        },
      ],
    });
    if (!orders) {
      return res
        .status(404)
        .json({ status: "error", message: "Cart not found for the user" });
    }

    res.status(200).json({
      message: "Order data fetched successfully",
      data: orders,
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
const updateStatus = async (req, res) => {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    const { order_id, status } = req.body;
    const order = await Order.findByPk(order_id);
    if (!order) {
      return res
        .status(404)
        .json({ status: "error", message: "Order not found." });
    }
    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Your order status are successfully updated.",
    });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  updateStatus,
  getAllOrders,
};

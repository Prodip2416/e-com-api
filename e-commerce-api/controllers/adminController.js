const { Payment, Order, UserRole, User } = require("../models");
const { handleValidationErrors } = require("../utils/lib");

const getDashboardData = async (req, res) => {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;
    // Get user_id from the decoded token

    const payments = await Payment.findAll();
    const orders = await Order.findAll();
    const adminUser = await UserRole.findAll({ where: { role_id: 1 } });
    const totaluser = await User.findAll({ where: { is_active: 1 } });
    const pendingOrder = orders.filter((order) => order.status === "Pending");
    const canceledOrder = orders.filter((order) => order.status === "Canceled");

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      data: {
        totalSales: payments.length,
        new_orders: pendingOrder.length,
        cancel_orders: canceledOrder.length,
        total_customers: totaluser.length - adminUser.length,
      },
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

module.exports = {
  getDashboardData,
};

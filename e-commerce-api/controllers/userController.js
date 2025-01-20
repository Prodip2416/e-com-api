const User = require("../models/user");

// Get list of all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password_hash"] }, // Exclude password_hash from response
    });

    res.status(200).json({
      message: "Users retrieved successfully.",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users.", error });
  }
};

module.exports = {
  getUsers,
};

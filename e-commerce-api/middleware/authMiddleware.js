const jwt = require("jsonwebtoken");
const { JWTToken } = require("../models");
const { Op } = require("sequelize");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  try {
    // Verify the token using JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check the token in the database
    const tokenRecord = await JWTToken.findOne({
      where: {
        jwt_token: token,
        is_active: true,
        expires_at: {
          [Op.or]: [null, { [Op.gt]: new Date() }],
        },
      },
    });
    if (!tokenRecord) {
      return res
        .status(401)
        .json({ status: "error", message: "No Token found from DB!." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    // console.log(error?.name);
    return res
      .status(400)
      .json({ status: "error", message: "Invalid token.", error });
  }
};

module.exports = authenticate;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const JWTToken = require("../models/jwtToken");
const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "User already exists" });
    }

    if (name && email && password) {
      const newUser = await User.create({
        name,
        email,
        password_hash: password,
      });
      const userResponse = newUser.get({ plain: true });
      delete userResponse.password_hash;
      res.status(201).json({
        message: "User created successfully.",
        data: userResponse,
      });
    } else {
      return res
        .status(400)
        .json({ status: "error", message: "Does not match requirnment!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error during signup", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email or password" });
    }

    // create token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    await JWTToken.create({ user_id: user.id, jwt_token: token });

    res.status(200).json({ message: "Login successful", data: token });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error during login", error });
  }
};

module.exports = { signUp, login };

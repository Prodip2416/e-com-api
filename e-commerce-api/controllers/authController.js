const jwt = require("jsonwebtoken");
const { User, JWTToken, UserRole, Role } = require("../models");
const { sendEmail } = require("../utils/lib");
const { JWT_SECRET } = process.env;
require("dotenv").config();

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
        is_email_verified: false,
      });
      const userResponse = newUser.get({ plain: true });
      delete userResponse.password_hash;

      // Send verification email
      const verificationLink = `${process.env.CLIENT_URL_FOR_EMAIL_VERIFY}?code=${userResponse.email_verification_code}`;
      const emailText = `Hi ${name},\n\nPlease verify your email by clicking the link: ${verificationLink}\n\nThank you!`;

      const emailResponse = await sendEmail(
        email,
        "Verify Your Email",
        emailText
      );
      if (!emailResponse.success) {
        console.log(emailResponse.error);
      }
      //end

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
    console.log(error);
    res
      .status(500)
      .json({ status: "error", message: "Error during signup", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let roles = [];

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

    // get roles for the user
    const fineItem = await UserRole.findAll({
      where: { user_id: user?.id },
      include: [{ model: Role, as: "role", attributes: ["id", "name"] }],
    });

    if (fineItem.length > 0) {
      roles = fineItem.map((item) => item.role?.name);
    }
    // end role

    // create token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: roles },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    await JWTToken.create({ user_id: user.id, jwt_token: token });

    res.status(200).json({ message: "Login successful", data: token });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error during login", error });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Update user's email verification status
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    if (user.is_email_verified) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already verified" });
    }

    if (code === user.email_verification_code) {
      user.is_email_verified = true;
      user.email_verification_code = null;
      await user.save();

      res.status(200).json({ message: "Email verified successfully" });
    } else {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid verification code" });
    }
  } catch (error) {
    console.error("Error verifying email:", error.message);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = { signUp, login, verifyEmail };

const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  try {
    // Extract token from the authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ status: "error", message: "Unauthorized access" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user's role is 'admin'
    if (!decoded.role?.includes("Admin")) {
      return res.status(403).json({
        status: "error",
        message: "Forbidden: You do not have admin privileges",
      });
    }

    // Add decoded user data to the request object
    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: "error", message: "Invalid or expired token" });
  }
};

module.exports = isAdmin;

const express = require("express");
const { getUsers } = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdminMiddleware");

const router = express.Router();

// Route to get list of users (protected by JWT)
router.get("/users", authenticate, isAdmin, getUsers);

module.exports = router;

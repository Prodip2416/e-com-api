const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const { getDashboardData } = require("../controllers/adminController");
const isAdmin = require("../middleware/isAdminMiddleware");

const router = express.Router();

// Route to get list of users (protected by JWT)
router.get("/dashboard", authenticate, isAdmin, getDashboardData);

module.exports = router;

const express = require("express");
const {
  assignRoleToUser,
  removeRoleFromUser,
  getUserRoles,
} = require("../controllers/roleUserController");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/assign-role", authenticate, assignRoleToUser);
router.post("/remove-role", authenticate, removeRoleFromUser);
router.get("/:userId/roles", authenticate, getUserRoles);

module.exports = router;

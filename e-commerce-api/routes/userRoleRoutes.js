const express = require("express");
const {
  assignRoleToUser,
  removeRoleFromUser,
  getUserRoles,
} = require("../controllers/roleUserController");
const {
  createUserRoleValidation,
  removeRoleValidation,
} = require("../validations/userRoleValidation");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/assign-role",
  authenticate,
  createUserRoleValidation,
  assignRoleToUser
);
router.post(
  "/remove-role",
  authenticate,
  removeRoleValidation,
  removeRoleFromUser
);
router.get("/:userId/roles", authenticate, getUserRoles);

module.exports = router;

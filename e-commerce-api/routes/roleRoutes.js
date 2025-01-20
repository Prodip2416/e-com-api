const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getRoleById,
} = require("../controllers/roleController");
const {
  createRoleValidation,
  updateRoleValidation,
  getByIdValidation,
} = require("../validations/roleValidation");

const router = express.Router();

// Route to get list of users (protected by JWT)
router.get("/roles", authenticate, getRoles);
router.get("/role/:id", authenticate, getByIdValidation, getRoleById);
router.post("/role", authenticate, createRoleValidation, createRole);
router.put("/role", authenticate, updateRoleValidation, updateRole);
router.delete("/role", authenticate, deleteRole);

module.exports = router;

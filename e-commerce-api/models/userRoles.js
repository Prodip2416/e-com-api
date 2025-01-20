const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const User = require("./user");
const Role = require("./role");

const UserRole = sequelize.define(
  "UserRole",
  {},
  {
    timestamps: false, // No timestamps for this association table
  }
);

// Associations
User.belongsToMany(Role, { through: UserRole, foreignKey: "user_id" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "role_id" });

module.exports = UserRole;

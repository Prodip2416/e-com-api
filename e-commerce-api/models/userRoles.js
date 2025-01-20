const sequelize = require("../config/config");
const User = require("./user");
const Role = require("./roles");
const { DataTypes } = require("sequelize");

// models/userRole.js
const UserRole = sequelize.define("UserRole", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users", 
      key: "id",
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "Roles", 
      key: "id",
    },
  },
});

// Set up associations
User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "user_id",
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "role_id",
});

// Optional: Define direct associations if you want to query through UserRole
UserRole.belongsTo(User, { foreignKey: "user_id" });
UserRole.belongsTo(Role, { foreignKey: "role_id" });



module.exports = UserRole;
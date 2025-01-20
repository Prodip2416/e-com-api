const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Role = sequelize.define(
  "Role",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false, // No need for updated_at
  }
);

module.exports = Role;

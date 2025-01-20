const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const JWTToken = sequelize.define("JWTToken", {
  jwt_token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = JWTToken;

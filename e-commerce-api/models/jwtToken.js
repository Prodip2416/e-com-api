module.exports = (sequelize, DataTypes) => {
  const JWTToken = sequelize.define(
    "JWTToken",
    {
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
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Define associations (if needed in the future)
  JWTToken.associate = (models) => {
    // Example: JWTToken.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  return JWTToken;
};

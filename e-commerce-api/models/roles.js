module.exports = (sequelize, DataTypes) => {
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

  // Define associations (if any)
  Role.associate = (models) => {
    // Example: Role.hasMany(models.User, { foreignKey: "roleId", as: "users" });
  };

  return Role;
};

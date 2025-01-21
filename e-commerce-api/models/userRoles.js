module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define("UserRole", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Table name
        key: "id",
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Roles", // Table name
        key: "id",
      },
    },
  });

  // Associate method for defining relationships
  UserRole.associate = (models) => {
    // Many-to-Many between User and Role through UserRole
    models.User.belongsToMany(models.Role, {
      through: UserRole,
      foreignKey: "user_id",
      as: "roles",
    });

    models.Role.belongsToMany(models.User, {
      through: UserRole,
      foreignKey: "role_id",
      as: "users",
    });

    // Optional: Add direct UserRole -> User and UserRole -> Role associations
    UserRole.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    UserRole.belongsTo(models.Role, { foreignKey: "role_id", as: "role" });
  };

  return UserRole;
};

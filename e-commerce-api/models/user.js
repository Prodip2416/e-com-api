const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          user.password_hash = await bcrypt.hash(user.password_hash, 10);
        },
      },
    }
  );

  // Instance method for comparing passwords
  User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password_hash);
  };

  // Associate method for defining relationships (if needed in the future)
  User.associate = (models) => {
    // Example: User.hasMany(models.Order, { foreignKey: "userId", as: "orders" });
  };

  return User;
};

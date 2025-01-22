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
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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

  User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password_hash);
  };

  User.associate = (models) => {
    User.hasOne(models.Cart, { foreignKey: "user_id", as: "cart" });
    User.hasOne(models.Order, { foreignKey: "user_id", as: "order" });
  };

  return User;
};

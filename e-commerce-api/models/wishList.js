module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define("Wishlist", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
    },
  });

  Wishlist.associate = (models) => {
    // Associate Wishlist with User
    Wishlist.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    // Associate Wishlist with Product
    Wishlist.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  };

  return Wishlist;
};

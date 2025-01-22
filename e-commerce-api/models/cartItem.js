module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define("CartItem", {
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Carts",
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, { foreignKey: "cart_id", as: "cart" });
    CartItem.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  };

  return CartItem;
};

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", 
        key: "id",
      },
    },
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    Cart.hasMany(models.CartItem, { foreignKey: "cart_id", as: "items" });
  };

  return Cart;
};

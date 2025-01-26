module.exports = (sequelize, DataTypes) => {
  const ProductRating = sequelize.define("ProductRating", {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  ProductRating.associate = (models) => {
    ProductRating.belongsTo(models.Product, { foreignKey: "user_id", as: "product" });
    ProductRating.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  };

  return ProductRating;
};

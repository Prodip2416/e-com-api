module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Define associations
  Product.associate = (models) => {
    Product.hasMany(models.ProductImage, {
      foreignKey: "productId",
      as: "images",
    });
    Product.hasMany(models.CartItem, {
      foreignKey: "product_id",
      as: "cartItems",
    });
    Product.hasMany(models.OrderDetail, {
      foreignKey: "product_id",
      as: "orderdetails",
    });
  };

  return Product;
};

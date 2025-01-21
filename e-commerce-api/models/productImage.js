module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define(
    "ProductImage",
    {
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productId: {
        // Define the foreign key column
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products", // Table name of the Product model
          key: "id",
        },
        onDelete: "CASCADE", // Optional: Cascade deletes when the related product is deleted
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Define associations
  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };

  return ProductImage;
};

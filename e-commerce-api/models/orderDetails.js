module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define("OrderDetail", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Orders", // Table name
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products", // Table name
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  OrderDetail.associate = (models) => {
    OrderDetail.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });
    OrderDetail.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  };

  return OrderDetail;
};

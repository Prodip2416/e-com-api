"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Orders", "status");

    await queryInterface.addColumn("Orders", "status", {
      type: Sequelize.ENUM("Pending", "Shipped", "Delivered", "Canceled", "Returned"),
      allowNull: false,
      defaultValue: "Pending",
    });
  },

  async down(queryInterface, Sequelize) {

  },
};

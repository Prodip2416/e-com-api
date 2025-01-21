'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the `is_active` column
    await queryInterface.addColumn('Products', 'is_active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the `is_active` column in case of rollback
    await queryInterface.removeColumn('Products', 'is_active');
  },
};

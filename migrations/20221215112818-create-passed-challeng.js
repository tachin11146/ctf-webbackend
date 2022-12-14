'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('passed_challengs', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      challengId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      passed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('passed_challengs');
  }
};
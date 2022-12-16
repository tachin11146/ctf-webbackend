'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: false
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      teamId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        defaultValue: -1
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
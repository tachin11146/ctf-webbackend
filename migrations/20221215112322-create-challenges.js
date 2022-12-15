'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('challenges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        primaryKey : true ,
        allowNull: false,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      quiz: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false
      },
      flag: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false
      },
      file: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false
      },
      hint: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW

      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('challenges');
  }
};
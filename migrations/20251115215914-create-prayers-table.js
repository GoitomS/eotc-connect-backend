'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prayers', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      language: {
        type: Sequelize.STRING,
        allowNull: true
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('prayers');
  }
};

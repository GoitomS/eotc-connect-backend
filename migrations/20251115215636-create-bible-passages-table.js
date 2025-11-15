'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bible_passages', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      book: {
        type: Sequelize.STRING,
        allowNull: false
      },
      chapter: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      verse: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      translation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      language: {
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
    await queryInterface.dropTable('bible_passages');
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('summaries', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY, // The date for the summary (e.g., 2024-10-26)
        allowNull: false,
      },
      avg_temp: {
        type: Sequelize.FLOAT, // Average temperature for that city on the specified date
        allowNull: false,
      },
      min_temp: {
        type: Sequelize.FLOAT, // Minimum temperature for that city on the specified date
        allowNull: false,
      },
      max_temp: {
        type: Sequelize.FLOAT, // Maximum temperature for that city on the specified date
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('summaries');
  }
};

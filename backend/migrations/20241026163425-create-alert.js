'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('alerts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      cityName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      weatherParameter: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      comparison: {
        type: Sequelize.ENUM('greater_than', 'less_than'),
        allowNull: false,
      },
      thresholdValue: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      alertTriggeredAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      threshold_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'thresholds',
          key: 'id',
        },
        allowNull: false,
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('alerts');
  }
};

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js');
const User = require('./User.js'); // Assuming you have a User model

const Threshold = sequelize.define('Threshold', {
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parameter: {
    type: DataTypes.STRING, // e.g., 'temperature', 'humidity', etc.
    allowNull: false,
  },
  comparison: {
    type: DataTypes.ENUM('greater_than', 'less_than'), // Comparison type
    allowNull: false,
  },
  threshold_value: {
    type: DataTypes.FLOAT, // Threshold value set by the user
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // Name of the table where User is stored
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'thresholds',
});

Threshold.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Threshold;

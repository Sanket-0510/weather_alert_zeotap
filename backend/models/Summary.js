const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Summary = sequelize.define('Summary', {
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  avg_temp: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  max_temp: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  min_temp: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  dominant_condition: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Summary;

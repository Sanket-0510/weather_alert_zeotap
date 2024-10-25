const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const Weather = sequelize.define('Weather', {
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  temp: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  feels_like: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  main: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dt: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
});

module.exports = Weather;

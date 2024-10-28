const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js'); // Assuming you have a config for sequelize

const WeatherData = sequelize.define('WeatherData', {
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,  // Stores just the date (YYYY-MM-DD)
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,  // For real-time temperature values
  },
  feels_like: {
    type: DataTypes.FLOAT,  // For real-time 'feels like' temperature
  },
  weather_main: {
    type: DataTypes.STRING,  // Main weather condition (e.g., 'Clear', 'Clouds')
  },
  timestamp: {
    type: DataTypes.INTEGER,  // UNIX timestamp for real-time data
  }
}, {
  timestamps: true,  // Automatically manage createdAt and updatedAt fields
  tableName: 'weather_data'
});

module.exports = WeatherData;

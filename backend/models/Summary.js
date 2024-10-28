const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js');

const Summary = sequelize.define('Summary', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avg_temp: {
        type: DataTypes.FLOAT,
    },
    min_temp: {
        type: DataTypes.FLOAT,
    },
    max_temp: {
        type: DataTypes.FLOAT,
    },
    }, {
    timestamps: true,
    tableName: 'summaries',
    });

module.exports = Summary;
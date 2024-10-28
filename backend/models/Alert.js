const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js'); // Adjust the path as necessary
const User = require('./User.js'); // Assuming you have a User model
const Threshold = require('./Threshold.js'); // Assuming you have a Threshold model
const Alert = sequelize.define('Alert', {
    cityName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    weatherParameter: {
        type: DataTypes.STRING,
        allowNull: false
    },
    thresholdValue: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    alertTriggeredAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    comparison: {
        type: DataTypes.ENUM('greater_than', 'less_than'),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    threshold_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'alerts'
});

Alert.belongsTo(User, { foreignKey: 'userId' });
Alert.belongsTo(Threshold, { foreignKey: 'threshold_id' });

module.exports = Alert;
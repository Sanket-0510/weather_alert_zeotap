const sequelize = require('../config/sequelize.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alerts : {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    },  {
      timestamps: true,  // Automatically manage createdAt and updatedAt fields
      tableName: 'users'
    });
  
module.exports = User;
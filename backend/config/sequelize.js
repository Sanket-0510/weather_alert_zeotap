const { Sequelize } = require('sequelize');
const config = require('./config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres',
});

module.exports = sequelize;

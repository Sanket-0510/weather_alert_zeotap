const express = require('express');
const weatherRouter = express.Router();
const { getWeatherData, processWeatherData, getWeatherDataForCity, getHistoricalData} = require('../controllers/wheatherController.js');
const authenticate = require('../middlewares/auth.js');

weatherRouter.post('/dashboard', authenticate, getWeatherData);


weatherRouter.get('/:city', authenticate, getWeatherDataForCity);
weatherRouter.post('/:city/historical', authenticate, getHistoricalData);

module.exports = weatherRouter;

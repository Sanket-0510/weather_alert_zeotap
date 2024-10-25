const express = require('express');
const router = express.Router();
const { getWeather, processWeatherData } = require('../controllers/weatherController');

router.get('/current', getWeather);
router.post('/process', processWeatherData);

module.exports = router;

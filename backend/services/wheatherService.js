const axios = require('axios');
const { Weather, Summary } = require('../models');
const { convertKelvinToCelsius, calculateAggregates } = require('../utils/openWeatherMapAPI');
const { alertService } = require('./alertService');

const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const getWeatherData = async () => {
  const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
  const weatherData = [];

  for (let city of CITIES) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const weather = response.data;

    weatherData.push({
      city: city,
      temp: convertKelvinToCelsius(weather.main.temp),
      feels_like: convertKelvinToCelsius(weather.main.feels_like),
      main: weather.weather[0].main,
      dt: weather.dt
    });
  }

  return weatherData;
};

const processWeather = async () => {
  const weatherData = await getWeatherData();

  for (let data of weatherData) {
    await Weather.create(data);

    // Check if alert needs to be triggered
    alertService(data);
  }

  // Perform daily rollup calculations
  calculateDailySummary();
};

const scheduleWeatherUpdates = () => {
    setInterval(async () => {
      try {
        await processWeather();
      } catch (error) {
        console.error('Error processing weather data:', error);
      }
    }, process.env.INTERVAL || 300000); // Default to 5 minutes if INTERVAL is not set
  };

const calculateDailySummary = async () => {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD
  
    const data = await Weather.findAll({
      where: {
        date: today
      }
    });
  
    if (data.length === 0) return;
  
    const avgTemp = data.reduce((sum, record) => sum + record.temp, 0) / data.length;
    const maxTemp = Math.max(...data.map(record => record.temp));
    const minTemp = Math.min(...data.map(record => record.temp));
  
    // Dominant weather condition based on frequency
    const conditionCount = data.reduce((acc, record) => {
      acc[record.main] = (acc[record.main] || 0) + 1;
      return acc;
    }, {});
  
    const dominantCondition = Object.keys(conditionCount).reduce((a, b) =>
      conditionCount[a] > conditionCount[b] ? a : b
    );
  
    // Store summary
    await Summary.create({
      city: data[0].city,
      date: today,
      avg_temp: avgTemp,
      max_temp: maxTemp,
      min_temp: minTemp,
      dominant_condition: dominantCondition
    });
  };
  
module.exports = { getWeatherData, processWeather, scheduleWeatherUpdates, calculateDailySummary };

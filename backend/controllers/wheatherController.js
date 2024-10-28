const axios = require('axios');
const WeatherData = require('../models/Weather.js');
const {convertKelvinToCelsius} = require('../utils/openWeatherMapAPI.js');
const moment = require('moment');
const Summary = require('../models/Summary.js');

const getWeatherData = async (req, res) => {
  const CITIES = req.body.cities;
  const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
  const weatherData = [];

  for (let city of CITIES) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      const weather = response.data;

      console.log(weather);
      const cityWeather = {
        city,
        temp: convertKelvinToCelsius(weather.main.temp),
        feels_like: convertKelvinToCelsius(weather.main.feels_like),
        weather_main: weather.weather[0].main,
        timestamp: weather.dt
      };
      weatherData.push(cityWeather);

      // Store the real-time weather data in the database
      await WeatherData.create({
        city,
        date: new Date(weather.dt * 1000).toISOString().split('T')[0],  // Store only the date part
        temperature: cityWeather.temp,
        feels_like: cityWeather.feels_like,
        weather_main: cityWeather.weather_main,
        timestamp: cityWeather.timestamp
      });
    } catch (error) {
      console.error(`Error fetching weather data for ${city}:`, error);
    }
  }
  return res.json(weatherData);
};


const getWeatherDataForCity = async (req, res) => {
  console.log("inside getWeatherDataForCity");
  const city = req.params.city;
  console.log("city is " +city);  
  const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    console.log(response);
    const weather = response.data;

    console.log(weather);
    const cityWeather = {
      city,
      temp: convertKelvinToCelsius(weather.main.temp),
      feels_like: convertKelvinToCelsius(weather.main.feels_like),
      weather_main: weather.weather[0].main,
      timestamp: weather.dt
    };
    return res.json(cityWeather);
  } catch (error) {
    console.log(error);
    console.error(`Error fetching weather data for ${city}:`, error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const storeDailySummary = async (cities, date) => {
  

  try {
    for (let city of cities) {
      // Fetch weather data for the specific city and date
      const weatherRecords = await WeatherData.findAll({
        where: {
          city,
          date
        }
      });

      if (weatherRecords.length === 0) {
        console.log(`No data found for ${city} on ${date}.`);
        continue;
      }

      // Calculate average, min, and max temperatures
      const avgTemp = weatherRecords.reduce((acc, curr) => acc + curr.temperature, 0) / weatherRecords.length;
      const minTemp = Math.min(...weatherRecords.map(record => record.temperature));
      const maxTemp = Math.max(...weatherRecords.map(record => record.temperature));

      // Store the calculated summary in the Summary table
      await Summary.create({
        city,
        date,
        avg_temp: avgTemp,
        min_temp: minTemp,
        max_temp: maxTemp
      });

      console.log(`Summary for ${city} on ${date} stored successfully.`);
    }

    return res.json({ message: 'Summaries stored successfully.' });
  } catch (error) {
    console.error('Error storing daily summary:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get historical data
const getHistoricalData = async (req, res) => {
  const { city } = req.body;

  try {
    const summaries = [];

    // Fetch summaries for the past 7 days
    for (let i = 1; i <= 7; i++) {
      const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
      const summary = await Summary.findOne({
        where: {
          city,
          date
        },
        attributes: ['avg_temp', 'min_temp', 'max_temp', 'date']
      });

      if (summary) {
        summaries.push(summary);
      }
    }

    if (summaries.length === 0) {
      return res.status(404).json({ message: 'No data found for the given city and date range.' });
    }
    console.log(summaries);

    return res.json(summaries);
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { getWeatherData, storeDailySummary,  getWeatherDataForCity,getHistoricalData };

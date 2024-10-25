const weatherService = require('../services/weatherService.js');
const { alertService } = require('../services/alertService.js');

const getWeather = async (req, res) => {
  try {
    const weatherData = await weatherService.getWeatherData();
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data', error });
  }
};

const processWeatherData = async (req, res) => {
  try {
    await weatherService.processWeather();
    res.status(200).json({ message: 'Weather data processed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing weather data', error });
  }
};

const weatherUpdateHandler = (weatherData) => {
  // Extract relevant weather data
  const processedData = {
    city: weatherData.name,
    temp: weatherData.main.temp - 273.15, // Convert Kelvin to Celsius
    feels_like: weatherData.main.feels_like - 273.15,
    main: weatherData.weather[0].main,
    dt: weatherData.dt,
  };

  // Call alert service to check if alert conditions are met
  alertService(processedData);
};


module.exports = { getWeather, processWeatherData, weatherUpdateHandler };

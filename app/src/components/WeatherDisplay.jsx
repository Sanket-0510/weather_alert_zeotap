import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get city from URL
import Chart from 'chart.js/auto'; // Chart.js for historical data
import '../styles/WeatherDisplay.css';  
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Navbar from './Navbar';

const WeatherDisplay = () => {
  const { city } = useParams(); // Get city name from the URL
  const [weather, setWeather] = useState(null);
  const [historicalData, setHistoricalData] = useState([]); // Initialize as an array
  const chartRef = useRef(null); // useRef for the canvas

  // Dummy historical data
  const dummyHistoricalData = [
    { date: '2024-10-19', temp: 23.5 },
    { date: '2024-10-20', temp: 24.1 },
    { date: '2024-10-21', temp: 22.8 },
    { date: '2024-10-22', temp: 23.0 },
    { date: '2024-10-23', temp: 24.5 },
    { date: '2024-10-24', temp: 23.9 },
    { date: '2024-10-25', temp: 25.2 },
  ];
  
  useEffect(() => {
    setHistoricalData(dummyHistoricalData);  // Set the dummy data here
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch today's weather for the city
        const weatherResponse = await fetch(`${process.env.REACT_APP_URL}/weather/${city}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);

        // Fetch historical weather data for the city
        const parameters = ["temperature", "humidity", "windSpeed"];
       
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [city]); // Add city as a dependency




const WeatherChart = ({ historicalData }) => {
  return (
    <LineChart width={600} height={300} data={historicalData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
    </LineChart>
  );
};



  return (
    <div className="weather-display">
      <Navbar />
      {weather ? (
        <>
          <h1>Weather in {city}</h1>
          <p>Temperature: {weather.temp}°C</p>
          <p>Condition: {weather.condition}</p>
          <p>Wind Speed: {weather.windSpeed} km/h</p>
  
          {/* Historical Weather Chart */}
          <WeatherChart historicalData={historicalData} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
};

export default WeatherDisplay;

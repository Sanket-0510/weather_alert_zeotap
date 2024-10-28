import React, { useEffect, useState } from 'react';
import WeatherCard from './WeatherCard';
import '../styles/Dashboard.css'; 
import Navbar from './Navbar';

const cities = [
  { name: 'Mumbai', image: 'mumbai.jpeg' },
  { name: 'Delhi', image: 'delhi.jpg' },
  { name: 'Bangalore', image: 'bangalore.jpg' },
  { name: 'Chennai', image: 'chennai.jpg' },
  { name: 'Kolkata', image: 'kolkata.jpg' },
];

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const token = localStorage.getItem('token');
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/weather/dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cities: cities.map(city => city.name), token:token })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData(); 

    const intervalId = setInterval(() => {
      fetchWeatherData(); 
    }, 300000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className="dashboard">
      <Navbar />
      <h1>Major Cities Weather</h1>
      <div className="weather-cards-container">
        {cities.map((city, index) => (
          <WeatherCard
            key={city.name}
            city={city.name}
            temp={weatherData[index]?.temp || 'Loading...'}
            condition={weatherData[index]?.condition || 'Loading...'}
            windSpeed={weatherData[index]?.windSpeed || 'Loading...'}
            humidity={weatherData[index]?.humidity || 'Loading...'}
            image={city.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

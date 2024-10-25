import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

const WeatherDisplay = () => {
  const { state } = useContext(WeatherContext);
  const { weatherData } = state;

  return (
    <div>
      <h2>Current Weather</h2>
      {weatherData.map((city) => (
        <div key={city.city}>
          <h3>{city.city}</h3>
          <p>Temperature: {city.temp}°C</p>
          <p>Feels Like: {city.feels_like}°C</p>
          <p>Condition: {city.main}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherDisplay;

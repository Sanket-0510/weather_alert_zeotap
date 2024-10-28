import React from 'react';
import { Link } from 'react-router-dom'; // For navigating to the detailed page
import '../styles/WeatherCard.css'; // Minimalist styling for this component

const WeatherCard = ({ city, temp, condition, windSpeed, humidity, image }) => {
  return (
    <div className="weather-card">
      <img src={`/images/${image}`} alt={`${city} skyline`} className="city-image" />
      <h2>{city}</h2>
      <p>Temperature: {temp}°C</p>
      <p>Condition: {condition}</p>
      <p>Wind Speed: {windSpeed} km/h</p>
      
      {/* Weather Summary */}
      <div className="weather-summary">
        <p>Humidity: {humidity}%</p>
      </div>

      {/* Link to detailed page */}
      <Link to={`/weather/${city.toLowerCase()}`} className="details-link">
        View Details
      </Link>
    </div>
  );
};

export default WeatherCard;

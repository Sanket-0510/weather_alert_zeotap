import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

const WeatherSummary = () => {
  const { state } = useContext(WeatherContext);
  const { dailySummaries } = state;

  return (
    <div>
      <h2>Daily Weather Summaries</h2>
      {dailySummaries.map((summary) => (
        <div key={summary.city}>
          <h3>{summary.city} - {summary.date}</h3>
          <p>Average Temperature: {summary.avg_temp}°C</p>
          <p>Max Temperature: {summary.max_temp}°C</p>
          <p>Min Temperature: {summary.min_temp}°C</p>
          <p>Dominant Condition: {summary.dominant_condition}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherSummary;

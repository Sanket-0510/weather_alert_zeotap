import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

const Alerts = () => {
  const { state } = useContext(WeatherContext);
  const { alerts } = state;

  return (
    <div>
      <h2>Weather Alerts</h2>
      {alerts.length > 0 ? (
        alerts.map((alert, index) => (
          <div key={index}>
            <p>Alert: {alert.message}</p>
          </div>
        ))
      ) : (
        <p>No active alerts.</p>
      )}
    </div>
  );
};

export default Alerts;

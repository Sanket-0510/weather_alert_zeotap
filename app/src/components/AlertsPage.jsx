import React, { useEffect, useState } from 'react';
import '../styles/AlertsPage.css';
import Navbar from './Navbar';

const AlertsPage = () => {
  const token = localStorage.getItem('token'); 
  const [alerts, setAlerts] = useState([]); // Initial state as an empty array
  const [loading, setLoading] = useState(true); // Loading state for better UX
  const [error, setError] = useState(null); // Error state for handling API errors

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/user/alerts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        // Check if the data is an array, if not default to an empty array
        if (Array.isArray(data)) {
          setAlerts(data);
        } else {
          setAlerts([]); // Default to an empty array if the response isn't an array
        }
        setLoading(false); // Stop loading after the data is fetched
      })
      .catch(error => {
        console.error('Error fetching alerts:', error);
        setError('Failed to fetch alerts.');
        setLoading(false); // Stop loading even if there's an error
      });
  }, [token]);

  if (loading) {
    return <p>Loading alerts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="alerts-page">
      <Navbar /> 
      <h1>Weather Alerts</h1>

      {alerts.length === 0 ? (
        <p>No alerts triggered yet.</p>
      ) : (
        <div className="alerts-container">
          {alerts.map(alert => (
            <div className="alert-card" key={alert.id}>
              <h3>{alert.cityName}</h3>
              <p><strong>Parameter:</strong> {alert.weatherParameter}</p>
              <p><strong>Condition:</strong> {alert.comparison}  {alert.value} </p>
              <p><strong>Triggered At:</strong> {new Date(alert.alertTriggeredAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsPage;

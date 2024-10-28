import React, { useState, useEffect } from 'react';
import '../styles/ProfileSettings.css';
import Navbar from './Navbar';

const ProfileSettings = () => {
  const token = localStorage.getItem("token"); // Get token from local storage
  const [user, setUser] = useState(null); // State for user information
  const [password, setPassword] = useState('');
  const [enableAlerts, setEnableAlerts] = useState(false); // Default value
  const [city, setCity] = useState('');
  const [parameter, setParameter] = useState('temperature');
  const [condition, setCondition] = useState('greater_than');
  const [thresholdValue, setThresholdValue] = useState('');
  const [thresholds, setThresholds] = useState([]); // Array to store multiple thresholds
  const [existingThresholds, setExistingThresholds] = useState([]);

  // Fetch user info from token
  useEffect(() => {
    if (token) {
      const decodedUserInfo = parseJwt(token);
      setUser(decodedUserInfo); // Set user information from decoded token
      setEnableAlerts(decodedUserInfo.enableAlerts || false); // Set enableAlerts from user data
    }
  }, [token]);

  const handleSaveProfile = () => {
    // Send all profile data including thresholds to backend
    console.log({ enableAlerts, thresholds });
    const token_id = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_URL}/user/update-profile`, {
      method: 'POST',
      body: JSON.stringify({ enableAlerts, thresholds }),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token_id}` }
    }).then(response => response.json()).then(data => alert('Profile updated!')).catch(err => console.error('Error updating profile:', err));
  };

  const handleAddThreshold = () => {
    const newThreshold = { city, parameter, condition, thresholdValue };
    
    // Add new threshold to the existing array
    setThresholds([...thresholds, newThreshold]);
    
    // Clear input fields after adding
    setCity('');
    setParameter('temperature');
    setCondition('greater_than');
    setThresholdValue('');
  };
  
  
  const handleDeleteThreshold = (index) => {
    const updatedThresholds = thresholds.filter((_, i) => i !== index); // Remove the selected threshold
    setThresholds(updatedThresholds);
  };
  
   useEffect (() => {
    fetch(`${process.env.REACT_APP_URL}/user/thresholds`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
         setThresholds([...data, ...thresholds]);
      })
      .catch(error => {
        console.error('Error fetching thresholds:', error);
      });
  },[])

    
  return (
    <div className="profile-settings">
      <Navbar />
      <h1>Profile Settings</h1>

      {/* User Info Display (Read-Only) */}
      {user && (
        <div className="profile-info">
          <label>
            Name:
            <input type="text" value={user.name} readOnly /> {/* Read-only, fetched from token */}
          </label>
          <label>
            Email:
            <input type="email" value={user.email} readOnly /> {/* Read-only, fetched from token */}
          </label>
          <label>
            Change Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
          </label>
          <label>
            Enable Email Alerts:
            <input type="checkbox" checked={enableAlerts} onChange={() => setEnableAlerts(!enableAlerts)} />
          </label>
          <button onClick={handleSaveProfile}>Save Profile</button>
        </div>
      )}

      {/* Threshold Configuration Form */}
      <div className="threshold-config">
        <h2>Set Weather Alert Thresholds</h2>
        <label>
          City:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Mumbai" />
        </label>
        <label>
          Parameter:
          <select value={parameter} onChange={(e) => setParameter(e.target.value)}>
            <option value="temperature">Temperature</option>
            <option value="wind speed">Wind Speed</option>
            <option value="humidity">Humidity</option>
          </select>
        </label>
        <label>
          Condition:
          <select value={condition} onChange={(e) => setCondition(e.target.value)}>
            <option value="greater_than">Greater Than</option>
            <option value="less_than">Less Than</option>
          </select>
        </label>
        <label>
          Threshold Value:
          <input type="number" value={thresholdValue} onChange={(e) => setThresholdValue(e.target.value)} placeholder="Enter Value" />
        </label>
        <button onClick={handleAddThreshold}>Add Threshold</button>
      </div>

      {/* Display Added Thresholds */}
      <div className="threshold-list">
        <h3>Added Thresholds</h3>
        <ul>
          {thresholds.map((threshold, index) => (
            <li key={index}>
              {threshold.city} - {threshold.parameter} {threshold.condition} {threshold.thresholdValue}
              <button onClick={() => handleDeleteThreshold(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Helper function to decode JWT token
const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export default ProfileSettings;

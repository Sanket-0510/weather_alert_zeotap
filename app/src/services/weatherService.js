// src/services/apiService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_URL;  // This is your backend server URL

export const fetchWeatherData = async () => {
  const response = await axios.get(`${API_URL}/weather`);
  return response.data;
};

export const fetchDailySummaries = async () => {
  const response = await axios.get(`${API_URL}/summaries`);
  return response.data;
};

export const fetchAlerts = async () => {
  const response = await axios.get(`${API_URL}/alerts`);
  return response.data;
};

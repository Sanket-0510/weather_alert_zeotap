import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust the URL to your backend

export const getWeatherData = async () => {
  try {
    const response = await axios.get(`${API_URL}/weather`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return [];
  }
};

export const getDailySummaries = async () => {
  try {
    const response = await axios.get(`${API_URL}/summaries`);
    return response.data;
  } catch (error) {
    console.error('Error fetching summaries:', error);
    return [];
  }
};

export const getAlerts = async () => {
  try {
    const response = await axios.get(`${API_URL}/alerts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
};

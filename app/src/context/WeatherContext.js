import React, { createContext, useReducer, useEffect } from 'react';
import { getWeatherData, getDailySummaries, getAlerts } from '../services/weatherService';

const WeatherContext = createContext();

const initialState = {
  weatherData: [],
  dailySummaries: [],
  alerts: [],
  threshold: 35, // Default threshold
};

const weatherReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WEATHER_DATA':
      return { ...state, weatherData: action.payload };
    case 'SET_SUMMARIES':
      return { ...state, dailySummaries: action.payload };
    case 'SET_ALERTS':
      return { ...state, alerts: action.payload };
    case 'SET_THRESHOLD':
      return { ...state, threshold: action.payload };
    default:
      return state;
  }
};

const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  useEffect(() => {
    async function fetchData() {
      const weather = await getWeatherData();
      const summaries = await getDailySummaries();
      const alerts = await getAlerts();
      dispatch({ type: 'SET_WEATHER_DATA', payload: weather });
      dispatch({ type: 'SET_SUMMARIES', payload: summaries });
      dispatch({ type: 'SET_ALERTS', payload: alerts });
    }

    fetchData();
  }, []);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherProvider };

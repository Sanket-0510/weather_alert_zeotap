// import React, { createContext, useState, useEffect } from 'react';
// import { getWeatherData, getDailySummaries, getAlerts } from '../services/weatherService';

// const WeatherContext = createContext();

// const WeatherProvider = ({ children }) => {
//   const [weatherData, setWeatherData] = useState([]);
//   const [dailySummaries, setDailySummaries] = useState([]);
//   const [alerts, setAlerts] = useState([]);
//   const [threshold, setThreshold] = useState(35); // Default threshold

//   useEffect(() => {
//     async function fetchData() {
//       const weather = await getWeatherData();
//       const summaries = await getDailySummaries();
//       const alertData = await getAlerts();
      
//       setWeatherData(weather);
//       setDailySummaries(summaries);
//       setAlerts(alertData);
//     }

//     fetchData();
//   }, []);

//   return (
//     <WeatherContext.Provider value={{ weatherData, dailySummaries, alerts, threshold, setThreshold }}>
//       {children}
//     </WeatherContext.Provider>
//   );
// };

// export { WeatherContext, WeatherProvider };

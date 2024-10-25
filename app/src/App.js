import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherSummary from './components/WeatherSummary';
import Alerts from './components/Alerts';
import ThresholdConfig from './components/ThresholdConfig';
import HistoricalChart from './components/HistoricalChart';

const App = () => {
  return (
    <WeatherProvider>
      <div>
        <WeatherDisplay />
        <WeatherSummary />
        <Alerts />
        <ThresholdConfig />
        <HistoricalChart />
      </div>
    </WeatherProvider>
  );
};

export default App;

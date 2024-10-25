import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { WeatherContext } from '../context/WeatherContext';

const HistoricalChart = () => {
  const { state } = useContext(WeatherContext);
  const { dailySummaries } = state;

  const data = {
    labels: dailySummaries.map((summary) => summary.date),
    datasets: [
      {
        label: 'Average Temperature',
        data: dailySummaries.map((summary) => summary.avg_temp),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};
``
export default HistoricalChart;

const { getWeatherData } = require('../services/weatherService');
const axios = require('axios');

jest.mock('axios');

test('should fetch weather data for cities', async () => {
  axios.get.mockResolvedValue({ data: { main: { temp: 300 }, weather: [{ main: 'Clear' }], dt: 12345 } });

  const result = await getWeatherData();
  expect(result.length).toBeGreaterThan(0);
  expect(result[0].temp).toBeCloseTo(26.85); // 300K = 26.85°C
});

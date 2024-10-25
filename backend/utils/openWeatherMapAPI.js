const convertKelvinToCelsius = (temp) => {
    return temp - 273.15;
  };
  
const calculateAggregates = (weatherData) => {
    // Initialize variables to store aggregate values
    let totalTemp = 0;
    let maxTemp = -Infinity;
    let minTemp = Infinity;
    let weatherConditionCount = {};

    // Process each weather record
    weatherData.forEach((data) => {
        // Calculate total temperature for average
        totalTemp += data.temp;

        // Track max and min temperature
        if (data.temp > maxTemp) {
            maxTemp = data.temp;
        }

        if (data.temp < minTemp) {
            minTemp = data.temp;
        }

        const weatherCondition = data.main;
        if (weatherConditionCount[weatherCondition]) {
            weatherConditionCount[weatherCondition]++;
        } else {
            weatherConditionCount[weatherCondition] = 1;
        }
    });

    const avgTemp = totalTemp / weatherData.length;

    const dominantWeatherCondition = Object.keys(weatherConditionCount).reduce((a, b) => 
        weatherConditionCount[a] > weatherConditionCount[b] ? a : b
    );


    return {
        averageTemperature: avgTemp.toFixed(2),  
        maxTemperature: maxTemp.toFixed(2),
        minTemperature: minTemp.toFixed(2),
        dominantWeatherCondition: dominantWeatherCondition,
    };
};


module.exports = { convertKelvinToCelsius, calculateAggregates };
  
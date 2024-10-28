const Alert = require('../models/Alert');
const Threshold = require('../models/Threshold.js');
const User = require('../models/User.js'); 
const axios = require('axios');
const {sendEmailAlert} = require('../services/emailService.js');
const userRouter = require('../routes/userRoutes.js');
const createThreshold = async (req, res) => {
  try {
    const thresholds = req.body.thresholds;
    const userId = req.user.id; 

    await Alert.destroy({
      where: {
        userId: userId
      }
    });

    console.log('Existing alerts deleted.');


    await Threshold.destroy({
      where: {
        user_id: userId
      }
    });

    console.log('Existing thresholds deleted.');

    const result = [];

    //  Create new thresholds for the user
    for (const threshold of thresholds) {
      const { city, parameter, condition, thresholdValue } = threshold;
      const comparison = condition === 'greater_than' ? 'greater_than' : 'less_than';

      const newThreshold = await Threshold.create({
        city,
        parameter,
        comparison,
        threshold_value: thresholdValue,
        user_id: userId
      });

      result.push(newThreshold);
      console.log(newThreshold);
    }

    return res.status(201).json({
      message: 'Thresholds successfully created',
      data: result
    });
  } catch (error) {
    console.error('Error creating thresholds:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};


const checkForThresholdBreach = async () => {
    const thresholds = await Threshold.findAll();
    console.log(thresholds);
    console.log("checking fot the threshold breach");
    thresholds.forEach(async threshold => {
           const city = threshold.city;
           const parameter = threshold.parameter;
              const comparison = threshold.comparison;
                const thresholdValue = threshold.threshold_value;
                const weatherData = await getTheData(city);
                console.log(weatherData);
                const temp2 = parameter == "temperature" ? "temp": "humidity"? "humidity": "pressure"? "pressure": "windSpeed";
                let currentParameterValue = weatherData[temp2];
                if(temp2 == "temp") currentParameterValue = currentParameterValue - 273.15;
                console.log(currentParameterValue);
                const isThresholdBreached = comparison === 'greater_than'
                  ? currentParameterValue > thresholdValue
                  : currentParameterValue < thresholdValue;
                if (isThresholdBreached) {
                    console.log(`Threshold breached for ${city} - ${parameter}`);
                    user = await User.findOne({ where: { id: threshold.user_id } });
                    console.log(user);
                 
                    // create new alert for that user
                   const alert = await Alert.findOne({where: {userId: threshold.user_id, threshold_id: threshold.id}});
                   if(alert) return;
                   const res =  await Alert.create({
                        cityName: city,
                        weatherParameter: parameter,
                        thresholdValue: thresholdValue,
                        alertTriggeredAt: new Date(),
                        comparison: comparison,
                        userId: threshold.user_id,
                        threshold_id: threshold.id,
                        value: thresholdValue
                    });
                    console.log(res);
                    if(process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS){
                    await sendEmailAlert(user.email, city, parameter, currentParameterValue);
                  }
                }

    }  )

}

async function getTheData(city){
    const apikey = process.env.OPEN_WEATHER_MAP_API_KEY;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
    const weather = response.data;
    return {
        temp: weather.main.temp,
        humidity: weather.main.humidity,
        pressure: weather.main.pressure,
        windSpeed: weather.wind.speed
    };
}

module.exports = { createThreshold, checkForThresholdBreach };

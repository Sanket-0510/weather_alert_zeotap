// services/alertService.js
const { sendAlertEmail } = require('./emailService');

const alertService = (data) => {
  const thresholdTemp = process.env.TEMP_THRESHOLD || 35;

  if (data.temp > thresholdTemp) {
    console.log(`ALERT: Temperature in ${data.city} exceeded ${thresholdTemp}°C. Current temp: ${data.temp}°C`);

    // Send email alert
    const recipientEmail = 'recipient@example.com'; // Replace with the user's email or configurable recipient
    const subject = `Weather Alert for ${data.city}`;
    const message = `The current temperature in ${data.city} is ${data.temp}°C, which exceeds the threshold of ${thresholdTemp}°C.`;

    sendAlertEmail(recipientEmail, subject, message);
  }
};

module.exports = { alertService };

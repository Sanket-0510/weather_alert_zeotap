// services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send alert email
const sendEmailAlert = async(recipientEmail, city, parameter, currentParameterValue) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: recipientEmail,
    subject: "alert for the threshold breach",
    text: `${parameter} threshold breached and has crossed the value of ${currentParameterValue} in ${city}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Alert email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmailAlert };

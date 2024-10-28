require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();
const weatherRouter = require('./routes/weatherRoutes');
const sequelize  = require('./config/sequelize');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');  
const {checkForThresholdBreach} = require('./controllers/thresholdController.js');
const {storeDailySummary} = require('./controllers/wheatherController.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const cors = require('cors');
app.use(cors())

app.use('/weather', weatherRouter);
app.use('/', authRouter); 
app.use('/user', userRouter);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch(err => console.log('Error connecting to database:', err));


// Check for threshold breaches every 5 minutes
setInterval(checkForThresholdBreach, 40 * 1000);

const cities = ['mumbai', 'delhi', 'bangalore', 'chennai', 'kolkata'];

// Store daily weather summary at 23:56
setInterval(() => {
  const now = new Date();
  if (now.getHours() === 23 && now.getMinutes() === 56) {
    storeDailySummary(cities, now.getDate());
  }
}, 60 * 1000); // Check every minute

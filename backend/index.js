require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();
const weatherRoutes = require('./routes/weatherRoutes');
const { sequelize } = require('./config/sequelize');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());


app.use('/api/weather', weatherRoutes);
app.use('/api/auth', authRoutes); 

sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch(err => console.log('Error connecting to database:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

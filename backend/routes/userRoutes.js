const express = require('express');
const userRouter = express.Router();
const User = require('../models/User.js');
const Threshold = require('../models/Threshold.js');

const {createThreshold} = require('../controllers/thresholdController.js');
const authenticate = require('../middlewares/auth.js');
const Alert = require('../models/Alert.js');

userRouter.post('/update-profile', authenticate, createThreshold)

userRouter.get('/alerts', authenticate, async (req, res) => {
  try {
    const alerts = await Alert.findAll({ where: { userId: req.user.id } });

    console.log("Fetched alerts for user:", alerts);  // Log alerts
    return res.json(alerts || []);  // Ensure an array is always returned
  } catch (error) {
    console.error("Error fetching alerts:", error);
    res.status(500).json({ message: error.message });
  }
});


userRouter.get('/thresholds', authenticate, async (req, res) => {
  const thresholds = await Threshold.findAll({ where: { user_id: req.user.id } });
  console.log(thresholds);
  return res.json(thresholds);      
}
);


module.exports = userRouter;
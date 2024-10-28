// routes/authRoutes.js
const express = require('express');
const authRouter = express.Router();
const  {register, login} = require('../controllers/authController.js');

// User registration
authRouter.post('/register', register);

// User login
authRouter.post('/login', login);


module.exports = authRouter;

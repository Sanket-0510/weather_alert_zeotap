// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// Protected route example
router.get('/protected', authMiddleware.authenticate, authController.protected);

module.exports = router;

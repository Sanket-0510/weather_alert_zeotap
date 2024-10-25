// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models/User.js');

const JWT_SECRET = 'wheather_secrete_key';

// Middleware to protect routes
exports.authenticate = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findByPk(decoded.id);  // Add user to request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const  User = require('../models/User.js');

const JWT_SECRET = 'wheather_secrete_key';

// Middleware to protect routes
const authenticate = async (req, res, next) => {
  let token = req.header('Authorization') || req.body.token;
  console.log(token)
  token = token ? token.replace('Bearer ', '') : null;
  
  console.log(token)
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

module.exports = authenticate;
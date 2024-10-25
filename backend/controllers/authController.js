// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


const JWT_SECRET = 'wheather_secrete_key';



exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
      
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      res.status(400).json({ error: 'Error registering user' });
    }
  };
  

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: 'Error logging in' });
  }
};

// Protected Route (Example)
exports.protected = (req, res) => {
  res.json({ message: 'You have accessed a protected route', user: req.user });
};

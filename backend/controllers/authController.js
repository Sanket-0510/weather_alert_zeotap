// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  User  = require('../models/User.js');


const JWT_SECRET = 'wheather_secrete_key';



const register = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword)
      const user = await User.create({ username:name, email:email, password: hashedPassword });
      console.log(user);  
      
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'Error registering user' });
    }
  };
  

// Login User
const login = async (req, res) => {
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


module.exports = { register, login };
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ firstName, lastName, email, password });
    newUser.confirmPassword = confirmPassword;
    await newUser.save();

    // create and assign a token
    const payload = {
        user: {
            id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName
        }
    };

    jwt.sign(payload, jwtSecret, { expiresIn: '1h' },
        (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true });
            res.status(201).json({ 
              message: 'User registered successfully', 
              user: { firstName: user.firstName, lastName: user.lastName },
              token: token 
          });
        }
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: 'Server error', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email exists
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    // create and assign a token
    const payload = {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.cookie('token', token, { httpOnly: true });
      res.json({
        msg: 'Logged in successfully. Redirecting to the Home Page in 5 seconds...',
        user: { firstName: user.firstName, lastName: user.lastName },
        token: token,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};



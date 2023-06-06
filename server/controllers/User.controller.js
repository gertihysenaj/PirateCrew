const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  // console.log("Register API endpoint hit, received data: ", req.body);
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      // console.log("Passwords do not match error");
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const user = await User.findOne({ email });
    if (user) {
      // console.log("User already exists error");
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ firstName, lastName, email, password });
    newUser.confirmPassword = confirmPassword;
    await newUser.save();
    // console.log("New user saved: ", newUser);

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
        if (err) {
        // console.log("Error generating JWT: ", err);
        return res.status(500).json({ message: 'JWT generation error', error: err });
        }
        // console.log("JWT token generated: ", token);
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: false });
        return res.status(201).json({ 
            message: 'User registered successfully', 
            user: { firstName: newUser.firstName, lastName: newUser.lastName },
            token: token 
        });
    });
  } catch (error) {
    // console.log("Unexpected error during register: ", error);
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email exists
    const user = await User.findOne({ email });

    if (!user) {
      // console.log('User not found');
      return res.status(400).json({ msg: 'User not found.' });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // console.log('Password does not match');
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
    // console.log(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    // console.log("Error fetching users: ", error);
    res.status(500).json({ message: 'Server error', error });
  }
};


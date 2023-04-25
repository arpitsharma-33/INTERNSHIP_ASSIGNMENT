const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get users with income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
router.get('/bmw-mercedes-users', async (req, res) => {
  try {
    const users = await User.find({
      income: { $lt: 5 },
      car: { $in: ['BMW', 'Mercedes'] }
    }).populate('city');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get male users which have phone price greater than 10,000.
router.get('/high-price-male-users', async (req, res) => {
  try {
    const users = await User.find({
      gender: 'male',
      phone_price: { $gt: 10000 }
    }).populate('city');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
router.get('/m-lastname-users', async (req, res) => {
  try {
    const users = await User.find({
      last_name: { $regex: /^M/ },
      quote: { $regex: /^.{16,}$/ },
      email: { $regex: /M$/ }
    }).populate('city');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.
router.get('/luxury-car-users', async (req, res) => {
  try {
    const users = await User.find({
      car: { $in: ['BMW', 'Mercedes', 'Audi'] },
      email: { $regex: /^[^0-9]*$/ }
    }).populate('city');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

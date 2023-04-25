const express = require('express');
const router = express.Router();
const City = require('../models/city');
const User = require('../models/user');

// Get top 10 cities which have the highest number of users and their average income.
router.get('/top-cities', async (req, res) => {
  try {
    const cities = await City.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'city',
          as: 'users'
        }
      },
      {
        $project: {
          name: 1,
          userCount: { $size: '$users' },
          avgIncome: { $avg: '$users.income' }
        }
      },
      { $sort: { userCount: -1 } },
      { $limit: 10 }
    ]);
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

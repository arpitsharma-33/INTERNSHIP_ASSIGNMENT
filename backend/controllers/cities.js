const User = require('../models/user');
const City = require('../models/city');

exports.getTopCitiesByUserCountAndAverageIncome = async (req, res) => {
  try {
    const cities = await User.aggregate([
      { $group: { _id: '$city', count: { $sum: 1 }, totalIncome: { $sum: '$income' } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $lookup: { from: 'cities', localField: '_id', foreignField: '_id', as: 'cityData' } },
      { $unwind: '$cityData' },
      { $project: { name: '$cityData.name', count: 1, averageIncome: { $divide: ['$totalIncome', '$count'] } } }
    ]);
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

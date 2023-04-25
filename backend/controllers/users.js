const User = require('../models/user');

exports.getUsersWithLowIncomeAndBMWOrMercedes = async (req, res) => {
  try {
    const users = await User.find({
      income: { $lt: 5 },
      car: { $in: ['BMW', 'Mercedes'] }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMaleUsersWithPhonePriceGreaterThanTenThousand = async (req, res) => {
  try {
    const users = await User.find({
      gender: 'male',
      phone_price: { $gt: 10000 }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsersWithLastNameStartingWithMAndQuoteLengthGreaterThanFifteenAndEmailIncludesLastName = async (req, res) => {
  try {
    const users = await User.find({
      last_name: /^M/,
      quote: { $regex: /.{15,}/ },
      email: { $regex: /M$/ }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsersWithBMWOrMercedesOrAudiAndEmailDoesNotIncludeDigits = async (req, res) => {
  try {
    const users = await User.find({
      car: { $in: ['BMW', 'Mercedes', 'Audi'] },
      email: { $not: /\d/ }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

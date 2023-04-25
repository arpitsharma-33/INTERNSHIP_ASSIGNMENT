const Car = require('../models/car');

exports.getCarsByBrand = async (req, res) => {
  try {
    const cars = await Car.find({ brand: { $in: req.query.brands } });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

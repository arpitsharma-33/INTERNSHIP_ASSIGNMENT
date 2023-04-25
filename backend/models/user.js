const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique:true},
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  income: { type: Number, required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  car: { type: String, required: true },
  quote: { type: String, required: true },
  phone_price: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);

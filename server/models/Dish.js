const mongoose = require('mongoose');
const { Schema } = mongoose;

const dishSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  });

  const Dish = mongoose.model('Dish', dishSchema);

  module.exports = Dish;  
const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    name: String,
    address: String,
    phone: String,
    dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  });

  const Restaurant = mongoose.model('Restaurant', restaurantSchema);

  module.exports = Restaurant;
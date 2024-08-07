const mongoose = require('mongoose');
const { Schema } = mongoose;

const dishSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    restaurantId: String,//changed to allow storge of Yelp Id
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  });

  const Dish = mongoose.model('Dish', dishSchema);

  module.exports = Dish;  
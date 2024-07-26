const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    dish: { type: Schema.Types.ObjectId, ref: 'Dish' },
    rating: Number,
    comment: String,
    date: Date,
  });

const Review = mongoose.model('Review', reviewSchema);
  
module.exports = Review;  
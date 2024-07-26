const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    dishes: [{
      dish: { type: Schema.Types.ObjectId, ref: 'Dish' },
      quantity: Number,
    }],
    totalPrice: Number,
    status: String,
    orderDate: Date,
  });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

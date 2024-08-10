const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
    dishes: [{
      name: { type: String}, 
      quantity: { type: Number },
      price: { type: Number } 
    }],
    totalPrice: Number,
    status: String,
    orderDate: Date,
  });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

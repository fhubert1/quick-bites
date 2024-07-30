// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    dish: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
    totalPrice: {
        type: Number, required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'ordered'],
        default: 'active'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);

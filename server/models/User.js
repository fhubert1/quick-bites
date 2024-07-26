const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    phone: String,
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  });
  
const User = mongoose.model('User', userSchema);

module.exports = User;
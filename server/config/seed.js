// seed.js
const mongoose = require('mongoose');
const db = require('./connection');
const seedData = require('./seedData');

db.once('open', async () => {
  await seedData();
  mongoose.connection.close();
});

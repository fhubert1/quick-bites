require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://cerdashandy:bJhcLNfBKOaLE3rw@cluster0.smk5zid.mongodb.net/quickbites_db");

module.exports = mongoose.connection;
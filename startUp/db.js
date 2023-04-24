const mongoose = require('mongoose');
require("dotenv").config();
const url = process.env.MONGODB_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

module.exports = function() {
  mongoose.connect(url, options)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Load environment variables

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB connection using MONGO_URI from environment variables
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/coffee-store'; // Default to local if not set

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Import routes
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

// Use routes
app.use(productRoutes);
app.use(cartRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// src/server.js

const express = require('express');
const movieRouter = require('./routers/movies'); // Assuming this file exists and handles movie routes
const customerRouter = require('./routers/customer'); // Assuming this file exists and handles customer routes
const screenRouter = require('./routers/screens'); // Assuming this file exists and handles screen routes

const app = express();

// Middleware
app.use(express.json()); // Middleware to parse JSON request bodies

// Routes
app.use('/movies', movieRouter); // Mounting movieRouter to handle routes starting with '/movies'
app.use('/customer', customerRouter); // Mounting customerRouter to handle routes starting with '/customers'
app.use('/screens', screenRouter); // Mounting screenRouter to handle routes starting with '/screens'

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app; // Exporting the express app instance for testing purposes

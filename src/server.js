// src/server.js

const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

app.disable('x-powered-by');

// Add middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const movieRouter = require('./routers/movies'); 
const customerRouter = require('./routers/customer'); 
const screenRouter = require('./routers/screens');

// Routes
app.use('/movies', movieRouter); // Mounting movieRouter to handle routes starting with '/movies'
app.use('/customers', customerRouter); // Mounting customerRouter to handle routes starting with '/customers'
app.use('/screens', screenRouter); // Mounting screenRouter to handle routes starting with '/screens'

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app; // Exporting the express app instance for testing purposes

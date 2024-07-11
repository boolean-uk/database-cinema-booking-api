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

// Telling express to use my routers here
const customerRouter = require('./routers/customer');
const movieRouter = require('./routers/movie');

app.use('/customers', customerRouter);
app.use('/movies', movieRouter);



module.exports = app;

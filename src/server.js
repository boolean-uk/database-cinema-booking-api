const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

app.disable('x-powered-by');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const customerRouter = require('./routes/customers');
const moviesRouter = require('./routes/movies');
const screensRouter = require('./routes/screens');
const ticketsRouter = require('./routes/tickets');

app.use('/customers', customerRouter);
app.use('/movies', moviesRouter);
app.use('/screens', screensRouter);
app.use('/tickets', ticketsRouter);

module.exports = app;

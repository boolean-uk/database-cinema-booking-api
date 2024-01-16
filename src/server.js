const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

app.disable('x-powered-by');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const customerRouter = require('./routers/customer');
app.use('/customers', customerRouter);
const movieRouter = require('./routers/movies')
app.use('/movies', movieRouter)
const screensRouter = require('./routers/screens');
app.use('/screens', screensRouter);

module.exports = app

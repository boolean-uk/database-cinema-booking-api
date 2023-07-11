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


// Tell express to use your routers here
const customersRouter = require('./routers/customer');
const screensRouter = require('./routers/screen');
const moviesRouter = require('./routers/movies');


app.use('/customers', customersRouter);
app.use('/movies', moviesRouter);
app.use('/screens', screensRouter);

module.exports = app

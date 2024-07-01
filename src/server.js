const express = require('express');
const app = express();
require("express-async-errors")

const cors = require('cors');
const morgan = require('morgan');

app.disable('x-powered-by');

// Add middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Tell express to use your routers here
const customerRouter = require('./routers/customer');
const movieRouter = require('./routers/movies')
const screenRouter = require('./routers/screens')
app.use('/customers', customerRouter);
app.use('/movies', movieRouter);
app.use('/screens', screenRouter);

const { MissingFieldsError } = require("./errors/errors.js")


//Errors
app.use((error, req, res, next) => {
    if (error instanceof MissingFieldsError) {
        return res.status(400).json({
            error: error.message
         })
    }
})

module.exports = app

const express = require('express');
require('express-async-errors');
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
const customerRouter = require('./routers/customer.js');
app.use('/customers', customerRouter);

const movieRouter = require('./routers/movie.js')
app.use('/movies', movieRouter);

const screenRouter = require('./routers/screen.js')
app.use('/screens', screenRouter)

const ticketRouter = require('./routers/ticket.js');
app.use('/tickets', ticketRouter)

const MissingFieldsError = require('./errors/missingFieldsError.js');

app.use((error, req, res, next) => {
    if (error instanceof MissingFieldsError) {
        return res.status(400).json({
            error: error.message
        })
    }

    // if (error instanceof NotFoundError) {
    //     return res.status(404).json({
    //         error: error.message
    //     })
    // }

    // if (error instanceof NotUniqueError) {
    //     return res.status(409).json({
    //         error: error.message
    //     })
    // }

    res.status(500).json({
        message: 'Something went wrong'
    })
})

module.exports = app

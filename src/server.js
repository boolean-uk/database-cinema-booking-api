const express = require('express')
require('express-async-errors')
const app = express()

const cors = require('cors')
const morgan = require('morgan')

app.disable('x-powered-by')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const customerRouter = require('./routers/customer.js')
app.use('/customers', customerRouter)

const movieRouter = require('./routers/movie.js')
app.use('/movies', movieRouter)

const screenRouter = require('./routers/screen.js')
app.use('/screens', screenRouter)

const ticketRouter = require('./routers/ticket.js')
app.use('/tickets', ticketRouter)

const reviewRouter = require('./routers/review.js')
app.use('/reviews', reviewRouter)

const MissingFieldsError = require('./errors/missingFieldsError.js')
const NotFoundError = require('./errors/notFoundError.js')
const NotUniqueError = require('./errors/notUniqueError.js')

app.use((error, req, res, next) => {
    if (error instanceof MissingFieldsError) {
        return res.status(400).json({
            error: error.message
        })
    }

    if (error instanceof NotFoundError) {
        return res.status(404).json({
            error: error.message
        })
    }

    if (error instanceof NotUniqueError) {
        return res.status(409).json({
            error: error.message
        })
    }

    res.status(500).json({
        error: error.message
    })
})

module.exports = app

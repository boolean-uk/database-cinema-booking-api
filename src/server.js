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

module.exports = app

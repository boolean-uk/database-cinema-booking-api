const express = require('express');
const app = express();
require('express-async-errors');
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
const { Prisma } = require('@prisma/client');
app.use('/customers', customerRouter);

app.use((e, req, res, next) => {
    if (e instanceof Prisma.PrismaClientKnownRequestError){
        
        res.status(500).json({ error: "Something went wrong!"})
    }
})

module.exports = app

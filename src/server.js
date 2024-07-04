const express = require("express")
require("express-async-errors")
const app = express()

const cors = require("cors")
const morgan = require("morgan")

app.disable("x-powered-by")

// Add middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Tell express to use your routers here
const customerRouter = require("./routers/customer")
const moviesRouter = require("./routers/movie")
const screensRouter = require("./routers/screen")
const ticketsRouter = require('./routers/ticket')
const screeningsRouter = require('./routers/screening')
const reviewsRouter = require('./routers/review.js')

const {
	MissingFieldsError,
	ExistingDataError,
	DataNotFoundError,
} = require("./errors/errors.js")

app.use("/customers", customerRouter)
app.use("/movies", moviesRouter)
app.use("/screens", screensRouter)
app.use("/tickets", ticketsRouter)
app.use('/screenings', screeningsRouter)
app.use('/reviews', reviewsRouter)

app.use((error, req, res, next) => {
	if (error instanceof MissingFieldsError) {
		return res.status(400).json({ error: error.message })
	}
	if (error instanceof DataNotFoundError) {
		return res.status(404).json({ error: error.message })
	}
	if (error instanceof ExistingDataError) {
		return res.status(409).json({ error: error.message })
	}

	console.error(error)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = app

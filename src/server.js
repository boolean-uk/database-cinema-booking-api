const express = require("express")
require("express-async-errors")
const app = express()

const cors = require("cors")
const morgan = require("morgan")
const BadRequest = require("./errors/BadRequest")
const Conflict = require("./errors/Conflict")
const NotFound = require("./errors/NotFound")
const {
  PrismaClientKnownRequestError,
} = require("@prisma/client/runtime/library")

app.disable("x-powered-by")

// Add middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Tell express to use your routers here
const customerRouter = require("./routers/customer")
const movieRouter = require("./routers/movie")
const screenRouter = require("./routers/screen")
const ticketRouter = require("./routers/ticket")

app.use("/movies", movieRouter)
app.use("/customers", customerRouter)
app.use("/screens", screenRouter)
app.use("/tickets", ticketRouter)

app.use((error, req, res, next) => {
  if (error instanceof BadRequest) {
    res.status(400).json({
      error: error.message,
    })
  }

  if (error instanceof NotFound) {
    res.status(404).json({
      error: error.message,
    })
  }

  if (error instanceof Conflict) {
    res.status(409).json({
      error: error.message,
    })
  }

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      res.status(404).json({
        error: error.meta.cause,
      })
    }

    if (error.code === "P2003") {
      res.status(404).json({
        error:
          "Foreign key constraint failed on the field: " +
          error.meta.field_name,
      })
    }

    if (error.code === "P2002") {
      res.status(409).json({
        error: "Unique constraint failed on the " + error.meta.target,
      })
    }
  }

  res.status(500).json({
    error: "Internal Server Error",
  })
})

module.exports = app

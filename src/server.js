const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

const customerRouter = require("./routers/customer.router.js");
const movieRouter = require("./routers/movie.router.js");

app.disable("x-powered-by");

// Add middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tell express to use your routers here
app.use("/customers", customerRouter);
app.use("/movies", movieRouter);

module.exports = app;

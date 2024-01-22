const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

app.disable("x-powered-by");

// Add middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tell express to use your routers here
//customer router
const customerRouter = require("../src/routers/customer");
app.use("/customers", customerRouter);
const movieRouter = require("../src/routers/movie");
const screenRouter = require("../src/routers/screen");
app.use("/screens", screenRouter);
app.use("/movies", movieRouter);

module.exports = app;

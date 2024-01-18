const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

const customerRouter = require("./routers/customer.router.js");
const movieRouter = require("./routers/movie.router.js");
const screenRouter = require("./routers/screen.router.js");
const ticketRouter = require("./routers/tickets.router.js");

app.disable("x-powered-by");

// Add middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tell express to use your routers here
app.use("/customers", customerRouter);
app.use("/movies", movieRouter);
app.use("/screens", screenRouter);
app.use("/tickets", ticketRouter);

module.exports = app;

const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const customerRouter = require("./routers/customer");
const moviesRouter = require("./routers/movies");
const screenRouter = require("./routers/screen");

app.use("/movies", moviesRouter);
app.use("/customers", customerRouter);
app.use("/screens", screenRouter);

module.exports = app;

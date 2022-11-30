const express = require("express");
require("express-async-errors");
const { Prisma } = require("@prisma/client");

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
const customerRouter = require("./routers/customer");
const moviesRouter = require("./routers/movies");
const screensRouter = require("./routers/screens");
const ticketsRouter = require("./routers/tickets");
const reviewsRouter = require("./routers/reviews");

app.use("/customers", customerRouter);
app.use("/movies", moviesRouter);
app.use("/screens", screensRouter);
app.use("/tickets", ticketsRouter);
app.use("/reviews", reviewsRouter);

app.use((e, req, res, next) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2002") {
      return res
        .status(409)
        .json({ error: "A customer with the provided email already exists" });
    }
    if (e.code === "P2013") {
      return res.status(400).json({ error: "Missing fields in request body" });
    }
    if (e.code === "P2001") {
      return res.status(404).json({ error: "That thing does not exist" });
    }
    if (e.code === "P2016") {
      return res.status(404).json({ error: "That thing does not exist" });
    }
  }

  res.status(500).json({ error: "Oooooops" });
});

module.exports = app;

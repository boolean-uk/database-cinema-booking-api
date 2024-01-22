const express = require("express");
const movieRouter = express.Router();

const {
  getMovieList,
  postMovie,
  getMovieById,
  updateMovieById,
} = require("../controllers/movie.js");

movieRouter.get("/", getMovieList);
movieRouter.post("/", postMovie);
movieRouter.get("/:id", getMovieById);
movieRouter.put("/:id", updateMovieById);

module.exports = movieRouter;

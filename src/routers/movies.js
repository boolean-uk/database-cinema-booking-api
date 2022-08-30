const express = require("express");
const router = express.Router();
const {
  getMovies,
  createMovie,
  getMovieByID,
  updateMovie,
} = require("../controllers/movies");

router.get("/", getMovies);

router.post("/", createMovie);

router.get("/:id", getMovieByID);

router.put("/:id", updateMovie);

module.exports = router;

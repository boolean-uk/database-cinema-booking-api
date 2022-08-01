const express = require("express");
const {
  getAllMovies,
  createMovie,
  getMovieByID,
} = require("../controllers/movie");

const router = express.Router();

router.get("/", getAllMovies);
router.post("/", createMovie);
router.get("/:id", getMovieByID);

module.exports = router;

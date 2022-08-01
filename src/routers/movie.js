const express = require("express");
const {
  getAllMovies,
  createMovie,
  getMovieByID,
  updateMovieByID,
} = require("../controllers/movie");

const router = express.Router();

router.get("/", getAllMovies);
router.post("/", createMovie);
router.get("/:id", getMovieByID);
router.put("/:id", updateMovieByID);

module.exports = router;

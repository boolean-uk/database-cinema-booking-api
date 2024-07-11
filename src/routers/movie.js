const express = require("express");
const {
  getMovies,
  createMovie,
  getMovieById,
  updateMovieById,
} = require("../controllers/movie"); //declared them once, eazy dokey!!

const router = express.Router();

// Defined my routes for easy and smooth movie operations!!!!
router.get("/", getMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);
router.put("/:id", updateMovieById);

module.exports = router;

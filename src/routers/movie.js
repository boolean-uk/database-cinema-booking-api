const express = require("express");
const router = express.Router();

const {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie,
} = require("../controllers/movie");

router.get("/", getMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);
router.put("/:id", updateMovie);

module.exports = router;

const express = require("express");
const {
  getMovies,
  getMoviesById,
  createMovie,
  updateMoviesById,
} = require("../controllers/movies");

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMoviesById);
router.post("/", createMovie);
router.put("/:id", updateMoviesById);

module.exports = router;

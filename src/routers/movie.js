const express = require("express");
const router = express.Router();

const {
  retrieveMovies,
  createMovie,
  retrieveMovieById,
  updateMovie,
} = require("../controllers/movie");

router.get("/", retrieveMovies);
router.post("/", createMovie);
router.get("/:id", retrieveMovieById);
router.put("/:id", updateMovie);

module.exports = router;

const express = require("express");
const {
  getAllMovies,
  createAMovie,
  getMovieById,
  updateMovie,
} = require("../controllers/movies");

const router = express.Router();
router.get("/", getAllMovies);
router.post("/", createAMovie);
router.get("/:id", getMovieById);
router.put("/:id", updateMovie);
module.exports = router;

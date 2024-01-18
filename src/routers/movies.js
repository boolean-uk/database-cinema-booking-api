const express = require("express")
const {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovieById,
} = require("../controllers/movies")
const router = express.Router()

// Route to get, post create and put  movies
router.get("/", getAllMovies)
router.get("/:id", getMovieById)
router.post("/", createMovie)
router.put("/:id", updateMovieById)

module.exports = router

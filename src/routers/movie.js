const express = require("express")
const {
  getAllMovies,
  createMovie,
  getMovieByIdOrTitle,
  updateMovie,
} = require("../controllers/movie")
const router = express.Router()

router.get("/", getAllMovies)
router.post("/", createMovie)
router.get("/:idOrTitle", getMovieByIdOrTitle)
router.put("/:id", updateMovie)

module.exports = router

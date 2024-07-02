const express = require("express")
const {
	getAllMovies,
	getMovieById,
	updateMovie,
	createMovie,
} = require("../controllers/movie")

const router = express.Router()

router.get("/", getAllMovies)

router.post("/", createMovie)

router.get("/:idOrTitle", getMovieById)

router.put("/:id", updateMovie)

module.exports = router

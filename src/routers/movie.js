const express = require("express");
const {
    getAllMovies, getMovieID, createMovie, updateMovie
    
} = require('../controllers/movie');

const router = express.Router();

router.get("/", getAllMovies)
router.get("/:id", getMovieID)
router.post("/", createMovie)
router.put("/:id", updateMovie)

module.exports = router;
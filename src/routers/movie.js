const express = require("express");
const router = express.Router();

const {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovieById,
} = require("../controllers/movie.js");

router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.put("/:id", updateMovieById);

module.exports = router;

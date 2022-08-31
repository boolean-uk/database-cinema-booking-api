const express = require("express");
const {
    createMovie,
    getAllMovies,
    getMovieById,
    updateAMovie
} = require('../controllers/movie');

const router = express.Router();

router.get("/", getAllMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);
router.put("/:id", updateAMovie);

module.exports = router;

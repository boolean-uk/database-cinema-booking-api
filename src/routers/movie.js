const express = require("express");
const {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovie,
} = require('../controllers/movie');

const router = express.Router();

router.get("/", getAllMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);
router.put("/:id", updateMovie);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie
} = require('../controllers/movies');

// In index.js, we told express that the /customer route should use this router file
// The below /register route extends that, so the end result will be a URL
// that looks like http://localhost:4040/customer/register

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.put("/:id", updateMovie);

module.exports = router;

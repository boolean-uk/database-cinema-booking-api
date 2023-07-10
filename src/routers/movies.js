const {
    getMovies,
    createMovie,
    movieById,
    updateMovie
} = require('../controllers/movies');

const express = require("express");

const router = express.Router();


// In index.js, we told express that the /customer route should use this router file
// The below /register route extends that, so the end result will be a URL
// that looks like http://localhost:4000/customer/register
router.get("/", getMovies);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.get("/:id", movieById);

module.exports = router;


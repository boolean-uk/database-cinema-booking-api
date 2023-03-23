const express = require("express");
const { getMovies } = require("../controllers/movies");
const { createMovie } = require("../controllers/movies");
const { getMovieByID } = require("../controllers/movies");
const { updateMovieByID } = require("../controllers/movies");

const router = express.Router();

// In index.js, we told express that the /customer route should use this router file
// The below /register route extends that, so the end result will be a URL
// that looks like http://localhost:4000/customer/register
router.get("/", getMovies);
router.post("/", createMovie);
router.get("/:id", getMovieByID);
router.put("/:id", updateMovieByID);

module.exports = router;

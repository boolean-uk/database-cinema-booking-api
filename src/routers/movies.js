const express = require("express");
const { getMovies, newMovie } = require("../controllers/movies");

const router = express.Router();

router.get("/", getMovies);
router.post("/", newMovie);

module.exports = router;

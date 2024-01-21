const express = require("express");
const router = express.Router();

const { getMovieList, postMovie } = require("../controllers/movie.js");

router.get("/", getMovieList);
router.post("/", postMovie);

module.exports = router;

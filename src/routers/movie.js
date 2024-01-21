const express = require("express");
const router = express.Router();

const { getMovieList } = require("../controllers/movie.js");

router.get("/", getMovieList);

module.exports = router;

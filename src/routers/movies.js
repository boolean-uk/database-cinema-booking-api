const express = require("express");
const { getMovies } = require("../controllers/movies");

const router = express.Router();

router.get("/", getMovies);

module.exports = router;
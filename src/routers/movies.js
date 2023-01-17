const express = require("express");
const { getAllMovies } = require("../controllers/movies");

const router = express.Router();

router.get("/", getAllMovies);

module.exports = router;

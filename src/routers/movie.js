const express = require("express");
const app = require("../server");
const router = express.Router();

const { getAllMovies } = require('../controllers/movie.js')

app.get('/', getAllMovies)

module.exports = router
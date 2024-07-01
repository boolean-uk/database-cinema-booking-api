const express = require("express");
const router = express.Router()
const {
  getMovies
} = require('../controllers/movies');

router.get("/", getMovies)


module.exports = router;

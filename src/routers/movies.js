const express = require("express");
const router = express.Router();
const {
    getAllMovies, createAMovie
  } = require('../controllers/movies');
router.get('/', getAllMovies)
router.post('/', createAMovie)
module.exports = router;
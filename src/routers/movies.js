const express = require("express");
const router = express.Router();
const {
    getAllMovies
  } = require('../controllers/movies');
router.get('/', getAllMovies)
module.exports = router;
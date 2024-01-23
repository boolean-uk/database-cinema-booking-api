const express = require("express");
const router = express.Router();

const  { getAllMovies , createNewMovies } = require('../controllers/movies');



router.get('/', getAllMovies)
//router.post('/', createNewMovies)


module.exports = router;
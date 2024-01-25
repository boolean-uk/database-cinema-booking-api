const express = require("express");
const router = express.Router();

const  { getAllMovies , createNewMovies ,getMovieById ,updateMovieById} = require('../controllers/movies');



router.get('/', getAllMovies)
router.post('/', createNewMovies)
router.get('/:id', getMovieById)
router.put('/:id', updateMovieById)


module.exports = router;
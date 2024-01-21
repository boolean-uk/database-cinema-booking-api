const express = require("express")
const router = express.Router()
const {getMovieList, createMovie, getMovieById, updateMovie} = require ("../controllers/movies.js")

// getting list of movies 
router.get('/', getMovieList)

// creating a movie
router.post('/', createMovie )

// getting movie by id
router.get('/:id', getMovieById)

//update movie by id 
router.put ('/:id', updateMovie);

module.exports=router;
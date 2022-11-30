const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const getMovies = async (req, res) => { 
    const movies = await prisma.movie.findMany()
      res.json({ movies: movies });
  };

const getMoviesByID = async (req,res) => {
    const {id} = req.params;
    const movies = await prisma.movie.findUnique({
        where: {
          id: Number(id),
        },
      })
    res.json({ movies: movies });
}

const updateMovieByID = async (req,res) => {
    const {id} = req.params;
    const movies = await prisma.movie.update({
        where: {
            id: Number(id),
          },
        data: {          
            "title": req.body.title,
            "runtimeMins": req.body.runtimeMins
        },
    })
    res.json({ movies: movies });
}

const addMovie = async (req, res) => {
    const movies = await prisma.movie.create ({
        data:{
            "title": req.body.title,
            "runtimeMins": req.body.runtimeMins 
        } 
    })
    res.json({ movies: movies });
}

  module.exports = {
    getMovies,
    addMovie,
    getMoviesByID,
    updateMovieByID
  }
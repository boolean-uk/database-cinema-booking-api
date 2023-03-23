const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
        screenings:true
    }
  })
    return res.status(200).json({movies})
  
}


const createMovie = async (req, res) => {
    const movieTitle = req.body.title;
    const movieRunTime = req.body.runtimeMins;

    if(!movieTitle || !movieRunTime){
      return res.status(400).json({ error: "Missing or invalid Input field"});
    }

    const newMovie = await prisma.movie.create({
        data: {
            title: movieTitle,
            runtimeMins: movieRunTime
        },
        include: {
            screenings: true
        }
    })
    return res.status(201).json({ movie: newMovie })
}

const getMovieById = async (req, res) => {
   const movieId = Number(req.params.id);
   const movie = await prisma.movie.findUnique({
    where: {
        id: movieId,
    },
    include: {
        screenings: true
    }
   })
   return res.status(200).json({ movie })
}




const updateMovie = async (req, res) => {
    const movieId = Number(req.params.id);
    const updatedData = req.body;
    if(!updatedData) {
        res.status(400).json({ error: "Missing input field"})
    }
    const updatedMovie = await prisma.movie.update({
        where: {
            id: movieId,
        },
        data: {
            title: updatedData.title,
            runtimeMins: updatedData.runtimeMins,
        },
        include: {
            screenings: true,
        },
    });
      return res.status(201).json({ movie: updatedMovie})
 }

module.exports= {
    getMovies,
    createMovie,
    getMovieById,
    updateMovie
}
const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const getMovies = async (req, res) => {
    const movies = await prisma.movie.findMany({
      include: {
        screenings: true
      }
    });
    res.status(200).json({ movies })
  }

  const createMovie = async (req, res) => {
    const createdMovie = await prisma.movie.create({
        data:{
            title: "Top Gun",
            runtimeMins: 110
        },
        include: {
            screenings: true
          }
    });
    res.status(201).json({ movie: createdMovie });
  }

 
  const movieById = async (req, res) => {
    const { id } = req.params;
    const movie = await prisma.movie.findUnique({
        where: {
          id: Number(id)
        },
        include: {
            screenings: true
          }
      });
      res.status(200).json({ movie });
 }
  

 const updateMovie = async (req, res) => {
    const { id } = req.params;
    const movie = await prisma.movie.update({
        where: {
          id: Number(id)
        },
        data: {
            title: "Scream",
            runtimeMins: 113 
          },
          include: {
            screenings: true
          }
      });
      res.status(201).json({ movie });
 }

module.exports = {
    getMovies,
    createMovie,
    movieById,
    updateMovie
}
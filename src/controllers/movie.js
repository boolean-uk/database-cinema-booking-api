const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')


const getAllMovies = async (req, res) => {

    const movies = await prisma.movie.findMany({
        include: {
            screenings: true,
          }
    })
    return res.status(200).json({ movies })
  };

  const getMovieById = async (req, res) => {

    const id = Number(req.params.id)

    const foundMovie = await prisma.movie.findUnique({
        where: {
            id
        },
        include: {
            screenings: true
        }
    })

    return res.status(200).send({ movie: foundMovie })

    // if(foundMovie) {
    //     res.send({movie: foundMovie});
    //   } else {
    //     res.send(`No movie with ID: ${id}`)
    //   }
  }

  const createMovie = async (req, res) => {
    const { title, runtimeMins } = req.body

    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }

    const createdMovie = await prisma.movie.create({
        data: {
            title,
            runtimeMins
        },
            include: {
                screenings: true
            }
    })
    return res.status(201).send( {movie: createdMovie} )
  }


  const updateMovie = async (req, res) => {
    const id = Number(req.params.id)
    const { title, runtimeMins } = req.body

    const updateData = await prisma.movie.update({
        where: {
            id
        },
        data: {
            title: title,
            runtimeMins: runtimeMins,
        },
        include: {
            screenings: true
        }
    })

    return res.status(201).send({movie: updateData})
  }

  module.exports = {
    getAllMovies,
    createMovie,
    getMovieById,
    updateMovie
}

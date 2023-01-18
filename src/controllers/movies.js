const { Prisma } = require('@prisma/client')
const { where } = require('mongoose/lib/model')
const { ticket } = require('../utils/prisma')
const prisma = require('../utils/prisma')

// get all movies function
const getMovies = async (req, res) => {
    
    const movies = await prisma.movie.findMany()

    res.status(201).json({movies: movies})
}
  
const createMovie = async (req, res) => {
    const {
        title,
        runtimeMins
    } = req.body

    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }

    
    const createdMovie = await prisma.movie.create({
        data: {
            title,
            runtimeMins: Number.parseInt(runtimeMins)    
            }
        })

    res.status(201).json({ movie: createdMovie })
    
}

const getAMovie = async (req, res) => {
    const { id } = req.params;
    
    const movie = await prisma.movie.findUnique({
        where: {
            id: Number.parseInt(id)
        }
    })

    res.status(201).json({movie: movie}) 
}


const updateAMovie = async (req, res) => {
    const { title, runtimeMins } = req.body
    const {id} = req.params;

    const updatedMovie = await prisma.movie.update({
        data:{
            title,
            runtimeMins: Number.parseInt(runtimeMins)
        },
        where: {
            id: Number.parseInt(id)
        }
    })

    res.status(201).json({movie: updatedMovie})
}
module.exports = {
  getMovies,
  createMovie,
  getAMovie,
  updateAMovie
}

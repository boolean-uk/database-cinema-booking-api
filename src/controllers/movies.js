const { Prisma } = require('@prisma/client')
const { ticket } = require('../utils/prisma')
const prisma = require('../utils/prisma')

// get all movies function
const getMovies = async (req, res) => {
    
    const movies = await prisma.movie.findMany()

    res.status(201).json({movies: movies})
}
  
// title       String
//   runtimeMins Int
//   createdAt   DateTime    @default(now())
//   updatedAt
const createMovie = async (req, res) => {
    const {
        title,
        runtimeMins,
        screenId,
        startsAt,
        customerId 

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
module.exports = {
  getMovies,
  createMovie
}

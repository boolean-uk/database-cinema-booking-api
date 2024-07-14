const { PrismaClientKnownRequestError } = require("@prisma/client")
const { getListMovies, postMovie, getMovieById, updateMovieById } = require('../domains/movie.js')


const getMovies = async (req, res) => {
    
    try {
        const movies = await getListMovies()
        res.status(200).json({movies})
    } catch (error) {
        console.error('Error fetching movies:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
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

    try {
        const createdMovie = await postMovie(title, runtimeMins)
        
        res.status(201).json({
            movie: createdMovie
        })
    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
              return res.status(409).json({ error: "A movie with the provided title already exists" })
            }
          }
      
          res.status(500).json({ error: error.message })
    }
}

const fetchMovieByID = async (req, res) => {
    
    try {
        const movieId = req.params.id
        const movie = await getMovieById(movieId)

        if (!movie) {
            return res.status(404).json({error: 'movie not found'})
        }

        res.status(200).json({movie})

    } catch (error) {
        console.error('Error fetching movie:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const updateMovie = async (req, res) => {
    const { id } = req.params
    const { title, runtimeMins, screenings } = req.body
  
    try {

      const updatedMovie = await updateMovieById(id, title, runtimeMins, screenings)
      res.status(201).json({ movie: updatedMovie })

    } catch (error) {

      console.error('Error updating movie and screenings:', error)
      res.status(500).json({ error: 'Internal server error' })
      
    }
  }


module.exports = { getMovies, createMovie, fetchMovieByID, updateMovie }
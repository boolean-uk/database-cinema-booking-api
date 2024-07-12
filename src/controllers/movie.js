const { PrismaClientKnownRequestError } = require("@prisma/client")
const { getListMovies, postMovie } = require('../domains/movie.js')


const getMovies = async (req, res) => {
    
    try {
        const movies = await getListMovies();
        res.status(200).json({movies});
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal server error' });
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
    } catch (e) {

        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
              return res.status(409).json({ error: "A movie with the provided title already exists" })
            }
          }
      
          res.status(500).json({ error: e.message })
    }
}


module.exports = { getMovies, createMovie }
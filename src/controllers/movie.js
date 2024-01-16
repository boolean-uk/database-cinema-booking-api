const { PrismaClientKnownRequestError } = require("@prisma/client")
const { getMovieListDb } = require('../domains/movie.js')

const getMovieList = async (req, res) => {
    const movieList = await getMovieListDb()
    res.status(200).json({ movies: movieList })
}

module.exports = { getMovieList }
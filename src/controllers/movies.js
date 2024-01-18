const { PrismaClientKnownRequestError } = require("@prisma/client")
const { moviesDb } = require('../domains/movies')

const moviesList = async (req, res) => {
    const movies = await moviesDb()
    res.status(200).json({movies: movies})
}

module.exports = {
    moviesList
}


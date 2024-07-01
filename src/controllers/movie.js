const { PrismaClientKnownRequestError } = require("@prisma/client")
const { getAllMoviesDb } = require('../domains/movie')

const getAllMovies = async (req, res) => {
    const allMovies = await getAllMoviesDb()
    res.status(200).json({allMovies})
}


module.exports = {getAllMovies}
const { PrismaClientKnownRequestError } = require("@prisma/client")
const { getAllMoviesDb, getMovieByIdDb } = require("../domains/movie")

const getAllMovies = async (req, res) => {
    const allMovies = await getAllMoviesDb()
    res.status(200).json({allMovies})
}

const getMovieById = async (req, res) => {
    const reqId = Number(req.params.id)
    const movie = await getMovieByIdDb(reqId)
    res.status(200).json({movie})
}


module.exports = {getAllMovies, getMovieById}
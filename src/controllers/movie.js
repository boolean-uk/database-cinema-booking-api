const { PrismaClientKnownRequestError } = require("@prisma/client")
const {
	getAllMoviesDb,
	getMovieByIdDb,
	createMovieDb,
	updateMovieDb,
} = require("../domains/movie")

const getAllMovies = async (req, res) => {
	const allMovies = await getAllMoviesDb()
	res.status(200).json({ movies: allMovies })
}

const createMovie = async (req, res) => {
    const movieToAdd = req.body

	const createdMovie = await createMovieDb(movieToAdd)
	res.status(201).json({ movie: createdMovie })
}

const getMovieById = async (req, res) => {
	const reqId = Number(req.params.id)
	const movie = await getMovieByIdDb(reqId)
	res.status(200).json({ movie: movie })
}

const updateMovie = async (req, res) => {
	const reqId = Number(req.params.id)
	const updateInfo = req.body

	const updatedMovie = await updateMovieDb(reqId, updateInfo)
	res.status(201).json({ movie: updatedMovie })
}

module.exports = {
	getAllMovies,
	getMovieById,
	createMovie,
	updateMovie,
}

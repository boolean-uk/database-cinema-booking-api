const { PrismaClientKnownRequestError } = require("@prisma/client")
const {
	getAllMoviesDb,
	getMovieByIdDb,
	createMovieDb,
	updateMovieDb,
} = require("../domains/movie")

const {
	MissingFieldsError,
	ExistingDataError,
} = require("../errors/errors")

const getAllMovies = async (req, res) => {
	const { runtimeLt, runtimeGt } = req.query

	const allMovies = await getAllMoviesDb(runtimeLt, runtimeGt)

	res.status(200).json({ movies: allMovies })
}

const createMovie = async (req, res) => {
	const { title, runtimeMins } = req.body

	if (!title || !runtimeMins) {
		throw new MissingFieldsError(
			"Title and duration in minutes must be provided in order to add a movie"
		)
	}

	const moviesList = await getAllMoviesDb()
	const existingMovie = moviesList.find((mv) => mv.title === title)

	if (existingMovie) {
		throw new ExistingDataError(
			"A movie with the provided title already exists"
		)
	}

	const createdMovie = await createMovieDb(title, runtimeMins)
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

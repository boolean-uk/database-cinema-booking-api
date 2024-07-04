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
	DataNotFoundError,
} = require("../errors/errors")

const getAllMovies = async (req, res) => {
	const { runtimeLt, runtimeGt } = req.query

	const allMovies = await getAllMoviesDb(runtimeLt, runtimeGt)

	res.status(200).json({ movies: allMovies })
}

const createMovie = async (req, res) => {
	const { title, runtimeMins, screenings } = req.body

	if (!title || !runtimeMins) {
		throw new MissingFieldsError(
			"Title and duration in minutes must be provided in order to add a movie"
		)
	}

	const moviesList = await getMovieByIdDb(title)

	if (moviesList) {
		throw new ExistingDataError(
			"A movie with the provided title already exists"
		)
	}

	if (screenings) {
		const createdMovie = await createMovieDb(
			title,
			runtimeMins,
			screenings
		)
		res.status(201).json({ movie: createdMovie })
		return
	}

	const createdMovie = await createMovieDb(title, runtimeMins)
	res.status(201).json({ movie: createdMovie })
}

const getMovieById = async (req, res) => {
	const idOrTitle = req.params.id

	const movie = await getMovieByIdDb(idOrTitle)
	if (!movie) {
		throw new DataNotFoundError(
			"No movie with the provided id or title exists"
		)
	}
	res.status(200).json({ movie: movie })
}

const updateMovie = async (req, res) => {
	const reqId = Number(req.params.id)
	const updateInfo = req.body
	const screenings = updateInfo.screenings

	const moviesList = await getMovieByIdDb(reqId)

	if (!moviesList) {
		throw new DataNotFoundError(
			"No movie with the provided ID exists"
		)
	}

	if (!updateInfo.title || !updateInfo.runtimeMins) {
		throw new MissingFieldsError(
			"Title and duration in minutes must be provided in order to update a movie"
		)
	}

	const updatedMovie = await updateMovieDb(
		reqId,
		updateInfo.title,
		updateInfo.runtimeMins,
		screenings
	)
	res.status(201).json({ movie: updatedMovie })
}

module.exports = {
	getAllMovies,
	getMovieById,
	createMovie,
	updateMovie,
}

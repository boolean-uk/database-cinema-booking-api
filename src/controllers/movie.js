const { PrismaClientKnownRequestError } = require("@prisma/client")
const {
	getAllMoviesDb,
	getMovieByIdDb,
	createMovieDb,
	updateMovieDb,
	getMovieByTitleDb,
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

const createMovie = async (req, res, next) => {
	const { title, runtimeMins, screenings } = req.body

	try {
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

		if (screenings) {
			const createdMovie = await createMovieDb(
				title,
				runtimeMins,
				screenings
			)
			res.status(201).json({ movie: createdMovie })
		}

		const createdMovie = await createMovieDb(title, runtimeMins)
		res.status(201).json({ movie: createdMovie })
	} catch (e) {
		console.log(e)
		next(e)
	}
}

const getMovieById = async (req, res, next) => {
	const idOrTitle = req.params.idOrTitle

	try {
		const movie = await getMovieByIdDb(idOrTitle)
		if (!movie) {
			throw new DataNotFoundError(
				"No movie with the provided id or title exists"
			)
		}
		res.status(200).json({ movie: movie })
	} catch (e) {
		console.log(e)
		next(e)
	}
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

const prisma = require("../utils/prisma")

const getAllMoviesDb = async (runtimeLt, runtimeGt) => {
	const filterRuntimes = {}

	if (runtimeLt) {
		filterRuntimes.lt = Number(runtimeLt)
	}
	if (runtimeGt) {
		filterRuntimes.gt = Number(runtimeGt)
	}

	const allMovies = await prisma.movie.findMany({
		where: {
			runtimeMins: Object.keys(filterRuntimes).length
				? filterRuntimes
				: undefined,
		},
		include: {
			screenings: true,
		},
	})
	return allMovies
}

const createMovieDb = async (title, minutes) => {
	const newMovie = await prisma.movie.create({
		data: {
			title: title,
			runtimeMins: minutes,
		},
		include: {
			screenings: true,
		},
	})

	return newMovie
}

const getMovieByTitleDb = async (title) => {
	const foundMovie = await prisma.movie.findFirst({
		where: {
			title: title,
		},
		include: {
			screenings: true,
		},
	})
	return foundMovie
}

const getMovieByIdDb = async (reqId) => {
	const reqType = Number(reqId)
	
	if (isNaN(reqType)) {
		return await getMovieByTitleDb(reqId)
	}

	const foundMovie = await prisma.movie.findUnique({
		where: {
			id: reqType,
		},
		include: {
			screenings: true,
		},
	})
	return foundMovie
}

const updateMovieDb = async (reqId, updateInfo) => {
	const movieToUpdate = await prisma.movie.update({
		where: {
			id: reqId,
		},
		data: updateInfo,
		include: {
			screenings: true,
		},
	})
	return movieToUpdate
}

module.exports = {
	getAllMoviesDb,
	createMovieDb,
	getMovieByIdDb,
	updateMovieDb,
}

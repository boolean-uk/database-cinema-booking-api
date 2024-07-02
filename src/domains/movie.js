const prisma = require("../utils/prisma")

const getAllMoviesDb = async () => {
	const allMovies = await prisma.movie.findMany({
		include: {
			screenings: true,
		},
	})
	return allMovies
}

const createMovieDb = async (addMovie) => {
	const newMovie = await prisma.movie.create({
		data: addMovie,
		include: {
			screenings: true,
		},
	})
	return newMovie
}

const getMovieByIdDb = async (reqId) => {
	const foundMovie = await prisma.movie.findUnique({
		where: {
			id: reqId,
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

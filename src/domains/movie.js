const prisma = require("../utils/prisma")



const getAllMoviesDb = async () => {
    const allMovies = await prisma.movie.findMany()
    return allMovies
}

const getMovieByIdDb = async (id) => {
    const foundMovie = await prisma.movie.findUnique({
			where: {
				id: id
			},
		})
    return foundMovie
}


module.exports = {
	getAllMoviesDb,
	getMovieByIdDb,
}
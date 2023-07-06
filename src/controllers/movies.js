const { Prisma } = require('@prisma/client')
const prisma = require('../utils/prisma')

const getMovieList = async (req, res) => {
	const movies = await prisma.movie.findMany({
		include: {
			screenings: true,
		},
	})
	res.status(200).json({ movies: movies })
}

module.exports = { getMovieList}

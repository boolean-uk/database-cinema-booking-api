const { Prisma } = require('@prisma/client')
const prisma = require('../utils/prisma')

const getMovieList = async (req, res) => {
	const movies = await prisma.movie.findMany({})
	res.status(200).json({ movies: movies })
}

const createMovie = async (req, res) => {
	const body = req.body
	console.log('body:', body)
	const newMovie = await prisma.movie.create({
		data: {
			title: body.title,
			runtimeMins: body.runtimeMins,
		},
	})
	res.status(201).json({ movies: newMovie })
}

// by id
const getById = async (req, res) => {
	const id = Number(req.params.id)
	const newMovie = await prisma.movie.findUnique({
		where: {
			id,
		},
		include: {
			screenings: true,
		},
	})
	res.status(200).json({ movie: newMovie })
}



module.exports = { getMovieList, createMovie, getById }

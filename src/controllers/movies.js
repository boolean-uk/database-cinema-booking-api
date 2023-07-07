const { Prisma } = require('@prisma/client')
const prisma = require('../utils/prisma')

const getMovieList = async (req, res) => {
	const movies = await prisma.movie.findMany({
		orderBy: {
			id: 'asc',
		},
	})
	return res.status(200).json({ movies: movies })
}

const createMovie = async (req, res) => {
	const body = req.body
	const newMovie = await prisma.movie.create({
		data: {
			title: body.title,
			runtimeMins: body.runtimeMins,
		},
	})
	res.status(201).json({ movie: newMovie })
}

// by id
const getById = async (req, res) => {
	const id = Number(req.params.id)
	const newMovie = await prisma.movie.findUnique({
		where: {
			id: id,
		},
		include: {
			screenings: true,
		},
	})
		res.status(200).json({ movie: newMovie })
}

// update movie
const updateMovie = async (req, res) => {
	const id = Number(req.params.id)
	const body = req.body
	const updatedM = await prisma.movie.update({
		data: {
			title: body.title,
			runtimeMins: body.runtimeMins,
		},
		where: {
			id: id,
		},
		include: {
			screenings: true,
		},
	})
	res.status(201).json({ movie: updatedM })
}

module.exports = { getMovieList, createMovie, getById, updateMovie }

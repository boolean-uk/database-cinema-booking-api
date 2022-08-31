const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const getAllMovies = async (req, res) => {
    try {
        if (Object.keys(req.query).length === 0) {
            const allMovies = await prisma.movie.findMany({ include: { screenings: true } })
            res.status(200).json({ movies: allMovies })
        } else {
            const allMovies = await prisma.movie.findMany({
                where: {
                    AND: [Object.keys(req.query)[0] === "runtimeLt" ?
                        { runtimeMins: { lte: +req.query.runtimeLt } } :
                        { runtimeMins: { gte: +req.query.runtimeGt } }
                    ]
                },
                include: {
                    screenings: true,
                }
            })
            res.status(200).json({ movies: allMovies })
        }
    } catch (err) { res.status(404).json({ error: err }) }
}

const createMovie = async (req, res) => {
    try {
        const alreadyExists = await prisma.movie.findMany({ where: { title: req.body.title } })

        if (req.body.title === "" || req.body.runtimeMins === 0) throw 400
        if (alreadyExists.length !== 0) throw 409

        const createdMovie = await prisma.movie.create({
            data: req.body.screenings === undefined ? {
                title: req.body.title,
                runtimeMins: req.body.runtimeMins
            } : {
                title: req.body.title,
                runtimeMins: req.body.runtimeMins,
                screenings: {
                    create: req.body.screenings
                }
            },
            include: { screenings: true }
        })

        res.status(201).json({ movie: createdMovie })

    } catch (err) {
        if (err === 400) {
            res.status(404).json({ error: "Missing fields in request body" })
        } else if (err === 409) {
            res.status(409).json({ error: "A movie with the provided title already exists" })
        } else {
            res.status(404).json({ error: err })
        }
    }
}

const getMovieById = async (req, res) => {
    try {
        const uniqueMovie = await prisma.movie.findUnique({
            where: {
                id: +req.params.id
            },
            include: {
                screenings: true,
            }
        })
        if (uniqueMovie === null) throw "Movie with that ID does not exist"
        res.status(200).json({ movie: uniqueMovie })
    } catch (err) {
        res.status(404).json({ error: err })
    }
}

const updateMovieById = async (req, res) => {
    try {
        const updatedMovie = await prisma.movie.update({
            where: {
                id: +req.params.id
            },
            data: {
                title: req.body.title,
                runtimeMins: req.body.runtimeMins
            },
            include: {
                screenings: true,
            }
        })
        res.status(201).json({ movie: updatedMovie })
    } catch (err) {
        res.status(404).json({ error: err })
    }
}

module.exports = {
    getAllMovies, createMovie, getMovieById, updateMovieById
}

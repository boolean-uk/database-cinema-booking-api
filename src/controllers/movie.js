const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const createMovie = async (req, res) => {
    const { title, runtimeMins } = req.body;
    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }
    try {
        const createdMovie = await prisma.movie.create({
            data: {
                title: req.body.title,
                runtimeMins: req.body.runtimeMins,
            },
            include: {
                screenings: true,
            },
        })

        res.status(201).json({ movie: createdMovie })
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany(

    )
    res.json({ movies })
}

const getMovieById = async (req, res) => {
    const id = Number(req.params.id)
    const movie = await prisma.movie.findUnique({
        where: {
            id: id,
        }
    })
    console.log("get movieby id")
    return res.status(200).json({ movie })
}

const updateMovie = async (req, res) => {
    const id = Number(req.params.id)
    const movie = await prisma.movie.update({
        where: {
            id: id,
        },
        data: {
            title: req.body.title,
            runtimeMins: req.body.runtimeMins,
        },
        include: {
            screenings: true,
        },
    })
    console.log("updateMovie")
    res.status(201).json({ movie })
}



module.exports = { createMovie, getAllMovies, getMovieById, updateMovie }

const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');

const getMovies = async (req, res) => {
    const movies = await prisma.movie.findMany({
        include: {
            screenings: true,
        },
    });
    res.json({ movies });
};

const getMovieById = async (req, res) => {
    const id = Number(req.params.id);
    const movie = await prisma.movie.findUnique({
        where: {
            id: id,
        },
        include: {
            screenings: true,
        },
    });
    res.json({ movie });
};

const createMovie = async (req, res) => {
    const { title, runtimeMins } = req.body;

    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: 'Missing fields in request body',
        });
    }

    const createdMovie = await prisma.movie.create({
        data: {
            title,
            runtimeMins,
        },
        include: {
            screenings: true,
        },
    });

    res.status(201).json({ movie: createdMovie });
};

const updateMovie = async (req, res) => {
    const { title, runtimeMins } = req.body;
    const id = Number(req.params.id);

    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: 'Missing fields in request body',
        });
    }

    const updatedMovie = await prisma.movie.update({
        where: {
            id: id,
        },
        data: {
            title: title,
            runtimeMins: runtimeMins,
        },
        include: {
            screenings: true,
        },
    });

    res.status(201).json({ movie: updatedMovie });
};

module.exports = { getMovies, getMovieById, createMovie, updateMovie };

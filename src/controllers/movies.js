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
    const { title, runtimeMins, screenings } = req.body;
    const id = Number(req.params.id);

    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: 'Missing fields in request body',
        });
    }
    try {
        if (screenings) {
            const updatedMovie = await prisma.movie.update({
                where: {
                    id: id,
                },
                data: {
                    title: title,
                    runtimeMins: runtimeMins,
                    screenings: {
                        create: screenings,
                    },
                },
                include: {
                    screenings: true,
                },
            });
            console.log(updatedMovie);
            return res.status(201).json({ movie: updatedMovie });
        } else {
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
            return res.status(201).json({ movie: updatedMovie });
        }
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
                return res.status(404).json({
                    error: 'Movie with that id does not exist',
                });
            }
            if (e.code === 'P2002') {
                return res.status(409).json({
                    error: 'Movie with that title already exists',
                });
            }
        }
        res.status(500).json({ error: e.message });
    }
};

module.exports = { getMovies, getMovieById, createMovie, updateMovie };

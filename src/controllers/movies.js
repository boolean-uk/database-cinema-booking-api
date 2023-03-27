const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');

const getMovies = async (req, res) => {
    const min = req.query.runtimeGt;
    const max = req.query.runtimeLt;

    const request = {
        include: {
            screenings: true,
        },
    };

    if (min !== undefined && max !== undefined) {
        request.where = {
            runtimeMins: {
                gt: Number(min),
                lt: Number(max),
            },
        };
    } else if (min !== undefined) {
        request.where = {
            runtimeMins: {
                gt: Number(min),
            },
        };
    } else if (max !== undefined) {
        request.where = {
            runtimeMins: {
                lt: Number(max),
            },
        };
    }

    const movies = await prisma.movie.findMany(request);
    return res.status(200).json({ movies });
};

const getMovieById = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const movie = await prisma.movie.findUniqueOrThrow({
            where: {
                id: id,
            },
            include: {
                screenings: true,
            },
        });
        return res.json({ movie });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
                return res.status(404).json({
                    error: 'Movie with that id does not exist',
                });
            }
        }
        res.status(500).json({ error: e.message });
    }
};

const createMovie = async (req, res) => {
    const { title, runtimeMins } = req.body;

    if (!title || !runtimeMins) {
        return res.status(400).json({
            error: 'Missing fields in request body',
        });
    }

    try {
        const createdMovie = await prisma.movie.create({
            data: {
                title: title,
                runtimeMins: runtimeMins,
            },
            include: {
                screenings: true,
            },
        });

        res.status(201).json({ movie: createdMovie });
    } catch (e) {
        if (e.code === 'P2002') {
            return res.status(409).json({
                error: 'Movie with that title already exists',
            });
        }
        res.status(500).json({ error: e.message });
    }
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

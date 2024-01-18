const { query } = require("express");
const prisma = require("../utils/prisma");

const getMoviesDB = async (filter) => {
    const query = {
        title: filter.title && filter.title,
        runtimeMins: filter.runtimeMins && filter.runtimeMins,
        runtimeMins: {
            lt: filter.runtimeLt && Number(filter.runtimeLt),
            gt: filter.runtimeGt && Number(filter.runtimeGt),
        },
    };

    return await prisma.movie.findMany({
        where: query,
        include: { screenings: true },
    });
};

const createMovieDB = async (title, runtimeMins) =>
    await prisma.movie.create({
        data: {
            title,
            runtimeMins,
        },
        include: {
            screenings: true,
        },
    });

const getMovieDB = async (id) => {
    const query = {
        id: id && id,
    };

    return await prisma.movie.findUnique({
        where: query,
        include: {
            screenings: true,
        },
    });
};

const updateMovieDB = async (id, title, runtimeMins, screenings) =>
    await prisma.movie.update({
        where: {
            id,
        },
        data: {
            title,
            runtimeMins,
            screenings: screenings && {
                deleteMany: {
                    movieId: id,
                },
                createMany: {
                    data: screenings,
                },
            },
        },
        include: {
            screenings: true,
        },
    });

module.exports = {
    getMoviesDB,
    createMovieDB,
    getMovieDB,
    updateMovieDB,
};

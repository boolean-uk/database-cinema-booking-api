const prisma = require("../utils/prisma");

const getMoviesDB = async (filter) => {
    let query = {
        runtimeMins: {
            lt: filter.runtimeLt ? Number(filter.runtimeLt) : undefined,
            gt: filter.runtimeGt ? Number(filter.runtimeGt) : undefined,
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

const getMovieByIdDB = async (id) =>
    await prisma.movie.findUnique({
        where: {
            id,
        },
        include: {
            screenings: true,
        },
    });

const updateMovieByIdDB = async (id, title, runtimeMins) =>
    await prisma.movie.update({
        where: {
            id,
        },
        data: {
            title,
            runtimeMins,
        },
        include: {
            screenings: true,
        },
    });

module.exports = {
    getMoviesDB,
    createMovieDB,
    getMovieByIdDB,
    updateMovieByIdDB,
};

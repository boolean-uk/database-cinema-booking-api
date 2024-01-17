const prisma = require("../utils/prisma");

const getMoviesDB = async (filter) => {
    let query = prisma.movie.findMany({
        include: {
            screenings: true,
        },
    });

    if (filter.runtimeLt) {
        query = prisma.movie.findMany({
            where: {
                runtimeMins: {
                    lt: Number(filter.runtimeLt),
                },
            },
            include: {
                screenings: true,
            },
        });
    }
    
    return await query;
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

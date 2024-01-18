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
    getMovieDB,
    updateMovieByIdDB,
};

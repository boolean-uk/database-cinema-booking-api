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

const getMovieByIdDB = async (id) => {
    const query = {
        id,
    };

    return await prisma.movie.findUnique({
        where: query,
        include: {
            screenings: true,
        },
    });
};

const getMovieByTitleDB = async (title) => {
    const query = {
        title: title,
    };

    return await prisma.movie.findFirst({
        where: query,
        include: {
            screenings: true,
        },
    });
};

const updateMovieDB = async (movieToUpdate, filter) =>
    await prisma.movie.update({
        where: {
            id: movieToUpdate.id,
        },
        data: {
            title: filter.title,
            runtimeMins: filter.runtimeMins,
            screenings: filter.screenings && {
                deleteMany: {
                    movieId: movieToUpdate.id
                },
                createMany: {
                    data: filter.screenings,
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
    getMovieByIdDB,
    getMovieByTitleDB,
    updateMovieDB,
};

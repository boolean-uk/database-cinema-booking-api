const prisma = require("../utils/prisma");

const getAllMoviesDB = async () => await prisma.movie.findMany();

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

module.exports = {
    getAllMoviesDB,
    createMovieDB,
    getMovieByIdDB,
};

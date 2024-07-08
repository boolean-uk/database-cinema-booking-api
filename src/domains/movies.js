const prisma = require('../utils/prisma');

/**
 * Creates a new movie with optional screenings.
 * @param {string} title - Title of the movie.
 * @param {number} runtimeMins - Runtime of the movie in minutes.
 * @param {object[]} [screenings] - Array of screening objects (optional).
 * @returns {Promise<object>} Created movie record with included screenings.
 */
const createMovieDb = async (title, runtimeMins, screenings) => {
    const data = {
        title,
        runtimeMins,
    };

    if (screenings) {
        data.screenings = {
            createMany: {
                data: screenings,
            },
        };
    }

    const createdMovie = await prisma.movie.create({
        data,
        include: {
            screenings: true,
        },
    });

    return createdMovie;
};

/**
 * Retrieves all movies based on optional runtime filters.
 * @param {number} [runtimeLt] - Maximum runtime filter (optional).
 * @param {number} [runtimeGt] - Minimum runtime filter (optional).
 * @returns {Promise<object[]>} Array of movies that match the runtime filters.
 */
const getAllMoviesDb = async (runtimeLt, runtimeGt) => {
    const where = {
        screenings: {
            some: {
                startsAt: { gt: new Date().toISOString() },
            },
        },
    };

    if (runtimeLt !== undefined) {
        where.runtimeMins = { lt: runtimeLt };
    }
    if (runtimeGt !== undefined) {
        where.runtimeMins = { ...where.runtimeMins, gt: runtimeGt };
    }

    const movies = await prisma.movie.findMany({
        include: {
            screenings: {
                where: {
                    startsAt: { gt: new Date().toISOString() },
                },
            },
            reviews: true,
        },
        where,
    });

    return movies;
};

/**
 * Finds a movie by its ID.
 * @param {string} id - ID of the movie to find.
 * @returns {Promise<object>} Movie record found by ID with included screenings.
 */
const findMovieByIdDb = async (id) => {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
        return findMovieByTitleDb(id);
    }

    const movie = await prisma.movie.findUniqueOrThrow({
        where: { id: parsedId },
        include: {
            screenings: true,
        },
    });

    return movie;
};

/**
 * Finds a movie by its title.
 * @param {string} title - Title of the movie to find.
 * @returns {Promise<object>} Movie record found by title with included screenings.
 */
const findMovieByTitleDb = async (title) => {
    const movie = await prisma.movie.findUniqueOrThrow({
        where: { title },
        include: {
            screenings: true,
        },
    });

    return movie;
};

/**
 * Updates a movie's details by its ID.
 * @param {string} id - ID of the movie to update.
 * @param {string} title - Updated title of the movie.
 * @param {number} runtimeMins - Updated runtime of the movie in minutes.
 * @returns {Promise<object>} Updated movie record with included screenings.
 */
const updateMovieByIdDb = async (id, title, runtimeMins) => {
    const updatedMovie = await prisma.movie.update({
        where: { id },
        data: { title, runtimeMins },
        include: {
            screenings: true,
        },
    });

    return updatedMovie;
};

module.exports = {
    createMovieDb,
    getAllMoviesDb,
    findMovieByIdDb,
    updateMovieByIdDb,
};

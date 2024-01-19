const prisma = require('../utils/prisma')

const moviesDb = async () => await prisma.movie.findMany({
    include: {
        screenings: true
    }
});


const createMovieDb = async (title, runtimeMins) =>
    await prisma.movie.create({
        data: {
            title,
            runtimeMins,
        },
        include: {
            screenings: true,
        },
    });

const getMovieByIdDb = async (req, res) => {
    const id = Number(req.params.id)
    const movieId = await prisma.movie.findUnique({
        where: {
            id: id
        },
        include: {
            screenings: true
        }
    })
    return movieId
}

const updateMovieByIdDb = async (id, title, runtimeMins) =>
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
    moviesDb,
    createMovieDb,
    getMovieByIdDb,
    updateMovieByIdDb
}


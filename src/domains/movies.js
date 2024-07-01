const prisma = require('../utils/prisma')

const createMovieDb = async (title, runtimeMins) => {
    return await prisma.movie.create({
        data: {
            title: title,
            runtimeMins: runtimeMins,
        },
        include: {
            screenings: true
        }
    })
}

const getAllMoviesDb = async () => {
    return await prisma.movie.findMany({
        include: {
            screenings: true,
        },
    })
}

const findMovieByIdDb = async (id) => {
    return await prisma.movie.findUniqueOrThrow({
        where: { id: id },
        include: {
            screenings: true,
        },
    })
}

const updateMovieByIdDb = async (id, title, runtimeMins) => {
    return await prisma.movie.update({
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
    })
}

module.exports = {
    createMovieDb,
    getAllMoviesDb,
    findMovieByIdDb,
    updateMovieByIdDb,
}

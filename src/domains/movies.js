const prisma = require('../utils/prisma')

/**
 * This will create a Customer AND create a new Contact, then automatically relate them with each other
 * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
 */
const createMovieDb = async (title, runtimeMins) => {
    return await prisma.movie.create({
        data: {
            title: title,
            runtimeMins: runtimeMins,
        },
    })
}

const getAllMoviesDb = async () => {
    return await prisma.movie.findMany()
}

const findMovieByIdDb = async (id) => {
    return await prisma.movie.findUniqueOrThrow({ where: { id: id } })
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
    })
}

module.exports = { createMovieDb, getAllMoviesDb, findMovieByIdDb , updateMovieByIdDb}

const prisma = require('../utils/prisma')

const createMovieDb = async (title, runtimeMins, screenings) => {
    if(screenings) {
        return await prisma.movie.create({
            data: {
                title: title,
                runtimeMins: runtimeMins,
                screenings: {
                    createMany: {
                        data: screenings
                    }
                }
            },
            include: {
                screenings: true
            }
        })
    }
    
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

const getAllMoviesDb = async (runtimeLt, runtimeGt) => {
    const hasRuntimes = runtimeLt || runtimeGt
    if(hasRuntimes) {
        return await prisma.movie.findMany({
            include: {
                screenings: true,
            },
            where:{
                runtimeMins:{lt:runtimeLt, gt:runtimeGt}
            }
        })
    }
    return await prisma.movie.findMany({
        include: {
            screenings: true,
        },
    })
}

const findMovieByIdDb = async (id) => {
    const parsedId = Number(id)
    
    if(isNaN(parsedId)) {
        return findMovieByTitleDb(id)
    }
    
    return await prisma.movie.findUniqueOrThrow({
        where: { id: parsedId },
        include: {
            screenings: true,
        },
    })
}

const findMovieByTitleDb = async (title) => {
    return await prisma.movie.findUniqueOrThrow({
        where: { title:title },
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

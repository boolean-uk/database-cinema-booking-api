const prisma = require('../../src/utils/prisma')

const createScreening = async (screenId, movieId, startsAt) => {
    return await prisma.screening.create({
        data: {
            screenId: screenId,
            movieId: movieId,
            startsAt: startsAt,
        },
    })
}

module.exports = {
    createScreening,
}

const prisma = require('../utils/prisma')

async function createScreenDb(number, screenings) {
    const screenData = {
        data: {
            number: number
        },
        include: {
            screenings: true
        }
    }

    if(screenings) {
        screenData.data.screenings = {
            createMany: {
                    data: screenings.map((screening) => ({
                    startsAt: screening.startsAt,
                    movieId: screening.movieId
                }))
            }
        }
    }

    return await prisma.screen.create(screenData)
} 

module.exports = {
createScreenDb
}
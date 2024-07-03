const prisma = require("../../src/utils/prisma")
const { addDays } = require("date-fns")

const createMovie = async (title, runtimeMins, screen = null) => {
    const date = addDays(new Date(), 10)
    const movieData = {
        data: {
            title: title,
            runtimeMins: runtimeMins
        },
        include: {
            screenings: true
        }
    }

    if (screen) {
        movieData.data.screenings = {
            create: [
                {
                    startsAt: date,
                    screenId: screen.id
                }
            ]
        }
    }

    return await prisma.movie.create(movieData)
}

module.exports = {
    createMovie
}

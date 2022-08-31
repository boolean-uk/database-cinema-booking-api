const prisma = require("../../src/utils/prisma")

const createMovie = async (title, runtimeMins, screen = null) => {
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
                    startsAt: "2022-06-11T18:30:00.000Z",
                    screenId: screen.id
                }
            ]
        }
    }

    return await prisma.movie.create(movieData)
}
const createMovieWithScreenings = async (title, runtimeMins, screenings) => {
    const mappedScreen = await screenings.map((screen) => {
        const { movieId, screenId, startsAt } = screen;
        console.log({ screen });
        return {
            startsAt: new Date(startsAt),
            screen: {
                connect: {
                    id: Number(screenId)
                }
            }
        }
    });

    return await prisma.movie.create({
        data: {
            title,
            runtimeMins: Number(runtimeMins),
            screenings: {
                create: mappedScreen,
            }},
            include: { screenings: true }
        
    });
   
}

module.exports = {
    createMovie,
    createMovieWithScreenings
}

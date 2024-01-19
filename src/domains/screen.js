const prisma = require("../utils/prisma");

const createScreenDB = async (number, screenings) =>
    await prisma.screen.create({
        data: {
            number,
            screenings: {
                create: {
                    startsAt: screenings.startsAt,
                    movie: {
                        connect: {
                            id: screenings.movieId
                        }
                    }
                }
            }
        },
        include: {
            screenings: true
        }
    });

module.exports = {
    createScreenDB,
};

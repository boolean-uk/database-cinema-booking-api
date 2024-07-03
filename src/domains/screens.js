const prisma = require('../utils/prisma')

const createScreenDb = async (number, screenings) => {
    if (screenings) {
        return await prisma.screen.create({
            data: {
                number: number,
                screenings: {
                    createMany: {
                        data: screenings,
                    },
                },
            },
            include: {
                screenings: true,
            },
        })
    }

    return await prisma.screen.create({
        data: {
            number: number,
        },
        include: {
            screenings: true,
        },
    })
}

module.exports = { createScreenDb }

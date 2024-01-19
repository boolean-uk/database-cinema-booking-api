
const prisma = require('../utils/prisma')


const createScreenDb = async (number) => {
    const newScreen = await prisma.screen.create({
        data: {
            number: Number(number),
        },
        include: {
            screenings: true,
        }
    });
    return newScreen;
};



const createScreenWithScreening = async (number, screenings) => {
    const newScreen = await prisma.screen.create({
        data: {
            number: Number(number),
            screenings: {
                create: screenings
            }
        },
        include: {
            screenings: true
        }
    });

    return newScreen;
};


module.exports = {
    createScreenDb,
    createScreenWithScreening
}
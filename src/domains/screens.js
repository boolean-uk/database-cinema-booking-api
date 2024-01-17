const prisma = require('../utils/prisma');

/**
 * This function creates a new screen in the database
 * @param {number} number - The number of the screen to be created
 * @returns The created screen record
 */
const createScreenDb = async (number) => {
    return await prisma.screen.create({
        data: {
            number,
        },
    });
};

module.exports = {
    createScreenDb,
};

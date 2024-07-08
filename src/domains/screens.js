const prisma = require('../utils/prisma');

/**
 * Creates a new screen with optional screenings.
 * @param {number} number - Number of the screen.
 * @param {object[]} [screenings] - Array of screening objects (optional).
 * @returns {Promise<object>} Created screen record with included screenings.
 */
const createScreenDb = async (number, screenings) => {
    const data = {
        number,
    };

    if (screenings) {
        data.screenings = {
            createMany: {
                data: screenings,
            },
        };
    }

    try {
        const createdScreen = await prisma.screen.create({
            data,
            include: {
                screenings: true,
            },
        });

        return createdScreen;
    } catch (error) {
        throw new Error(`Failed to create screen: ${error.message}`);
    }
};

module.exports = { createScreenDb };

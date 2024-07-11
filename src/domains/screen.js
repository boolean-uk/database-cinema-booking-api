const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client");
const prisma = require('../utils/prisma');

const createScreenDb = async (number) => {
    try {
        return await prisma.screen.create({
            data: {
                number,
            },
        });
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            // Handle Prisma specific errors if needed
            throw e;
        } else {
            // Handle any other errors
            throw new Error("An unexpected error occurred while creating the screen.");
        }
    }
};

module.exports = {
    createScreenDb,
};

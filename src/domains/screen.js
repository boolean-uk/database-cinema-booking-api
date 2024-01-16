const prisma = require("../utils/prisma");

const createScreenDB = async (number) =>
    await prisma.screen.create({
        data: {
            number,
        },
    });

module.exports = {
    createScreenDB,
};

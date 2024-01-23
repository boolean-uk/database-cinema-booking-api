const prisma = require("../../src/utils/prisma");

const createScreen = async (number) => {
    return await prisma.screen.create({
        data: {
            number: number,
        }
    })
}

module.exports = {
    createScreen
}

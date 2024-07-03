const prisma = require("../../src/utils/prisma");

const createScreen = async (number) => {
    return await prisma.screen.create({
        data: {
            number: number,
        }
    })
}

const getAllScreens = async () => {
    return await prisma.screen.findMany()
}

const getScreenById = async (id) => {
    return await prisma.screen.findUnique({
        where: { id }
    })
}

module.exports = {
  createScreen,
  getAllScreens,
  getScreenById
}
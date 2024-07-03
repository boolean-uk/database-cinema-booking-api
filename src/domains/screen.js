const prisma = require('../utils/prisma.js')

const createScreen = async (req) => await prisma.screen.create({
    data: {
        number: req.body.number
    }, 
    include: {
        screenings: true
    }
})

const findScreen = async (number) => await prisma.screen.findFirst({
    where: {
        number: Number(number)
    }
})

module.exports = {
    createScreen,
    findScreen
}
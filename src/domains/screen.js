const prisma = require('../utils/prisma.js')

const createScreen = async (req) => await prisma.screen.create({
    data: {
        number: req.body.number
    }, 
    include: {
        screenings: true
    }
})

const findScreen = async (req) => await prisma.screen.findFirst({
    where: {
        number: req.body.number
    }
})

module.exports = {
    createScreen,
    findScreen
}
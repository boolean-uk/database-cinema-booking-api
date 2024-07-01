const prisma = require('../utils/prisma.js')

const createScreen = async (req) => await prisma.screen.create({
    data: {
        number: req.body.number
    }
})

module.exports = {
    createScreen
}
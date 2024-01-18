const prisma = require('../utils/prisma')

const createScreenDb = async (req, res) => {
    const {number} = req.body
    const newScreen = await prisma.screen.create({
        data: {
            number
        },
        include: {
            screenings: true
        }
    })
    return newScreen
}

module.exports = { createScreenDb }


const prisma = require('../utils/prisma')

const createScreen = async(req, res) => {
    const {number} = req.body

    return await prisma.screen.create({
        data: {
            number
        }
    })
}

module.exports = { createScreen }
const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const createScreen = async (req, res) => {
    const number = req.body.number

    const createdScreen = await prisma.screen.create({
        data: {
            number: number
        }
    })

    res.status(201).json({screen: createdScreen})
}

module.exports = {
    createScreen
}
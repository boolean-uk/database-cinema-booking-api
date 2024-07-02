const { PrismaClientKnownRequestError } = require("@prisma/client")
const { createScreenDB } = require('../domains/screen')

const createScreen = async (req, res) => {
    const screnToAdd = req.body

    const createScreen = await createScreenDB(screnToAdd)
    res.status(201).json({screen: createScreen})
}

module.exports = {createScreen}
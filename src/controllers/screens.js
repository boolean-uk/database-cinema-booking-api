const { PrismaClientKnownRequestError } = require('@prisma/client')
const { createScreenDb } = require('../domains/screens')

const createScreen = async (req, res) => {
    const screen = await createScreenDb(req, res)
    return res.status(201).json({ screen })
}

module.exports = { createScreen }
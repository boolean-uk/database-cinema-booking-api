const { PrismaClientKnownRequestError } = require('@prisma/client/runtime/library')
const { createScreenDb } = require('../domains/screen')

const createScreen = async (req, res) => {
  console.log()
  try {
    const number = Number(req.body.number)
    const screen = await createScreenDb(number)
    res.status(201).json({ screen })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(`Known prisma error: ${error}`)
    }

    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createScreen
}
const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const createScreen = async (req, res) => {
  const number = req.body.number
  const screen = await prisma.screen.create({
    data: {
      number
    }
  })

  return res.status(201).send({ screen })
}

module.exports = {
  createScreen
}
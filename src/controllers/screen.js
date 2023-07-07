const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");
const screenDomain = require('../domains/screen')

const createScreen = async (req, res) => {
  const { number, screenings } = req.body
  console.log('number', number)

  if (!number) {
    console.log('log 1')
    return res.status(400).json({ error: "Missing fields in request body"})
  }

  try {
    const screen = await screenDomain.createScreen(number, screenings)
    res.status(201).json({ screen })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "A screen with the provided number already exists" })
      }
    }
    console.log('log 2')
    res.status(500).json({ error: e.message })
  }
  
}

module.exports = {
  createScreen
}
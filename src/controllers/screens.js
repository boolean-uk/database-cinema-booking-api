const { Prisma } = require('@prisma/client')
const prisma = require('../utils/prisma')

const createScreen = async (req, res) => {
  const { number } = req.body

  if (!number) {
    return res.status(400).json({
      error: 'you havent filled in the correct request body'
    })
  }
  try {
    const createdScreen = await prisma.screen.create({
      data: {
        number
      }
    })
    res.status(201).json({ data: createdScreen })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createScreen
}

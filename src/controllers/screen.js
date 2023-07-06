const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");
const screenDomain = require('../domains/screen')

const createScreen = async (req, res) => {
  const { number } = req.body
  const screen = await screenDomain.createScreen(number)
  res.status(201).json({ screen })
}

module.exports = {
  createScreen
}
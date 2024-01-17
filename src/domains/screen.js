const prisma = require('../utils/prisma')

// CREATE A SCREEN
const createScreenDb = async (number) => await prisma.screen.create({
    data: { number }
})

module.exports = { createScreenDb }
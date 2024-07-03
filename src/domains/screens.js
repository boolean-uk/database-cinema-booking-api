const prisma = require('../utils/prisma')

async function createScreenDb(props) {
    const screen = await prisma.screen.create({
        data: props
    })
    return screen
}

module.exports = { createScreenDb }
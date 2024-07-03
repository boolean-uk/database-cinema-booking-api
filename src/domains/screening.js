const prisma = require("../utils/prisma")

const getAllScreeningsDb = async () => {
    const allScreenings = await prisma.screening.findMany()
    return allScreenings
}

module.exports = {
    getAllScreeningsDb
}
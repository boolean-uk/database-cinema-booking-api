const prisma = require("../utils/prisma")
const findScreeningByIdDb = async (id) =>
  await prisma.screening.findUnique({
    where: {
      id: id,
    },
  })

module.exports = {
  findScreeningByIdDb,
}
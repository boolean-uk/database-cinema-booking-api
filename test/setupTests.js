const prisma = require("../src/utils/prisma")

const deleteTables = async () => {
  const deleteTables = [
    prisma.ticket.deleteMany(),
    prisma.screening.deleteMany(),
    prisma.movie.deleteMany(),
    prisma.screen.deleteMany(),
    prisma.contact.deleteMany(),
    prisma.customer.deleteMany(),
  ];
  return await prisma.$transaction(deleteTables)
}


global.beforeEach(async () => {
  return await deleteTables()
})

global.afterAll(async () => {
  return await prisma.$disconnect()
})

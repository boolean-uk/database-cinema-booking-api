const prisma = require("../src/utils/prisma")

const deleteTables = () => {
  const deleteTables = [
    prisma.reviews.deleteMany(),
    prisma.ticket.deleteMany(),
    prisma.screening.deleteMany(),
    prisma.movie.deleteMany(),
    prisma.screen.deleteMany(),
    prisma.contact.deleteMany(),
    prisma.customer.deleteMany(),
  ];
  return prisma.$transaction(deleteTables)
}

global.beforeAll(() => {
  return deleteTables()
})

global.afterEach(() => {
  return deleteTables()
})

global.afterAll(() => {
  return prisma.$disconnect()
})

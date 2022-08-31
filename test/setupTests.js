const prisma = require("../src/utils/prisma")

const deleteTables = () => {
  const deleteTables = [
    prisma.ticket.deleteMany(),
    prisma.screening.deleteMany(),
    prisma.movie.deleteMany(),
    prisma.screen.deleteMany(),
    prisma.contact.deleteMany(),
    prisma.customer.deleteMany(),
  ];
  return prisma.$transaction(deleteTables)
}

// added to adress the tests issue where if you start with a non empty DB the first time you running the tests the first test (GET /movies) fails.
global.beforeAll(() => {
  return deleteTables()
})

global.afterEach(() => {
  return deleteTables()
})

global.afterAll(() => {
  return prisma.$disconnect()
})

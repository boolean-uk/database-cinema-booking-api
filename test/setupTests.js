const prisma = require("../src/utils/prisma")

const deleteTables = async () => {
  await prisma.review.deleteMany()
  await prisma.ticket.deleteMany()
  await prisma.screening.deleteMany()
  await prisma.movie.deleteMany()
  await prisma.screen.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.customer.deleteMany()
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

const prisma = require("../src/utils/prisma");

const deleteTables = async () => {
  try {
    await prisma.$transaction([
      prisma.ticket.deleteMany(),
      prisma.screening.deleteMany(),
      prisma.movie.deleteMany(),
      prisma.screen.deleteMany(),
      prisma.contact.deleteMany(),
      prisma.customer.deleteMany(),
      prisma.reviews && prisma.reviews.deleteMany(),
    ]);
  } catch (error) {
    console.error("Error deleting tables:", error);
  }
};

beforeAll(async () => {
  await deleteTables();
});

afterEach(async () => {
  await deleteTables();
});

afterAll(async () => {
  await prisma.$disconnect();
});

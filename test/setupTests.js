const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

// Define an async function and use it
const runTests = async () => {
  try {
    const response = await request.post('/screens').send(request);
    console.log('Response:', response.body);
    expect(response.status).toEqual(201);
  } catch (error) {
    console.error('Test Error:', error);
  }
};

// Run the tests
runTests();

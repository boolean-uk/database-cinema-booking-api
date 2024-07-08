const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Setup function before tests
beforeAll(async () => {
  await prisma.$connect();
  // Additional setup (e.g., seed test data)
});

// Teardown function after tests
afterAll(async () => {
  await prisma.$disconnect();
});

module.exports = {
  prisma,
};

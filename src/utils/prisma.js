// You don't need to touch this file, this is just exporting prisma so you can use it

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ['query'],
});

module.exports = prisma;

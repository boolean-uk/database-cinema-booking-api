// You don't need to touch this file, this is just exporting prisma so you can use it
require('dotenv').config()

const { PrismaClient } = require("@prisma/client");

let logLevel = {
    log: ['query'],
}

if (process.env.NODE_ENV === 'test') {
    logLevel = {}
    // Connect to the user's test database instance
    process.env['DATABASE_URL'] = process.env['TEST_DATABASE_URL']
    console.log(`Connected to DB instance: ${process.env['DATABASE_URL']}`)
}

const prisma = new PrismaClient(logLevel);

module.exports = prisma;

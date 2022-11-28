require('dotenv').config()
process.env.DATABASE_URL
const { Client } = require("pg");

const client = {
  query: async (str, values) => {

    const dbClient = new Client(process.env.DATABASE_URL)
    await dbClient.connect()
    const result = await dbClient.query(str, values)
    await dbClient.end()
    return result
  }
}

module.exports = client;

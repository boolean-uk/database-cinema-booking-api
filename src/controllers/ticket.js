const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");
const ticketDomain = require("../domains/ticket");

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body

  if (!screeningId || !customerId) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const ticket = await ticketDomain.createTicket(screeningId, customerId)
    res.status(201).json({ ticket })
  } catch (e) {
    console.log('e', e)
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2003") {
        return res.status(404).json({ error: "A customer or screening does not exist with the provided id"})
      }
    }
    res.status(500).json({ error: e.message })
  }
}

module.exports = {
  createTicket
}

const { createTicketDb } = require("../domains/ticket")

async function createTicket(req, res) {
    const { screeningId, customerId } = req.body

    const createdTicket = await createTicketDb(screeningId, customerId)

    res.status(201).json({
        ticket: createdTicket
    })
}

module.exports = {
    createTicket
  }
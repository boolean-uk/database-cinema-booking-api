const createTicketDb = require("../domains/ticket")

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body
  const ticket = await createTicketDb(screeningId, customerId)

  res.status(201).json({
    ticket,
  })
}

module.exports = createTicket

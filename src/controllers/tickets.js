const { createTicketDb, checkScreeningIdDb, checkCustomerIdDb } = require("../domains/ticket.js")

// creating Ticket
const createTicket = async (req, res) => {
    const { screeningId, customerId } = req.body

    if (!screeningId || !customerId)
    return res.status(400).json({err: 'Please input a screening and customer ID.'})

    const checkScreeningId = await checkScreeningIdDb(screeningId)
    const checkCustomerId = await checkCustomerIdDb(customerId)

    if (!checkScreeningId || !checkCustomerId) 
    return res.status(404).json({err: 'Customer or screening is not available with the ID provided.'})

    const ticket = await createTicketDb(screeningId, customerId)
    return res.status(201).json({ ticket: ticket })
}

module.exports = { createTicket }
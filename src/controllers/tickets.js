const { createTicketDb } = require('../domains/tickets')
const { MissingFieldsError } = require('../errors/errors')

function createTicket(req, res) {
    const ticket = req.body

    if (!ticket.screeningId || !ticket.customerId) {
        throw new MissingFieldsError('Tickets require a screening ID and a customer ID')
    }
}

module.exports = { createTicket }
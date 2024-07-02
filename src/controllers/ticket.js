const { createTicketDb } = require("../domains/ticket")
const MissingFieldsError = require("../errors/missingFieldsError")

async function createTicket(req, res) {
    const { screeningId, customerId } = req.body

    if (!screeningId || !customerId) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    const createdTicket = await createTicketDb(screeningId, customerId)

    res.status(201).json({
        ticket: createdTicket
    })
}

module.exports = {
    createTicket
}
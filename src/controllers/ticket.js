const { PrismaClientKnownRequestError } = require("@prisma/client")
const { createTicketDB } = require('../domains/ticket')

const {
	MissingFieldsError,
	ExistingDataError,
	DataNotFoundError,
} = require("../errors/errors")

const createTicket = async (req, res) => {
    const { screeningId, customerId } = req.body
    const newTicket = await createTicketDB(screeningId, customerId)
    res.status(201).json({ticket: newTicket})
}

module.exports = { createTicket}
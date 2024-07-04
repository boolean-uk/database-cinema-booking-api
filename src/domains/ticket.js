const prisma = require("../utils/prisma")

const createTicketDB = async (screen, customer) => {
	const newTicket = await prisma.ticket.create({
		data: {
			screening: {
				connect: { id: screen },
			},
			customer: {
				connect: { id: customer },
			},
		},
		select: {
			id: true,
			screening: {
				select: {
					id: true,
					movieId: true,
					screenId: true,
				},
			},
			customer: {
				include: {
					contact: true,
				},
			},
			screening: {
				select: {
					screen: true,
					movie: true,
				},
			},
		},
	})
	return newTicket
}

const getAllTicketsDb = async () => {
	const allTickets = await prisma.ticket.findMany()
	return allTickets
}

module.exports = {
	createTicketDB,
	getAllTicketsDb,
}

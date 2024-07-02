const { createTicketDb } = require("../domains/tickets");
const { MissingFieldsError, DataNotFoundError } = require("../errors/errors");
const prisma = require("../utils/prisma");

async function createTicket(req, res) {
  const ticketData = req.body;

  if (!ticketData.screeningId || !ticketData.customerId) {
    throw new MissingFieldsError(
      "Tickets require a screening ID and a customer ID"
    );
  }

  if (
    isNaN(Number(ticketData.screeningId)) ||
    isNaN(Number(ticketData.customerId))
  ) {
    throw new DataNotFoundError("No data found for screening or customer ID");
  }

  [screening, customer] = await prisma.$transaction([
    prisma.screening.findUnique({
      where: {
        id: Number(ticketData.screeningId),
      },
    }),
    prisma.customer.findUnique({
      where: {
        id: Number(ticketData.customerId),
      },
    }),
  ]);

  if (!screening || !customer) {
    let errorString = "No data found for: ";
    if (!screening) {
      errorString += "screening ";
    }
    if (!customer) {
      errorString += "customer";
    }
    throw new DataNotFoundError(errorString);
  }

  const ticket = await createTicketDb(ticketData);

  const result = {
    id: ticket.id,
    screening: {
      id: ticket.screening.id,
      movieId: ticket.screening.movieId,
      startsAt: ticket.screening.startsAt,
      createdAt: ticket.screening.createdAt,
      updatedAt: ticket.screening.updatedAt,
    },
    customer: {
      id: ticket.customer.id,
      name: ticket.customer.name,
      createdAt: ticket.customer.createdAt,
      updatedAt: ticket.customer.updatedAt,
    },
    screen: {
      id: ticket.screening.screen.id,
      number: ticket.screening.screen.number,
      createdAt: ticket.screening.screen.createdAt,
      updatedAt: ticket.screening.screen.updatedAt,
    },
    movie: {
      id: ticket.screening.movie.id,
      runtimeMins: ticket.screening.movie.runtimeMins,
      createdAt: ticket.screening.movie.createdAt,
      updatedAt: ticket.screening.movie.updatedAt,
    },
  };

  res.status(201).json({ ticket: result });
}

module.exports = { createTicket };

const { createTicketDb } = require('../domains/tickets.js');
const { PrismaClientKnownRequestError } = require('@prisma/client');

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;

  try {
    if (!screeningId || !customerId) {
      return res.status(400).json({ error: 'Missing fields in request body' });
    }

    const createdTicket = await createTicketDb(screeningId, customerId);

    res.status(201).json({ ticket: createdTicket });
  } catch (error) {

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Matching customer or screening not found' });
      }
    }

    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
};

module.exports = { createTicket };

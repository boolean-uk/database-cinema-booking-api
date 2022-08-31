const models = require('../models/tickets');
const { SUCCESS } = require('../utils/vars');

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;

  if (!screeningId || !customerId) {
    return res.status(400).json({ error: 'Missing fields in request body' });
  }

  const [status, dbRes] = await models.createTicket(screeningId, customerId);

  if (status === SUCCESS) {
    return res.status(201).json({
      ticket: {
        id: dbRes.id,
        screening: {
          id: dbRes.screening.id,
          movieId: dbRes.screening.movieId,
          screenId: dbRes.screening.screenId,
          startsAt: dbRes.screening.startsAt,
          createdAt: dbRes.screening.createdAt,
          updatedAt: dbRes.screening.updatedAt,
        },
        customer: dbRes.customer,
        screen: dbRes.screening.screen,
        movie: dbRes.screening.movie,
      },
    });
  }

  if (dbRes === 'P2003') {
    return res.status(404).json({
      error: 'A customer or screening does not exist with the provided id',
    });
  }

  res.status(500).json({ error: 'Something went wrong' });
};

module.exports = {
  createTicket,
};

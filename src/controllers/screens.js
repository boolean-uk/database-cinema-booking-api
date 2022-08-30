const models = require('../models/screens');
const { SUCCESS } = require('../utils/vars');

const createScreen = async (req, res) => {
  const { number, screenings } = req.body;

  if (!number) {
    return res.status(400).json({ error: 'Missing fields in request body' });
  }

  const [status, dbRes] = await models.createScreen(number, screenings);

  if (status === SUCCESS) {
    return res.status(201).json({
      screen: dbRes,
    });
  }

  if (dbRes === 'P2002') {
    return res
      .status(409)
      .json({ error: 'A screen with the provided number already exists' });
  }

  res.status(500).json({ error: 'Something went wrong' });
};

module.exports = {
  createScreen,
};

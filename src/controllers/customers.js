const model = require('../models/customers');
const { SUCCESS } = require('../utils/vars');

const createCustomer = async (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({
      error: 'Missing fields in request body',
    });
  }

  const [status, dbRes] = await model.createCustomer(name, phone, email);

  if (status === SUCCESS) {
    return res.status(201).json({ customer: dbRes });
  }

  if (dbRes === 'P2002') {
    return res
      .status(409)
      .json({ error: 'A customer with the provided email already exists' });
  }

  res.status(500).json({ error: 'Something went wrong' });
};

const updateCustomer = async (req, res) => {
  const { name } = req.body;
  const phone = req.body.contact?.phone ?? undefined;
  const email = req.body.contact?.email ?? undefined;

  if (!name) {
    return res.status(400).json({ error: 'Missing fields in request body' });
  }

  const customerId = parseInt(req.params.id);

  const [status, dbRes] = await model.updateCustomer(
    customerId,
    name,
    phone,
    email
  );

  if (status === SUCCESS) {
    return res.status(201).json({
      customer: dbRes,
    });
  }

  if (dbRes === 'P2016') {
    return res
      .status(404)
      .json({ error: 'Customer with that id does not exist' });
  }

  res.status(500).json({ error: 'Something went wrong' });
};

module.exports = {
  createCustomer,
  updateCustomer,
};

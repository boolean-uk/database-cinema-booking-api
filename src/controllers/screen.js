const { create } = require("../domains/screen.js");

const fetchCreate = async (req, res) => {
  const { number } = req.body;
  const result = await create(number);
  res.status(200).json({ screen: result });
};

module.exports = {
  fetchCreate,
};

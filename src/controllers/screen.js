const { createScreenDB } = require("../domains/screen.js");

const createScreen = async (req, res) => {
  const { number } = req.body;

  const newScreen = await createScreenDB(number);
  res.status(201).json({ screen: newScreen });
};

module.exports = {
  createScreen,
};

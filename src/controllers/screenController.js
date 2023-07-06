const { Prisma } = require("@prisma/client");
// const prisma = require("../utils/prisma");

const { createScreenData } = require("../models/screen");

const createScreen = async (req, res) => {
  const { number } = req.body;
  const screen = await createScreenData(number);
  res.status(201).json({screen});
};

module.exports = {
  createScreen,
};

// TODO: update createScreen() to meet ext. criteria (+  write matching spec)

const { PrismaClientKnownRequestError, PrismaClientValidationError } = require("@prisma/client/runtime/library");
const { createScreenDb, getScreensByDb } = require("../domains/screen");

const createScreen = async (req, res) => {
  const data = req.body;
  try {
    const screen = await createScreenDb(data);
    res.status(201).json({ screen: screen });
  } catch (e) {
    if (e instanceof PrismaClientValidationError) {
      if (e.message.endsWith("is missing.")) {
        res.status(400).json({ error: "Missing fiels in request body" });
        return;
      }
    }
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        res
          .status(409)
          .json({ error: "A screen with the provided number already exists" });
        return;
      }
    }
  }
};

module.exports = {
  createScreen,
};

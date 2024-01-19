const { PrismaClientKnownRequestError, PrismaClientValidationError } = require("@prisma/client/runtime/library");
const { createScreenDb, createScreenWithScreeningsDb } = require("../domains/screen");
const { createMovieWithScreeningsDb } = require("../domains/movie");

const createScreen = async (req, res) => {
  const data = req.body;
  try {
    if(!data.screenings) {
      const screen = await createScreenDb(data);
      res.status(201).json({ screen: screen });
      return
    }
    if(data.screenings) {
      const screen = await createScreenWithScreeningsDb(data.number, data.screenings);
      res.status(201).json({ screen: screen });
      return
    }
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

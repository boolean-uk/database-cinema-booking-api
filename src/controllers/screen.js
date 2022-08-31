const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");
const { checkFields, errorMessages, buildScreenData } = require("./utils");

const createScreen = async (req, res) => {
  const { number } = req.body;
  if (checkFields([number])) {
    return res.status(400).json({ error: errorMessages.missingField });
  }

  try {
    const screen = await prisma.screen.create({
      data: buildScreenData(req.body),
      include: { screenings: true },
    });

    res.status(201).json({ screen });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({ error: errorMessages.screenExists });
      }
    }
    console.log("Error: " + err);
    return res.json({ error: err });
  }
};

module.exports = { createScreen };

const { Prisma } = require("@prisma/client");
const { createNewScreen } = require("../domains/screens");

const createScreen = async (req, res) => {
  const { number } = req.body;
  if (!number) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
  try {
    const screen = await createNewScreen(number);
    res.status(201).json(screen);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.json({ error: "createdMovie went oopsie" });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

module.exports = { createScreen };

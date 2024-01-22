const { PrismaClientKnownRequestError } = require("@prisma/client");
const { createScreenDb } = require("../domains/screen.js");

const createScreen = async (req, res) => {
  const { id, number } = req.query;
  if (!id || !number) {
    return res.status(400).json({
      error: "Missing fields in query parameters",
    });
  }
  try {
    const newScreen = await createScreenDb(id, number);
    res.status(201).json({ screen: newScreen });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A screen with the same number already exists" });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createScreen,
};

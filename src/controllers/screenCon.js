const { PrismaClientKnownRequestError } = require("@prisma/client");
const { createScreenDb } = require("../domains/screenDom.js");

const createScreen = async (req, res) => {
  const { body } = req;

  try {
    const newScreen = await createScreenDb(body);

    res.status(201).json({ screen: newScreen });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2021") {
        return res
          .status(404)
          .json({ error: "The table does not exist in the current database" });
      }
    }

    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createScreen,
};

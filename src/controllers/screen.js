const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const createScreen = async (req, res) => {
//   res.json({ msg: `I'm all hooked up` });
    const { number } = req.body;
    if (!number) {
      return res.status(400).json({
        error: "Missing screen number",
      });
    }
    try {
      const createdScreen = await prisma.screen.create({
        data: {
          number,
        },
      });
      res.status(201).json({ screen: createdScreen });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return res
            .status(409)
            .json({ error: "That screen number already exists" });
        }
      }
      res.status(500).json({ error: e.message });
    }
};

module.exports = {
  createScreen
};

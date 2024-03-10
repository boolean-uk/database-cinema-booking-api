const { PrismaClientKnownRequestError } = require("@prisma/client");
const { createScreenDb } = require("../domains/screen.js");


const createAScreen = async (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({
      error: "Missing field in request body",
    });
  }
  try {
    const createdScreen = await createScreenDb(number);

    res.status(201).json({ screen: createdScreen });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A screen with the provided number already exists" });
      }
    }




    res.status(500).json({ error: e.message });
  }
};

module.exports = { createAScreen};